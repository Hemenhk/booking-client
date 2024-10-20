"use client";

import { useEffect, useState } from "react";

// Debounce function to limit how often the scroll event is processed
function debounce(func: (...args: any) => void, wait: number) {
  let timeout: NodeJS.Timeout;
  return function (...args: any) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default function useScroll(threshold: number = 50) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (window.scrollY > threshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }, 15); // Set the debounce delay to 15ms for smoother updates

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return isScrolled;
}
