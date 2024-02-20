"use client";
import { signOut } from "next-auth/react";

type Props = {};

const ButtonLogout = (props: Props) => {
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <button
      onClick={handleSignOut}
      className="inline-flex items-center bg-blue-500 border-0 py-1 px-3 focus:outline-none  rounded text-base text-white mt-4 md:mt-0"
    >
      Logout
    </button>
  );
};

export default ButtonLogout;
