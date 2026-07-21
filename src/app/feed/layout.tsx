import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Open Data API & RSS Feeds | Reality Decoded',
  description: 'Programmatic access to investigative field reports, RSS syndication feeds, and structured intelligence data.',
};

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}