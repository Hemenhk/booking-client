import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function TheSocialMedias() {


  const links = [
    { name: "Instagram", icon: <FaInstagram size={25} /> },
    { name: "Facebook", icon: <FaFacebookF size={22} /> },
  ];

  return (
    <ul className="flex items-center gap-4 pt-10">
      {links.map((link) => (
        <a href={"/"} key={link.name} target="_blank">
        <div className="bg-gray-600 text-gray-50 flex justify-center items-center size-10 rounded-full relative group">
          <div className="absolute inset-0  rounded-full border-2 border-transparent group-hover:border-gray-600 group-hover:animate-ping-once"></div>
          {link.icon}
        </div>
      </a>
      ))}
    </ul>
  );
}
