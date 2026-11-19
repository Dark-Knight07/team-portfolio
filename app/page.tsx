import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";
import { Featured, Stats, Marquee } from "@/components/Intro";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Portfolio } from "@/components/Portfolio";
import { Blog } from "@/components/Blog";
import { Team } from "@/components/Team";
import { Faq, Cta } from "@/components/Closing";

// Below-the-fold interactive sections are split into their own bundles.
const TechExplorer = dynamic(() => import("@/components/TechExplorer").then((m) => m.TechExplorer));
const StartProject = dynamic(() => import("@/components/StartProject").then((m) => m.StartProject));

export default function Home() {
  return (
    <>
      <Hero />
      <Featured />
      <Stats />
      <Marquee />
      <Services />
      <Process />
      <TechExplorer />
      <Portfolio />
      <Blog />
      <Team />
      <StartProject />
      <Faq />
      <Cta />
    </>
  );
}
