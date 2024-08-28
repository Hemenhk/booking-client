import Image from "next/image";
import bgImage from "../../public/booksy-bg.jpg";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-row justify-center items-center bg-gradient-to-r from-blue-50 via-pink-100 to-blue-50">
      <div className="absolute shadow-md mt-20 mx-auto h-40 w-48 z-50 bg-white rounded-md flex flex-col justify-center items-center">
        <h3 className="font-light text-xl text-center">Börja ta emot bokningar nu</h3>
        <div className="flex flex-row gap-3 justify-end items-center pr-3 pt-8 bg-violet-50 w-full">
          <Link className="font-light text-lg" href={"/register"}>Registrera dig</Link>
          <ArrowRight />
        </div>
      </div>
      <div className="w-2/4 h-[90vh]"></div>
      <div className="w-2/4 h-[90vh] relative overflow-hidden">
        <Image
          src={bgImage}
          alt="booksy bg image"
          layout="fill" // Make the image fill the div
          objectFit="cover" // Cover the entire div
          className="brightness-90"
        />
      </div>
    </main>
  );
}
