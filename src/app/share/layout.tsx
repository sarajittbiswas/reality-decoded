import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Share Your Intelligence | Reality Decoded',
  description: 'Contribute your insights and experiences to the Syndicate community.',
  robots: {
  index: false,
  follow: false,
}
};

export default function ShareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}