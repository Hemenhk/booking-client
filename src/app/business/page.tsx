import Image from "next/image";
import bgImage from "../../../public/business-feature-1.png";

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
        <div className="w-3/5 flex flex-col space-y-14 px-40 pb-48 pt-20 z-50">
          <h2 className="text-7xl font-semibold max-w-3xl opacity-0 animate-fade-in-up">
            Samla Alla Dina <span className="text-violet-500">Bokningar</span> I
            Ett Ställe
          </h2>
          <div className="border-y border-y-gray-300 py-5 w-4/5 opacity-0 animate-fade-in-up-delay">
            <p className="text-2xl capitalize">
              Låt oss ta hand om bokningen så du kan{" "}
              <span className="text-violet-500 font-bold">
                fokusera på det du vill
              </span>
            </p>
          </div>
          <div className="flex flex-row gap-4 animate-fade-in-right">
            <Button className="p-7 bg-violet-500 hover:bg-violet-800">
              <Link href={"/register-store"}>Gå med nu - Spara 50%</Link>
            </Button>
          </div>
        </div>
        <Image src={bgImage} alt="background image" width={420} height={420} />
      </section>
      <TheFirstFeature />
      <TheSecondFeature />
      <TheThirdFeature />
    </main>
  );
}
