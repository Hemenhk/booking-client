import Image from "next/image";
import bgImage from "../../public/booksy-bg.jpg";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import TheSearchService from "@/components/search-service/TheSearchService";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center bg-gradient-to-r from-blue-50 via-pink-100 to-blue-50">
      <h2 className="mt-20 mb-14 h-full w-2/5 text-center text-5xl font-medium tracking-tight text-gray-800">
        Boka din tid hos svenska salonger utan krångel
      </h2>
      <TheSearchService />
    </main>
  );
}
