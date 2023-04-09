import Header from "@components/header";
import Head from "next/head";
import Link from "next/link";

export default function Enter() {
  return (
    <>
      <Head>
        <title>트위터 시작하기</title>
      </Head>
      <Header viewLogo={true} />
      <div className="p-10 space-y-5">
        <Link href={"/signup"}>
          <button className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-gray-100 rounded-lg">
            회원가입
          </button>
        </Link>
        <Link href={"/login"}>
          <button className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-gray-100 rounded-lg">
            로그인
          </button>
        </Link>
      </div>
    </>
  );
}
