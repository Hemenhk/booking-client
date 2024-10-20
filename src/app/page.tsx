import TheFirstFeature from "@/components/home/TheFirstFeature";
import bgImage from "../../public/search-bg.png";
import TheSearchService from "@/components/search-service/TheSearchService";
import TheServiceCategories from "@/components/home/TheCategories";
import TheSearchServiceMobile from "@/components/search-service/components/TheSearchServiceMobile";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import TheCategories from "@/components/home/TheCategories";
import TheSecondFeature from "@/components/home/TheSecondFeature";

export default function Home() {
  const bgImageStyle = {
    background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${bgImage.src}) center/cover no-repeat`,
  };
  return (
    <main>
      <section
        className="h-[75vh] flex flex-col items-center justify-center pt-48"
        style={bgImageStyle}
      >
        <h2 className="text-3xl text-center md:text-4xl font-bold text-white pb-10">
          Boka din skönhet- och hälsovårdstid
        </h2>
        <TheSearchService />
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex md:hidden flex-row items-center w-4/5 py-2 px-4 rounded-full bg-white">
              <Search />
              <Input
                type="text"
                className="w-full border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Sök efter butik eller tjänst"
              />
              <Button className="rounded-full tracking-wide font-light">
                Sök
              </Button>
            </div>
          </DialogTrigger>
          <TheSearchServiceMobile />
        </Dialog>
      </section>
      <section className="bg-zinc-50 flex flex-col justify-center items-center px-16 py-8 gap-48">
        <TheCategories />
        <TheSecondFeature />
        <TheFirstFeature />
      </section>
    </main>
  );
}
