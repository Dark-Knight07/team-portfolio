import { Hero } from "@/components/Hero";
import { Featured, Stats, Marquee } from "@/components/Intro";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Portfolio } from "@/components/Portfolio";
import { Blog } from "@/components/Blog";
import { Team } from "@/components/Team";
import { Faq, Cta } from "@/components/Closing";

export default function Home() {
  return (
    <>
      <Hero />
      <Featured />
      <Stats />
      <Marquee />
      <Services />
      <Process />
      <Portfolio />
      <Blog />
      <Team />
      <Faq />
      <Cta />
    </>
  );
}
