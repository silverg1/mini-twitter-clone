import { NextApiRequest, NextApiResponse } from "next";
import db from "@lib/db";
import withHandler from "@lib/withHandler";
import withApiSession from "@lib/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const tweets = await db.tweet.findMany({
      include: {
        user: {
          select: {
            userId: true,
            nickname: true,
          },
        },
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });
    res.json({ ok: true, tweets });
  }
  if (req.method === "POST") {
    const {
      body: { tweet },
      session: { user },
    } = req;
    const newTweet = await db.tweet.create({
      data: {
        text: tweet,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({ ok: true, newTweet });
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler })
);
