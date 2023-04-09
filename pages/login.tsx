import Head from "next/head";
import Header from "@components/header";
import Input from "@components/input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import useMutation from "@lib/useMutation";
import { useEffect } from "react";

interface LoginForm {
  id: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const [login, { loading, data }] = useMutation("/api/users/login");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ mode: "all" });

  const onValid = (validForm: LoginForm) => {
    login(validForm);
  };

  useEffect(() => {
    if (data?.ok) router.push("/");
  }, [data]);

  return (
    <>
      <Head>
        <title>로그인</title>
      </Head>
      <Header viewLogo={true} viewBack={true} />
      <form className="p-5" onSubmit={handleSubmit(onValid)}>
        <Input
          register={register("id", { required: "필수 항목입니다." })}
          id={"id"}
          name={"아이디"}
          type={"text"}
          errorMsg={errors.id?.message}
        />
        <Input
          register={register("password", { required: "필수 항목입니다." })}
          id={"password"}
          name={"비밀번호"}
          type={"password"}
          errorMsg={errors.password?.message}
        />
        <button
          type="submit"
          className="h-12 bg-blue-500 w-full rounded-lg text-white mt-5"
        >
          {loading ? "로딩중..." : "로그인"}
        </button>
      </form>
    </>
  );
}
