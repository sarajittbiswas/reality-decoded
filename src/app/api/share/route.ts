import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

// Save the text snippet to the new intel_submissions table
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { alias, email, subject, story } = data; // Note: 'subject' is from your old form, we will prepend it to the story or ignore it.

    const db = (getRequestContext().env as any).reality_decoded_db;
    const newId = crypto.randomUUID();
    
    // Combine subject and story to fit the new schema if needed, or just insert the story.
    const fullStory = subject ? `[SUBJECT: ${subject}]\n\n${story}` : story;
    
    // Insert into the newly created intel_submissions DB
    await db.prepare(
      'INSERT INTO intel_submissions (id, name, contact, story, status) VALUES (?, ?, ?, ?, ?)'
    ).bind(
      newId, 
      alias || 'Anonymous', 
      email || 'No Contact Provided', 
      fullStory, 
      'pending' // Marks it as pending review for the HQ
    ).run();

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    console.error("DB Submission Error:", error);
    return new Response(JSON.stringify({ error: 'Database insertion failed' }), { status: 500 });
  }
}

// Fetch the latest drops for the animated sidebar (Now pulling from intel_submissions)
export async function GET() {
  try {
    const db = (getRequestContext().env as any).reality_decoded_db;
    
    // Pull the latest 7 pending submissions
    const { results } = await db.prepare(
      "SELECT name, story FROM intel_submissions WHERE status = 'pending' ORDER BY submitted_at DESC LIMIT 7"
    ).all();
    
    // Map 'story' back to 'subject' so your frontend sidebar animation doesn't break
    const mappedResults = results.map((row: any) => ({
      name: row.name,
      subject: row.story.substring(0, 40) + '...' // Takes the first 40 characters as a preview
    }));

    return new Response(JSON.stringify(mappedResults), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify([]), { status: 200 }); 
  }
}