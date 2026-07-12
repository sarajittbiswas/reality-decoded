import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Archives | Reality Decoded',
  description: 'Historical records and documentation.',
  robots: {
  index: false,
  follow: false,
}
};

export default function ArchivesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}