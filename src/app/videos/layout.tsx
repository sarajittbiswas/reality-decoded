import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Transmissions | Reality Decoded',
  description: 'Our complete collection of visual investigations.',
};

export default function VideosLayout({ children }: { children: React.ReactNode }) {
  // A sub-layout must NEVER contain <html> or <body> tags
  return <div className="w-full">{children}</div>;
}