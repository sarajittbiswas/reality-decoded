import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Operatives | Reality Decoded',
  description: 'Meet the individuals behind the Syndicate transmissions.',
  robots: {
  index: false,
  follow: false,
}
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}