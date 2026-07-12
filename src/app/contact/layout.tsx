import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Reality Decoded',
  description: 'Secure communication line for transmissions and inquiries.',
  robots: {
  index: false,
  follow: false,
}
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}