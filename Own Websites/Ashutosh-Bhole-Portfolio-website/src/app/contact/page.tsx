import Contact from '@/pages/Contact';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Contact - Niladri Chatterjee',
	description: 'Get in touch with Niladri Chatterjee, a Software Developer specializing in full-stack development.',
};

export default function ContactPage() {
	return <Contact />;
}