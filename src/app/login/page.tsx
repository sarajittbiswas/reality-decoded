'use client'
import { loginAdmin } from '../actions/login';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <form action={loginAdmin} className="bg-[#111] p-8 border border-white/10 rounded-xl">
        <h1 className="text-white font-bold mb-4">Syndicate Access</h1>
        <input name="password" type="password" className="bg-black border p-2 w-full mb-4 text-white" placeholder="Password" />
        <button type="submit" className="bg-purple-600 text-white w-full py-2 rounded">Enter HQ</button>
      </form>
    </div>
  );
}