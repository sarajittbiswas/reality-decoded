import { getRequestContext } from '@cloudflare/next-on-pages';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const db = (getRequestContext().env as any).reality_decoded_db;
    const body = await req.json();
    const { jobId, name, email, portfolio, qualification, gender, age, flexible_hours, disability, perks, consent } = body;

    // 1. SPAM CHECK: Is Email Blacklisted?
    const isBlocked = await db.prepare("SELECT email FROM hr_blacklist WHERE email = ?").bind(email).first();
    if (isBlocked) return NextResponse.json({ success: false, error: 'Our systems have restricted this email from applying.' }, { status: 403 });

    // 2. SPAM CHECK: Duplicate Application for this specific job?
    const existing = await db.prepare("SELECT tracking_id FROM job_applications WHERE email = ? AND job_id = ? AND status != 'rejected'").bind(email, jobId).first();
    if (existing) return NextResponse.json({ success: false, error: 'You have already applied for this role.' }, { status: 400 });

    // 3. Insert Application
    const trackingId = `SYND-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Date.now().toString().slice(-4)}`;
    
    // BUG FIX: Cloudflare D1 will crash if you pass "undefined". We must use "|| null" for all optional fields.
    await db.prepare(
      "INSERT INTO job_applications (tracking_id, job_id, applicant_name, email, portfolio_link, qualification, gender, age, flexible_hours, disability, perks, consent, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'submitted')"
    ).bind(
      trackingId, 
      jobId, 
      name, 
      email, 
      portfolio || null, 
      qualification || null, 
      gender || null, 
      age || null, 
      flexible_hours || null, 
      disability || null, 
      perks || null, 
      consent || null
    ).run();

    // 4. Fetch Job Data for Email
    const jobData = await db.prepare("SELECT role FROM syndicate_jobs WHERE id = ?").bind(jobId).first();

    // 5. Send Professional Corporate Email
    if (process.env.RESEND_API_KEY) {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0a0a0a; padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">Reality Decoded</h1>
          </div>
          <div style="padding: 40px 30px; background-color: #ffffff; color: #333333;">
            <p style="font-size: 16px;">Dear ${name},</p>
            <p style="font-size: 16px; line-height: 1.6;">Thank you for your interest in joining our team. We have successfully received your application for the <strong>${jobData?.role || 'open position'}</strong>.</p>
            <div style="background-color: #f9fafb; border-left: 4px solid #6b21a8; padding: 15px; margin: 25px 0;">
              <p style="margin: 0; font-size: 14px; color: #666;">Application Tracking ID:</p>
              <p style="margin: 5px 0 0 0; font-size: 18px; font-weight: bold; font-family: monospace; color: #6b21a8;">${trackingId}</p>
            </div>
            <p style="font-size: 16px; line-height: 1.6;">Our Talent Acquisition team will carefully review your profile against the requirements of the role. If your qualifications align with our current needs, we will contact you to schedule an initial interview.</p>
            <p style="font-size: 16px; margin-top: 30px;">Best regards,<br/><strong>Human Resources</strong><br/>Reality Decoded</p>
          </div>
        </div>
      `;
      
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Reality Decoded Careers <hr@realitydecoded.in>',
          to: email,
          subject: `Application Received: ${jobData?.role || 'Reality Decoded'}`,
          html: emailHtml
        })
      });
    }

    return NextResponse.json({ success: true, trackingId });
  } catch (error: any) {
    console.error("Apply Error:", error);
    // BUG FIX: Send the ACTUAL error message to the frontend so we stop guessing!
    return NextResponse.json({ success: false, error: `DB Error: ${error.message}` }, { status: 500 });
  }
}