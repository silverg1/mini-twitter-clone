import { useRouter } from "next/router";
import moment from "moment";
import "moment/locale/ko";

interface ItemProps {
  isLinked: boolean;
  info?: any;
  text?: string;
  haveReaction: boolean;
}

export default function TweetItem({
  isLinked,
  info,
  text,
  haveReaction,
}: ItemProps) {
  const router = useRouter();

  const clickItem = () => {
    if (!isLinked) return;
    router.push(`/tweet/${info.id}`);
  };

  return (
    <div
      className="group border-b-[1px] p-3 flex gap-4 cursor-pointer hover:bg-slate-100"
      onClick={clickItem}
    >
      <img className="w-10 h-10 bg-slate-300 rounded-full" />
      <div className="flex-1 relative pr-20">
        <div className="flex gap-1 items-center">
          <span className="font-bold text-base">{info?.user?.nickname}</span>
          <span className="text-sm">@{info?.user?.userId}</span>
          <span className="text-sm">· {moment(info?.updatedAt).fromNow()}</span>
        </div>
        <p className="text-gray-600">{text}</p>
        {haveReaction && (
          <div className="flex pt-3 gap-5 items-center">
            <button className="flex gap-1 items-center">
              <svg
                className="w-5 h-5 text-gray-500"
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
              <span>{info._count.comments}</span>
            </button>
            <button className="flex gap-1 items-center">
              <svg
                className="w-5 h-5 text-gray-500"
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
              <span>{info._count.likes}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
