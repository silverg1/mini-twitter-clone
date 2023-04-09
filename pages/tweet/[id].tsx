import TweetItem from "@components/item";
import Head from "next/head";
import Header from "@components/header";
import useSWR from "swr";
import { useRouter } from "next/router";
import useMutation from "@lib/useMutation";
import moment from "moment";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Comment, Tweet, User } from "@prisma/client";

interface CommentType {
  comment: string;
}

interface TweetType extends Tweet {
  user: User;
  comments: Comment[];
}

interface TweetResponse {
  ok: boolean;
  tweet: TweetType;
  isLiked: boolean;
}

export default () => {
  const router = useRouter();
  const { data, mutate } = useSWR<TweetResponse>(
    router.query.id ? `/api/tweet/${router.query.id}` : null
  );
  const [toggleLike] = useMutation(`/api/tweet/${router.query.id}/like`);
  const [reply, { loading }] = useMutation(
    `/api/tweet/${router.query.id}/comments`
  );
  const [viewComment, setViewComment] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<CommentType>();

  const onLikeClick = () => {
    if (!data) return;
    mutate({ ...data, isLiked: !data.isLiked }, false);
    toggleLike({});
  };

  const onCommentClick = () => {
    setViewComment(!viewComment);
  };

  const commentValid = (valid: CommentType) => {
    if (loading) return;
    reply(valid);
    reset();
    mutate();
  };

  return (
    <>
      <Head>
        <title>{data?.tweet?.user?.nickname} on Twitter</title>
      </Head>
      <Header viewBack={true} />
      <div className="p-5 border-b-[1px]">
        <div className="flex gap-3 items-center">
          <img className="w-12 h-12 bg-slate-300 rounded-full" />
          <div>
            <div className="font-bold text-base">
              {data?.tweet.user.nickname}
            </div>
            <div className="text-sm">@{data?.tweet.user.userId}</div>
          </div>
        </div>
        <p className="text-gray-600 pt-3">{data?.tweet.text}</p>
        <p className="text-gray-400 text-sm pt-3">
          {moment(data?.tweet.updatedAt).format("LT · LL")}
        </p>
      </div>
      <div className="flex h-12 border-b-[1px]">
        <button
          className="flex-1 flex justify-center items-center hover:bg-slate-100"
          onClick={onCommentClick}
        >
          {viewComment ? (
            <svg
              className="w-6 h-6 text-gray-600"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-gray-600"
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
                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
              ></path>
            </svg>
          )}
        </button>
        <button
          className="flex-1 flex justify-center items-center hover:bg-slate-100"
          onClick={onLikeClick}
        >
          {data?.isLiked ? (
            <svg
              className="w-6 h-6 text-red-500"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-gray-600"
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
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              ></path>
            </svg>
          )}
        </button>
      </div>
      {viewComment && (
        <form
          onSubmit={handleSubmit(commentValid)}
          className="p-5 border-b-[1px] flex gap-4 pb-3"
        >
          <img className="w-12 h-12 bg-slate-300 rounded-full" />
          <div className="flex-1">
            <textarea
              {...register("comment")}
              className="border-2 border-gray-300 rounded-md w-full px-2"
              rows={3}
              required
            ></textarea>
            <div className="flex justify-end">
              <button
                type="submit"
                className="py-2 px-4 bg-blue-500 rounded-full text-white text-sm leading-none mt-1"
              >
                {loading ? "Loading..." : "Reply"}
              </button>
            </div>
          </div>
        </form>
      )}
      {data?.tweet.comments.map((comment) => (
        <TweetItem
          key={comment.id}
          isLinked={false}
          info={comment}
          text={comment.comment}
          haveReaction={false}
        />
      ))}
    </>
  );
};
