import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HQ Terminal | Reality Decoded',
  description: 'Syndicate Headquarters secure access.',
};

export default function HQLayout({ children }: { children: React.ReactNode }) {
  return <div className="w-full h-full">{children}</div>;
}