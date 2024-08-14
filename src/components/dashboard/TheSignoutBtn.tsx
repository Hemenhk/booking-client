"use client";
import { signOut } from "next-auth/react";

export default function TheSignoutBtn() {
  const signoutHandler = () => {
    signOut();
  };
  return (
    <p className="text-red-400 cursor-pointer" onClick={signoutHandler}>
      Logga ut
    </p>
  );
}
