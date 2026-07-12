import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers | Reality Decoded',
  description: 'Join the Syndicate. Open positions for field agents and analysts.',
  robots: {
  index: false,
  follow: false,
}
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}