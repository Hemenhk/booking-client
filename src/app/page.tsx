import bgImage from "../../public/search-bg.png";
import TheSearchService from "@/components/search-service/TheSearchService";

export default function Home() {
  const bgImageStyle = {
    background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${bgImage.src}) center/cover no-repeat`,
  };
  return (
    <main
      className="h-[75vh] flex flex-col items-center justify-center pt-48"
      style={bgImageStyle}
    >
      <h2
        className="text-4xl font-bold text-white pb-10"
      >
        Boka din skönhet- och hälsovårdstid 
      </h2>
      <TheSearchService />
    </main>
  );
}
