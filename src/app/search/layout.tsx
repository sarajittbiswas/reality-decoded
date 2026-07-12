import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Database Search | Reality Decoded',
  description: 'Query the Syndicate mainframe for classified intelligence.',
  robots: {
  index: false,
  follow: false,
}
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}