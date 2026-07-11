import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Press & Media | Reality Decoded',
  description: 'Official press releases and media assets.',
};

export default function PressLayout({ children }: { children: React.ReactNode }) {
  return <div className="w-full h-full">{children}</div>;
}