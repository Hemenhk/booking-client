import { Media } from "@/types/types";
import { X } from "lucide-react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

type Props = {
  social_media: Media;
};

export default function TheSocialMedias({ social_media }: Props) {
  // Create a mapping of social media names to their icons
  const iconMapping = {
    instagram: <FaInstagram size={25} />,
    facebook: <FaFacebookF size={22} />,
    tiktok: <FaTiktok size={22} />,
    x: <X size={25} />,
    youtube: <FaYoutube size={25} />,
  };
  return (
    <ul className="flex items-center gap-4 pt-10">
      {Object.entries(social_media)
        .filter(([_, link]) => link !== "")
        .map(([platform, link]) => (
          <li key={platform}>
            <a href={link} target="_blank" rel="noopener noreferrer">
              <div className="bg-gray-600 text-gray-50 flex justify-center items-center size-10 rounded-full relative group">
                <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-gray-600 group-hover:animate-ping-once"></div>
                {iconMapping[platform]}{" "}
              </div>
            </a>
          </li>
        ))}
    </ul>
  );
}
