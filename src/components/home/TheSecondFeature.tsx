import Image from "next/image";
import featureImage from "../../../public/features-2.png";

export default function TheSecondFeature() {
  return (
    <section className="flex flex-row items-center justify-center gap-32 bg-zinc-50 py-16 px-48">
      <div className="relative">
        <Image
          src={featureImage}
          alt="feature image"
          className="animate-fade-in"
         width={600}
         height={600}
        />
      </div>
      <div className="flex flex-col w-1/3">
        <h3 className="text-5xl font-extrabold mb-12 text-gray-800 animate-fade-in-left">
          Undvik stressen av att driva företag
        </h3>
        <p className="text-xl animate-fade-in-up">
         Med vårt system, <strong>räknar vi din inkomst</strong> baserat på dina bokningar och priser så att du kan luta dig tillbaka och njuta av det du brinner för.
        </p>
      </div>
    </section>
  );
}
