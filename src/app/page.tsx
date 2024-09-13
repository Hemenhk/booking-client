import TheFirstFeature from "@/components/home/TheFirstFeature";
import bgImage from "../../public/search-bg.png";
import TheSearchService from "@/components/search-service/TheSearchService";
import TheServiceCategories from "@/components/home/TheServiceCategories";

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
        <h2 className="text-4xl font-bold text-white pb-10">
          Boka din skönhet- och hälsovårdstid
        </h2>
        <TheSearchService />
      </section>
      <section className="bg-zinc-50 flex flex-col justify-center px-48 py-32 gap-48">
        <TheServiceCategories />
        <TheFirstFeature />
      </section>
    </main>
  );
}
