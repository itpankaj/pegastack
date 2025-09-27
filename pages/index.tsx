import Hero from '../components/Home/Hero';
import FeaturedTutorials from '../components/Home/FeaturedTutorials';
import CertificationPath from '../components/Home/CertificationPath';
import Testimonials from '../components/Home/Testimonials';
import LatestArticles from '../components/Home/LatestArticles';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>PegaStack.com - Master PEGA BPM From Scratch to Pro</title>
        <meta 
          name="description" 
          content="Complete PEGA BPM learning path from Beginner to LSA certification. Interactive tutorials, hands-on projects, and certification prep all in one place."
        />
        <meta name="keywords" content="PEGA, BPM, CSA, CSSA, LSA, tutorials, certification, training" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero />
      <FeaturedTutorials />
      <CertificationPath />
      <Testimonials />
      <LatestArticles />
    </>
  );
}
