import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Dr. Ishwar Chandra Behera | Senior Neurointensivist & Emergency Medicine Specialist',
  description:
    'Official medical website of Dr. Ishwar Chandra Behera, MD, FAEM, FCCM, DFID. Senior Neurointensivist & Director at Aspire Hospital, Bhubaneswar; Former Faculty at IMS & SUM Hospital. Providing evidence-based neurocritical care, emergency trauma medicine, and diabetes consultations.',
  keywords: [
    'Dr. Ishwar Chandra Behera',
    'Dr. Ishwara Behera',
    'Neurointensivist Bhubaneswar',
    'Emergency Medicine Doctor Odisha',
    'Critical Care Specialist Bhubaneswar',
    'Aspire Hospital Doctors',
    'IMS SUM Hospital Physician',
    'Stroke Specialist Bhubaneswar',
    'Diabetologist Bhubaneswar',
  ],
  authors: [{ name: 'Dr. Ishwar Chandra Behera' }],
  creator: 'Dr. Ishwar Chandra Behera Clinic',
  metadataBase: new URL('https://drishwarbehera.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'profile',
    title: 'Dr. Ishwar Chandra Behera | Senior Neurointensivist & Emergency Specialist',
    description:
      'Verified medical profile, qualifications, PubMed research publications, and appointment booking for Dr. Ishwar Chandra Behera (MD, FAEM, FCCM, DFID) in Bhubaneswar.',
    url: 'https://drishwarbehera.com',
    siteName: 'Dr. Ishwar Chandra Behera Medical Practice',
    locale: 'en_IN',
    images: [
      {
        url: '/images/dr-ishwar-chandra-behera.jpg',
        width: 800,
        height: 800,
        alt: 'Dr. Ishwar Chandra Behera - Senior Neurointensivist in Bhubaneswar',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: 'Dr. Ishwar Chandra Behera',
    image: 'https://drishwarbehera.com/images/dr-ishwar-chandra-behera.jpg',
    medicalSpecialty: [
      'Neurocritical Care',
      'Emergency Medicine',
      'Critical Care Medicine',
      'Internal Medicine',
      'Diabetology',
    ],
    telephone: '+91-8260500020',
    email: 'info@aspirehospital.co.in',
    url: 'https://drishwarbehera.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Plot No: 163, 208, Ekamra Road, Unit-6, Ganga Nagar',
      addressLocality: 'Bhubaneswar',
      addressRegion: 'Odisha',
      postalCode: '751001',
      addressCountry: 'IN',
    },
    hospitalAffiliation: [
      {
        '@type': 'Hospital',
        name: 'Aspire Hospital',
        address: 'Unit-6, Ganga Nagar, Bhubaneswar, Odisha',
      },
      {
        '@type': 'Hospital',
        name: 'IMS and SUM Hospital',
        address: 'K8, Kalinga Nagar, Bhubaneswar, Odisha',
      },
    ],
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'Christian Medical College (CMC), Vellore',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'S.C.B. Medical College, Cuttack',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'V.S.S. Medical College, Burla',
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white text-[#263238] antialiased selection:bg-[#0F9D92]/20 selection:text-[#12304A]">
        {children}
      </body>
    </html>
  );
}
