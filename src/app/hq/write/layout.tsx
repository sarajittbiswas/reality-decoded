import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Write Transmission | Reality Decoded',
  description: 'Secure editor terminal.',
};

export default function WriteLayout({ children }: { children: React.ReactNode }) {
  return <div className="w-full h-full">{children}</div>;
}