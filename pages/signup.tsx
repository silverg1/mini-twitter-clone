import Head from "next/head";
import Header from "@components/header";
import Input from "@components/input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import useMutation from "@lib/useMutation";
import { useEffect } from "react";
import useSWR from "swr";
import { User } from "@prisma/client";

interface SignUpForm {
  id: string;
  password: string;
  passwordRe: string;
  nickname: string;
}

interface UserType {
  users: User[];
}

export default function SignUp() {
  const router = useRouter();
  const [signup, { loading, data }] = useMutation("/api/users/signup");
  const { data: userData } = useSWR<UserType>("/api/users/signup");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpForm>({ mode: "all" });

  const password = watch().password;

  const onValid = (validForm: SignUpForm) => {
    signup(validForm);
  };

  useEffect(() => {
    if (data?.ok) router.push("/login");
  }, [data]);

  return (
    <>
      <Head>
        <title>회원가입</title>
      </Head>
      <Header viewLogo={true} viewBack={true} />
      <form className="p-5" onSubmit={handleSubmit(onValid)}>
        <Input
          register={register("id", {
            required: "필수 항목입니다.",
            minLength: {
              message: "3자 이상 적어주세요.",
              value: 3,
            },
            validate: {
              alreadyExists: (value) =>
                !userData?.users.find((user) => user.userId === value) ||
                "이미 존재하는 아이디 입니다.",
            },
          })}
          id={"id"}
          name={"아이디"}
          type={"text"}
          errorMsg={errors.id?.message}
        />
        <Input
          register={register("password", {
            required: "필수 항목입니다.",
            minLength: {
              message: "3자 이상 적어주세요.",
              value: 3,
            },
          })}
          id={"password"}
          name={"비밀번호"}
          type={"password"}
          errorMsg={errors.password?.message}
        />
        <Input
          register={register("passwordRe", {
            required: "필수 항목입니다.",
            minLength: {
              message: "3자 이상 적어주세요.",
              value: 3,
            },
            validate: {
              samePassword: (value) =>
                value === password || "비밀번호가 일치하지 않아요.",
            },
          })}
          id={"password-re"}
          name={"비밀번호 재확인"}
          type={"password"}
          errorMsg={errors.passwordRe?.message}
        />
        <Input
          register={register("nickname", { required: "필수 항목입니다." })}
          id={"nickname"}
          name={"닉네임"}
          type={"text"}
          errorMsg={errors.nickname?.message}
        />
        <button
          type="submit"
          className="h-12 bg-blue-500 w-full rounded-lg text-white mt-5"
        >
          {loading ? "로딩중..." : "가입하기"}
        </button>
      </form>
    </>
  );
}
