import Logo from "@components/logo";
import useMutation from "@lib/useMutation";
import Head from "next/head";
import { useRouter } from "next/router";

export default function LogOut() {
  const router = useRouter();
  const [logout] = useMutation("/api/users/logout");
  const onLogoutClick = () => {
    logout({});
    router.replace("/enter");
  };
  const onCancelClick = () => {
    router.replace("/");
  };
  return (
    <>
      <Head>
        <title>로그아웃</title>
      </Head>
      <div className="fixed inset-0 bg-black bg-opacity-60 z-20 flex items-center justify-center">
        <div className="bg-white rounded-md p-10 text-center">
          <Logo />
          <p className="mt-5 px-5">로그아웃 하시겠습니까?</p>
          <button
            onClick={onLogoutClick}
            className="w-full bg-black text-gray-100 rounded-lg h-9 mt-5 text-sm"
          >
            로그아웃
          </button>
          <button
            onClick={onCancelClick}
            className="w-full bg-gray-200 rounded-lg h-9 mt-3 text-sm"
          >
            취소
          </button>
        </div>
      </div>
    </>
  );
}
