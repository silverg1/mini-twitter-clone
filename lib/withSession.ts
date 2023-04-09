import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user: {
      id: number;
    };
  }
}

const cookieOption = {
  cookieName: "tweetsession",
  password: process.env.COOKIE_PASSWORD!,
};

export default function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOption);
}
