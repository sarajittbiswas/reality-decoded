import { getRequestContext } from '@cloudflare/next-on-pages';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
export const runtime = 'edge';

// FIXED: searchParams is now typed as a Promise for Next.js 15
export default async function StatusPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  // FIXED: We must await searchParams before using it
  const resolvedParams = await searchParams;
  const trackingId = resolvedParams.id?.toUpperCase();
  
  const db = (getRequestContext().env as any).reality_decoded_db;
  
  let application = null;
  if (trackingId) {
    application = await db.prepare("SELECT status, applicant_name FROM job_applications WHERE tracking_id = ?").bind(trackingId).first();
  }

  // Determine current step (1 to 3)
  let currentStep = 0;
  if (application) {
    if (application.status === 'submitted') currentStep = 1;
    if (application.status === 'in_review') currentStep = 2;
    if (application.status === 'selected' || application.status === 'rejected') currentStep = 3;
  }

  return (
    <main className="w-full bg-[#0a0a0a] text-white min-h-screen flex items-center justify-center p-6">
      <div className="bg-[#111111] p-10 rounded-3xl border border-white/10 max-w-2xl w-full shadow-2xl">
        
        {!application ? (
          <div className="text-center">
            <h1 className={`${spaceGrotesk.className} text-2xl font-bold text-red-400 mb-2`}>Invalid Tracking ID</h1>
            <p className="text-gray-400 mb-6">We could not locate this application in our records.</p>
            <a href="/careers" className="text-purple-400 hover:underline">Return to Careers</a>
          </div>
        ) : (
          <div>
            <div className="mb-10 text-center">
              <h2 className="text-xs font-mono text-gray-500 tracking-widest uppercase mb-2">ID: {trackingId}</h2>
              <h1 className={`${spaceGrotesk.className} text-3xl font-bold`}>Application Status</h1>
              <p className="text-gray-400 mt-2">Applicant: {application.applicant_name}</p>
            </div>

            {/* Progress Bar UI */}
            <div className="relative flex justify-between items-center mb-8">
              {/* Connecting Line */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -z-10 -translate-y-1/2 rounded"></div>
              <div className={`absolute top-1/2 left-0 h-1 bg-purple-600 -z-10 -translate-y-1/2 transition-all duration-500 rounded`} 
                   style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }}></div>

              {/* Step 1 */}
              <div className="flex flex-col items-center gap-3 bg-[#111] px-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${currentStep >= 1 ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 'bg-gray-800 text-gray-500'}`}>1</div>
                <span className={`text-sm font-medium ${currentStep >= 1 ? 'text-white' : 'text-gray-500'}`}>Submitted</span>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center gap-3 bg-[#111] px-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${currentStep >= 2 ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 'bg-gray-800 text-gray-500'}`}>2</div>
                <span className={`text-sm font-medium ${currentStep >= 2 ? 'text-white' : 'text-gray-500'}`}>In Review</span>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center gap-3 bg-[#111] px-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg 
                  ${currentStep === 3 && application.status === 'selected' ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 
                    currentStep === 3 && application.status === 'rejected' ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 
                    'bg-gray-800 text-gray-500'}`}>3</div>
                <span className={`text-sm font-medium ${currentStep === 3 ? 'text-white' : 'text-gray-500'}`}>
                  {application.status === 'selected' ? 'Approved' : application.status === 'rejected' ? 'Rejected' : 'Decision'}
                </span>
              </div>
            </div>

            {/* Helper Text */}
            <div className="text-center bg-white/5 p-4 rounded-xl border border-white/10">
              <p className="text-sm text-gray-300">
                {application.status === 'submitted' && "Your application has been received. Our HR team will review it shortly."}
                {application.status === 'in_review' && "Your portfolio and details are currently being evaluated by our team."}
                {application.status === 'selected' && "Congratulations! You have been selected. Please check your email for the next steps."}
                {application.status === 'rejected' && "While your profile is impressive, we are not moving forward at this time. Your info remains on file."}
              </p>
            </div>
            
          </div>
        )}
      </div>
    </main>
  );
}