import { getRequestContext } from '@cloudflare/next-on-pages';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

// Web Crypto Hashing for Edge Runtime
async function hashSecret(secret: string, salt: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(secret + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function GET() {
  const db = (getRequestContext().env as any).reality_decoded_db;
  const { results: jobs } = await db.prepare("SELECT * FROM syndicate_jobs ORDER BY created_at DESC").all();
  const { results: applications } = await db.prepare(`SELECT a.*, j.role as job_title FROM job_applications a JOIN syndicate_jobs j ON a.job_id = j.id ORDER BY a.applied_at DESC`).all();
  const { results: analytics } = await db.prepare("SELECT * FROM hr_analytics ORDER BY date DESC LIMIT 30").all();
  
  const { results: agents } = await db.prepare(`
    SELECT s.id, s.name, s.role, s.avatar, h.email 
    FROM syndicate_agents s 
    JOIN hq_agents h ON s.id = h.username 
    ORDER BY s.name ASC
  `).all();

  return NextResponse.json({ jobs, applications, analytics, agents });
}

export async function POST(req: Request) {
  const db = (getRequestContext().env as any).reality_decoded_db;
  const body = await req.json();

  if (body.action === 'post_job') {
    const { role, type, location, daysActive, description, eligibility, payRange, maxApplications } = body;
    const id = crypto.randomUUID();
    await db.prepare(
      "INSERT INTO syndicate_jobs (id, role, type, location, description, eligibility, pay_range, max_applications, expires_at, is_active, is_deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now', ?), 1, 0)"
    ).bind(id, role, type, location, description, eligibility, payRange, maxApplications ? Number(maxApplications) : null, `+${daysActive} days`).run();
    return NextResponse.json({ success: true });
  }

  if (body.action === 'block') {
    await db.prepare("INSERT OR IGNORE INTO hr_blacklist (email, reason) VALUES (?, 'HR Blocked')").bind(body.email).run();
    await db.prepare("UPDATE job_applications SET status = 'rejected' WHERE email = ?").bind(body.email).run();
    return NextResponse.json({ success: true });
  }

  if (body.action === 'track') {
    const { page_type, job_id } = body;
    const date = new Date().toISOString().split('T')[0];
    const id = `${page_type}_${job_id || 'home'}_${date}`;
    await db.prepare(
      "INSERT INTO hr_analytics (id, page_type, job_id, date, views) VALUES (?, ?, ?, ?, 1) ON CONFLICT(id) DO UPDATE SET views = views + 1"
    ).bind(id, page_type, job_id, date).run();
    return NextResponse.json({ success: true });
  }

  // UPDATED: ADD SYNDICATE AGENT WITH MANUAL CREDENTIALS
  if (body.action === 'add_agent') {
    const { username, name, email, role, password, pin } = body;
    const salt = process.env.HQ_SALT;
    if (!salt) return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });

    const passHash = await hashSecret(password, salt);
    const pinHash = await hashSecret(pin, salt);
    const avatarUrl = `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${username}&backgroundColor=a855f7`;

    // Insert into auth table and profile table
    await db.prepare("INSERT INTO hq_agents (username, password_hash, pin_hash, email, name) VALUES (?, ?, ?, ?, ?)").bind(username, passHash, pinHash, email, name).run();
    await db.prepare("INSERT INTO syndicate_agents (id, name, avatar, role) VALUES (?, ?, ?, ?)").bind(username, name, avatarUrl, role).run();

    // Send the secure onboarding email
    if (process.env.RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Syndicate Command <security@realitydecoded.in>',
          to: email,
          subject: 'Confidential: Syndicate Access Granted',
          html: `
            <div style="font-family: monospace; background: #050505; color: #a855f7; padding: 30px; border: 1px solid #a855f7; max-width: 600px; margin: 0 auto;">
              <h2 style="text-transform: uppercase; letter-spacing: 2px; color: #fff; border-bottom: 1px solid #333; padding-bottom: 10px;">Syndicate Command Center</h2>
              <p style="color: #fff; font-size: 16px;">Agent <b>${name}</b>,</p>
              <p style="color: #ccc; line-height: 1.6;">You have been officially provisioned into the Reality Decoded Author Network. Your secure login credentials have been assigned by Administration.</p>
              
              <div style="background: #111; padding: 20px; border-left: 3px solid #a855f7; margin: 25px 0;">
                <p style="margin: 5px 0; color: #888;">PORTAL URL:</p>
                <p style="margin: 0 0 15px 0; color: #fff; font-size: 16px;">https://realitydecoded.in/hq</p>
                
                <p style="margin: 5px 0; color: #888;">AGENT ID:</p>
                <p style="margin: 0 0 15px 0; color: #fff; font-size: 18px; font-weight: bold;">${username}</p>
                
                <p style="margin: 5px 0; color: #888;">PASSWORD:</p>
                <p style="margin: 0 0 15px 0; color: #fff; font-size: 18px; letter-spacing: 2px;">${password}</p>
                
                <p style="margin: 5px 0; color: #888;">PHASE 2 PIN:</p>
                <p style="margin: 0; color: #fff; font-size: 18px; letter-spacing: 5px;">${pin}</p>
              </div>

              <p style="font-size: 12px; color: #666; margin-top: 30px; border-top: 1px solid #333; padding-top: 15px;">
                WARNING: Destroy or secure this transmission immediately after saving your credentials.
              </p>
            </div>
          `
        })
      });
    }

    return NextResponse.json({ success: true });
  }
}

