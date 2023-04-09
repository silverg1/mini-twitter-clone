import React from "react";
import TweetItem from "@components/item";
import Header from "@components/header";
import Head from "next/head";
import useUser from "@lib/useUser";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Tweet } from "@prisma/client";

interface TweetResponse {
  ok: boolean;
  tweets: Tweet[];
}

export default function Home() {
  const { user } = useUser();
  const router = useRouter();
  const { data } = useSWR<TweetResponse>("/api/tweet");

  const addNewTweet = () => {
    router.push("/tweet/new");
  };

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header viewLogo={true} user={user} />
      <div>
        {data?.tweets?.map((tweet) => (
          <TweetItem
            key={tweet.id}
            isLinked={true}
            info={tweet}
            text={tweet.text}
            haveReaction={true}
          />
        ))}
      </div>
      <div className="fixed bottom-0 inset-x-auto w-full max-w-xl">
        <button
          onClick={addNewTweet}
          className="absolute bottom-16 right-6 w-14 aspect-square rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600 transition-all"
        >
          <svg
            className="w-8 h-8 text-white"
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
              d="M12 4.5v15m7.5-7.5h-15"
            ></path>
          </svg>
        </button>
      </div>
    </>
  );
}
