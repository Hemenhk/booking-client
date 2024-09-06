import Image from "next/image";
import phone from "../../../public/phone-1.png";

export default function TheEasyBookings() {
  return (
    <section className="flex flex-row items-center justify-center gap-32 bg-zinc-50 py-32 px-48">
      <div className="flex flex-col w-1/3">
        <h3 className="text-5xl font-extrabold mb-12 text-gray-800 animate-fade-in-right">
          Håll dig bokad utan att jaga kunder
        </h3>
        <p className="text-xl animate-fade-in-up">
          Fyll ditt schema och skapa en lojal kundbas med vårt{" "}
          <strong>lätta online bokningssystem</strong> som automatiserar
          processen åt dig.
        </p>
      </div>
      <div className="flex items-center justify-center animate-fade-in ">
        <Image
          src={phone}
          alt="phone"
          className="relative"
          width={400}
          height={400}
        />
      </div>
    </section>
  );
}
