import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HR Dashboard | Reality Decoded',
  description: 'RealityDecoded HR Portal - secure access.',
};

export default function HQLayout({ children }: { children: React.ReactNode }) {
  return <div className="w-full h-full">{children}</div>;
}