export async function PATCH(req: Request) {
  const db = (getRequestContext().env as any).reality_decoded_db;
  const body = await req.json();

  if (body.action === 'update_status') {
    const { trackingId, newStatus } = body;
    const app = await db.prepare("SELECT applicant_name, email, job_id FROM job_applications WHERE tracking_id = ?").bind(trackingId).first();
    const job = await db.prepare("SELECT role FROM syndicate_jobs WHERE id = ?").bind(app?.job_id).first();

    await db.prepare("UPDATE job_applications SET status = ? WHERE tracking_id = ?").bind(newStatus, trackingId).run();

    if (process.env.RESEND_API_KEY && app) {
      let subject = `Application Update: ${job?.role}`;
      let statusHeadline = "Application Under Review";
      let statusBody = `Your application for the <strong>${job?.role}</strong> position is currently under active review by our hiring team. We appreciate your patience as we evaluate your profile against the requirements of the role.`;
      let color = "#3b82f6"; 

      if (newStatus === 'selected') {
        subject = `Interview Invitation: ${job?.role} at Reality Decoded`;
        statusHeadline = "Application Approved";
        statusBody = `Congratulations! After carefully reviewing your background and experience, we are pleased to invite you to the next stage of our recruitment process for the <strong>${job?.role}</strong> position. Our Human Resources team will contact you shortly to coordinate an interview schedule.`;
        color = "#22c55e"; 
      } else if (newStatus === 'rejected') {
        subject = `Update Regarding Your Application: ${job?.role}`;
        statusHeadline = "Application Status Update";
        statusBody = `Thank you for taking the time to apply for the <strong>${job?.role}</strong> position and for your interest in joining Reality Decoded. After careful consideration, we have decided to move forward with other candidates whose profiles more closely align with our current needs. We will keep your resume on file for future opportunities.`;
        color = "#ef4444"; 
      }

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Reality Decoded HR <hr@realitydecoded.in>',
          to: app.email,
          subject: subject,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden; color: #333333;">
              <div style="background-color: #0a0a0a; padding: 30px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">Reality Decoded</h1>
              </div>
              <div style="padding: 40px 30px;">
                <p style="font-size: 16px;">Dear <strong>${app.applicant_name}</strong>,</p>
                <div style="border-left: 4px solid ${color}; padding-left: 20px; margin: 25px 0; background-color: #f9fafb; padding: 20px;">
                  <h2 style="color: ${color}; margin-top: 0; font-size: 18px;">${statusHeadline}</h2>
                  <p style="line-height: 1.6; font-size: 15px; margin-bottom: 0;">${statusBody}</p>
                </div>
                <p style="font-size: 14px; color: #666; margin-top: 30px;"><strong>Tracking ID:</strong> ${trackingId}</p>
                <p style="font-size: 15px; margin-top: 40px;">Best regards,<br/><strong>Human Resources Team</strong><br/>Reality Decoded</p>
              </div>
            </div>
          `
        })
      });
    }
    return NextResponse.json({ success: true });
  }

  if (body.action === 'toggle_job') {
    await db.prepare("UPDATE syndicate_jobs SET is_active = ? WHERE id = ?").bind(body.isActive, body.jobId).run();
    return NextResponse.json({ success: true });
  }

  if (body.action === 'edit_job') {
    const { jobId, role, type, location, description, eligibility, payRange, maxApplications, daysActive } = body;
    await db.prepare(
      "UPDATE syndicate_jobs SET role = ?, type = ?, location = ?, description = ?, eligibility = ?, pay_range = ?, max_applications = ?, expires_at = datetime('now', ?) WHERE id = ?"
    ).bind(role, type, location, description, eligibility, payRange, maxApplications ? Number(maxApplications) : null, `+${daysActive} days`, jobId).run();
    return NextResponse.json({ success: true });
  }

  if (body.action === 'restore_job') {
    await db.prepare("UPDATE syndicate_jobs SET is_deleted = 0 WHERE id = ?").bind(body.jobId).run();
    return NextResponse.json({ success: true });
  }

  // UPDATED: EDIT AGENT DETAILS WITH OPTIONAL PASSWORD/PIN RESETS & EMAIL ALERT
  if (body.action === 'edit_agent') {
    const { username, name, email, role, password, pin } = body;
    const salt = process.env.HQ_SALT;
    if (!salt) return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });

    await db.prepare("UPDATE hq_agents SET name = ?, email = ? WHERE username = ?").bind(name, email, username).run();
    await db.prepare("UPDATE syndicate_agents SET name = ?, role = ? WHERE id = ?").bind(name, role, username).run();
    
    // Hash and update only if a new password was provided
    if (password) {
      const passHash = await hashSecret(password, salt);
      await db.prepare("UPDATE hq_agents SET password_hash = ? WHERE username = ?").bind(passHash, username).run();
    }
    
    // Hash and update only if a new PIN was provided
    if (pin) {
      const pinHash = await hashSecret(pin, salt);
      await db.prepare("UPDATE hq_agents SET pin_hash = ? WHERE username = ?").bind(pinHash, username).run();
    }

    // NEW: Dispatch Security Alert Email on Profile Update
    if (process.env.RESEND_API_KEY) {
      const passText = password 
        ? `<p style="margin: 0 0 15px 0; color: #fff; font-size: 18px; letter-spacing: 2px;">${password}</p>` 
        : `<p style="margin: 0 0 15px 0; color: #555; font-size: 14px;">[Unchanged]</p>`;
        
      const pinText = pin 
        ? `<p style="margin: 0; color: #fff; font-size: 18px; letter-spacing: 5px;">${pin}</p>` 
        : `<p style="margin: 0; color: #555; font-size: 14px;">[Unchanged]</p>`;

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Syndicate Command <security@realitydecoded.in>',
          to: email, // Sends to the new email if it was changed
          subject: 'Security Alert: Syndicate Profile Updated',
          html: `
            <div style="font-family: monospace; background: #050505; color: #3b82f6; padding: 30px; border: 1px solid #3b82f6; max-width: 600px; margin: 0 auto;">
              <h2 style="text-transform: uppercase; letter-spacing: 2px; color: #fff; border-bottom: 1px solid #333; padding-bottom: 10px;">Command Center Notice</h2>
              <p style="color: #fff; font-size: 16px;">Agent <b>${name}</b>,</p>
              <p style="color: #ccc; line-height: 1.6;">Your author profile and/or secure credentials have been successfully modified by Administration.</p>
              
              <div style="background: #111; padding: 20px; border-left: 3px solid #3b82f6; margin: 25px 0;">
                <p style="margin: 5px 0; color: #888;">AGENT ID:</p>
                <p style="margin: 0 0 15px 0; color: #fff; font-size: 18px; font-weight: bold;">${username}</p>

                <p style="margin: 5px 0; color: #888;">NETWORK EMAIL:</p>
                <p style="margin: 0 0 15px 0; color: #fff; font-size: 16px;">${email}</p>
                
                <p style="margin: 5px 0; color: #888;">PASSWORD:</p>
                ${passText}
                
                <p style="margin: 5px 0; color: #888;">PHASE 2 PIN:</p>
                ${pinText}
              </div>

              <p style="font-size: 12px; color: #666; margin-top: 30px; border-top: 1px solid #333; padding-top: 15px;">
                WARNING: If you did not request these changes or suspect unauthorized access, contact Administration immediately.
              </p>
            </div>
          `
        })
      });
    }

    return NextResponse.json({ success: true });
  }
}

export async function DELETE(req: Request) {
  const db = (getRequestContext().env as any).reality_decoded_db;
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const type = searchParams.get('type');

  if (type === 'job') {
    await db.prepare("UPDATE syndicate_jobs SET is_deleted = 1, is_active = 0 WHERE id = ?").bind(id).run();
  } else if (type === 'agent') {
    await db.prepare("DELETE FROM syndicate_agents WHERE id = ?").bind(id).run();
    await db.prepare("DELETE FROM hq_agents WHERE username = ?").bind(id).run();
  } else {
    await db.prepare("DELETE FROM job_applications WHERE tracking_id = ?").bind(id).run();
  }
  
  return NextResponse.json({ success: true });
}