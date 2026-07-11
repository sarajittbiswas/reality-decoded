import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Intel Logs | Reality Decoded',
  description: 'Read the latest deep dives and decrypted files.',
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return <div className="w-full">{children}</div>;
}