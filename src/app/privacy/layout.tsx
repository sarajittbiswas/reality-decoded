import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Protocols | Reality Decoded',
  description: 'Official data protection and security policies.',
  robots: {
  index: false,
  follow: false,
}
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}