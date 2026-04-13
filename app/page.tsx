import { FramerHeroExact } from "@/app/components/framer-hero/framer-hero-exact";
import { FramerExactNav } from "@/app/components/framer-nav/framer-exact-nav";

export default function Home() {
  return (
    <div className="min-h-full flex flex-col">
      <FramerExactNav />
      <FramerHeroExact />
    </div>
  );
}
