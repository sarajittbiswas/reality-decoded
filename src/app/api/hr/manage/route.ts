import { getRequestContext } from '@cloudflare/next-on-pages';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  const db = (getRequestContext().env as any).reality_decoded_db;
  const { results: jobs } = await db.prepare("SELECT * FROM syndicate_jobs ORDER BY created_at DESC").all();
  const { results: applications } = await db.prepare(`SELECT a.*, j.role as job_title FROM job_applications a JOIN syndicate_jobs j ON a.job_id = j.id ORDER BY a.applied_at DESC`).all();
  const { results: analytics } = await db.prepare("SELECT * FROM hr_analytics ORDER BY date DESC LIMIT 30").all();
  return NextResponse.json({ jobs, applications, analytics });
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
}

export async function PATCH(req: Request) {
  const db = (getRequestContext().env as any).reality_decoded_db;
  const body = await req.json();

  // 1. UPDATE APPLICANT STATUS & SEND PROFESSIONAL HR EMAIL
  if (body.action === 'update_status') {
    const { trackingId, newStatus } = body;
    const app = await db.prepare("SELECT applicant_name, email, job_id FROM job_applications WHERE tracking_id = ?").bind(trackingId).first();
    const job = await db.prepare("SELECT role FROM syndicate_jobs WHERE id = ?").bind(app?.job_id).first();

    await db.prepare("UPDATE job_applications SET status = ? WHERE tracking_id = ?").bind(newStatus, trackingId).run();

    if (process.env.RESEND_API_KEY && app) {
      let subject = `Application Update: ${job?.role}`;
      let statusHeadline = "Application Under Review";
      let statusBody = `Your application for the <strong>${job?.role}</strong> position is currently under active review by our hiring team. We appreciate your patience as we evaluate your profile against the requirements of the role.`;
      let color = "#3b82f6"; // Blue

      if (newStatus === 'selected') {
        subject = `Interview Invitation: ${job?.role} at Reality Decoded`;
        statusHeadline = "Application Approved";
        statusBody = `Congratulations! After carefully reviewing your background and experience, we are pleased to invite you to the next stage of our recruitment process for the <strong>${job?.role}</strong> position. Our Human Resources team will contact you shortly to coordinate an interview schedule.`;
        color = "#22c55e"; // Green
      } else if (newStatus === 'rejected') {
        subject = `Update Regarding Your Application: ${job?.role}`;
        statusHeadline = "Application Status Update";
        statusBody = `Thank you for taking the time to apply for the <strong>${job?.role}</strong> position and for your interest in joining Reality Decoded. After careful consideration, we have decided to move forward with other candidates whose profiles more closely align with our current needs. We will keep your resume on file for future opportunities.`;
        color = "#ef4444"; // Red
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

                <p style="font-size: 14px; color: #666; margin-top: 30px;">
                  <strong>Tracking ID:</strong> ${trackingId}
                </p>

                <p style="font-size: 15px; margin-top: 40px;">
                  Best regards,<br/>
                  <strong>Human Resources Team</strong><br/>
                  Reality Decoded
                </p>
              </div>
            </div>
          `
        })
      });
    }
    return NextResponse.json({ success: true });
  }

  // 2. TOGGLE JOB VISIBILITY (Hide/Unhide)
  if (body.action === 'toggle_job') {
    await db.prepare("UPDATE syndicate_jobs SET is_active = ? WHERE id = ?").bind(body.isActive, body.jobId).run();
    return NextResponse.json({ success: true });
  }

  // 3. EDIT EXISTING JOB (Fixed Parsing & Fields)
  if (body.action === 'edit_job') {
    const { jobId, role, type, location, description, eligibility, payRange, maxApplications, daysActive } = body;
    await db.prepare(
      "UPDATE syndicate_jobs SET role = ?, type = ?, location = ?, description = ?, eligibility = ?, pay_range = ?, max_applications = ?, expires_at = datetime('now', ?) WHERE id = ?"
    ).bind(role, type, location, description, eligibility, payRange, maxApplications ? Number(maxApplications) : null, `+${daysActive} days`, jobId).run();
    return NextResponse.json({ success: true });
  }

  // 4. RESTORE SOFT DELETED JOB
  if (body.action === 'restore_job') {
    await db.prepare("UPDATE syndicate_jobs SET is_deleted = 0 WHERE id = ?").bind(body.jobId).run();
    return NextResponse.json({ success: true });
  }
}

// SOFT DELETE 
export async function DELETE(req: Request) {
  const db = (getRequestContext().env as any).reality_decoded_db;
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const type = searchParams.get('type');

  if (type === 'job') {
    // Soft Delete
    await db.prepare("UPDATE syndicate_jobs SET is_deleted = 1, is_active = 0 WHERE id = ?").bind(id).run();
  } else {
    // Hard Delete for applications
    await db.prepare("DELETE FROM job_applications WHERE tracking_id = ?").bind(id).run();
  }
  
  return NextResponse.json({ success: true });
}