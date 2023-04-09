import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import Logo from "./logo";

interface HeaderType {
  viewLogo?: boolean;
  viewBack?: boolean;
  user?: User;
}

export default function Header({ viewLogo, viewBack, user }: HeaderType) {
  const [viewProfile, setViewProfile] = useState<boolean>(false);
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  const onProfileClick = () => {
    setViewProfile(!viewProfile);
  };
  const onLogoutClick = () => {
    router.push("/logout");
  };
  return (
    <header className="h-16 flex items-center justify-center sticky top-0 inset-x-0 bg-opacity-80 bg-white shadow-sm z-10">
      {viewLogo && <Logo />}
      {viewBack && (
        <button onClick={goBack} className="absolute left-4">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            ></path>
          </svg>
        </button>
      )}
      {user && (
        <button
          onClick={onProfileClick}
          className="w-9 aspect-square rounded-md bg-blue-400 hover:bg-blue-500 absolute right-4 text-white transition-all"
        >
          {user.nickname[0].toUpperCase()}
        </button>
      )}
      {viewProfile && (
        <div className="bg-gray-100 absolute top-full right-4 py-3 rounded-2xl shadow-md -mt-2 w-32 overflow-hidden">
          <div className="px-3">
            <p className="text-2xl font-semibold cursor-default text-gray-600">
              {user?.nickname}
            </p>
            <p className="cursor-default text-gray-600">@{user?.userId}</p>
          </div>
          <button
            onClick={onLogoutClick}
            className="text-gray-500 flex gap-1 hover:bg-gray-200 w-full h-9 px-3 items-center mt-3 hover:text-gray-600 transition-all"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              ></path>
            </svg>
            로그아웃
          </button>
        </div>
      )}
    </header>
  );
}
