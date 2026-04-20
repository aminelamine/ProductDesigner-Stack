import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { ObsoletSection } from "@/components/obsolet-section";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Hero />
      <About />
      <ObsoletSection />
      <Contact />
    </div>
  );
}
