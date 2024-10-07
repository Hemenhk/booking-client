import Image from "next/image";
import bgImage from "../../../public/bookely-bg.png";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import dottedSquare from "../../../public/dotted-square.png";
import TheFirstFeature from "@/components/business/TheFirstFeature";
import TheSecondFeature from "@/components/business/TheSecondFeature";
import Link from "next/link";
import TheThirdFeature from "@/components/business/TheThirdFeature";

export default function BusinessPage() {
  return (
    <main className="flex flex-col">
      <section className="flex flex-row relative items-center bg-zinc-50">
        <Image
          src={dottedSquare}
          width={300}
          height={300}
          alt="dotted square"
          className="absolute top-2 -left-40 opacity-0 animate-fade-in"
        />
        <div className="w-3/5 flex flex-col space-y-14 px-40 pb-48 pt-20 z-50">
          <h2 className="text-7xl font-semibold max-w-3xl opacity-0 animate-fade-in-up">
            Samla Alla Dina <span className="text-violet-600">Bokningar</span> I Ett Ställe
          </h2>
          <div className="border-y border-y-gray-300 py-5 w-4/5 opacity-0 animate-fade-in-up-delay">
            <p className="text-2xl capitalize">
              Låt oss ta hand om bokningen så du kan <span className="text-violet-600 font-bold">fokusera på det du vill</span>
            </p>
          </div>
          <div className="flex flex-row gap-4 animate-fade-in-right">
            <Button className="p-7 bg-violet-600 hover:bg-violet-800">
                <Link href={"/register-store"}>Gå med nu - Spara 50%</Link>
               </Button>
            <Button
              className="flex items-center gap-4 p-7 text-lg hover:bg-violet-50"
              variant={"ghost"}
            >
              Läs mer <ArrowDown size={18} />
            </Button>
          </div>
        </div>
        <div className="relative w-2/5 h-[92vh] right-5">
          <Image
            src={bgImage}
            alt="background image"
            layout="fill" 
            objectFit="cover"  
            className="animate-fade-in"
          />
        </div>
      </section>
      <TheFirstFeature />
      <TheSecondFeature />
      <TheThirdFeature />
    </main>
  );
}
