import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Reality Decoded',
  description: 'Unedited reality and investigations.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <div className="w-full h-full">{children}</div>;
}