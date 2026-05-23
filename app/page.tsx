import Hero from '@/components/sections/Hero';
import OldWayCost from '@/components/sections/OldWayCost';
import Services from '@/components/sections/Services';
import Scrollytelling from '@/components/sections/Scrollytelling';
import Guarantee from '@/components/sections/Guarantee';
import HowItWorks from '@/components/sections/HowItWorks';
import WhoItsFor from '@/components/sections/WhoItsFor';
import FinalCTA from '@/components/sections/FinalCTA';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col overflow-hidden">
      <Hero />
      <OldWayCost />
      <Services />
      <Scrollytelling />
      <Guarantee />
      <HowItWorks />
      <WhoItsFor />
      <FinalCTA />
      <Footer />
    </main>
  );
}