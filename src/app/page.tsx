import { About, Marquee } from "@/components/about";
import { CommandMenu } from "@/components/command-menu";
import { Contact } from "@/components/contact";
import { Cursor } from "@/components/cursor";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Wins } from "@/components/wins";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <CommandMenu />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Wins />
        <Contact />
      </main>
    </>
  );
}
