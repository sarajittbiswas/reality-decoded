import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use | Reality Decoded',
  description: 'Legal guidelines and operational mandates.',
  robots: {
  index: false,
  follow: false,
}
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}