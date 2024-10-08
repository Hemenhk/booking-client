import Image from "next/image";
import image from "../../../../public/empty.png";

export default function page() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl text-neutral-800 font-bold pb-10">
        Blog
      </h1>
      <div className="flex flex-col gap-4 items-center justify-center">
        <Image
        src={image}
        alt="image showing the content is empty"
        width={300}
        height={300}
      />
      <p className="text-neutral-700 text-sm">
        Bloggen är tom! Inlägg kommer inom kort
      </p>
      </div>
      
    </div>
  );
}
