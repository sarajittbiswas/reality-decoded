'use server'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAdmin(formData: FormData) {
  const password = formData.get('password');
  
  if (password === 'syndicate-secret-key') {
    // Simplest possible cookie set
    const cookieStore = await cookies();
    cookieStore.set('admin_key', 'syndicate-secret-key', { 
      httpOnly: true, 
      path: '/',
      sameSite: 'lax' 
    });
    
    console.log("Action: Cookie set. Redirecting to /hq");
    redirect('/hq');
  }
  
  return { error: 'Invalid Credentials' };
}