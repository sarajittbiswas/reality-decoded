import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ & Protocols | Reality Decoded',
  description: 'Frequently asked questions about the Reality Decoded syndicate, our operatives, and how to submit intel.',
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <div className="w-full">{children}</div>;
}