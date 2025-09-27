import Head from 'next/head';
import CertificationTabs from '../components/Certification/CertificationTabs';

export default function Certifications() {
  return (
    <>
      <Head>
        <title>PEGA Certifications - CSA, CSSA, LSA Preparation | PegaStack</title>
        <meta 
          name="description" 
          content="Comprehensive PEGA certification preparation for CSA, CSSA, and LSA. Study materials, practice tests, and expert guidance."
        />
        <meta name="keywords" content="PEGA certification, CSA, CSSA, LSA, exam preparation, study guide" />
      </Head>

      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              PEGA Certification Preparation
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master your PEGA certification journey with comprehensive study materials, 
              practice tests, and expert guidance for CSA, CSSA, and LSA exams.
            </p>
          </div>
        </div>
      </div>

      <CertificationTabs />
    </>
  );
}
