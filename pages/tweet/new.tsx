import Header from "@components/header";
import useMutation from "@lib/useMutation";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface NewTweetForm {
  tweet: string;
}

export default () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<NewTweetForm>();
  const [addNewTweet, { loading, data }] = useMutation("/api/tweet");

  const onValid = (valid: NewTweetForm) => {
    if (loading) return;
    addNewTweet(valid);
  };

  useEffect(() => {
    if (data?.ok) {
      router.replace("/");
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>Add new Tweet</title>
      </Head>
      <Header viewBack={true} />
      <form onSubmit={handleSubmit(onValid)} className="p-5">
        <div className="flex justify-end mb-3">
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 rounded-full text-white leading-none hover:bg-blue-600"
          >
            {loading ? "Loading..." : "Tweet"}
          </button>
        </div>
        <div className="flex gap-3">
          <img className="w-12 h-12 bg-slate-300 rounded-full" />
          <textarea
            {...register("tweet")}
            className="flex-1 px-2 text-lg outline-none text-gray-800 resize-none"
            rows={10}
            placeholder="무슨 일이 일어나고 있나요?"
          />
        </div>
      </form>
    </>
  );
};
