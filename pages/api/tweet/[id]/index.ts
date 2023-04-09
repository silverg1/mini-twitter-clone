import { NextApiRequest, NextApiResponse } from "next";
import db from "@lib/db";
import withHandler from "@lib/withHandler";
import withApiSession from "@lib/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    session: { user },
  } = req;
  const tweet = await db.tweet.findUnique({
    where: { id: Number(id) },
    include: {
      user: {
        select: {
          userId: true,
          nickname: true,
        },
      },
      comments: {
        include: {
          user: {
            select: {
              userId: true,
              nickname: true,
            },
          },
        },
      },
    },
  });
  const isLiked = Boolean(
    await db.like.findFirst({
      where: {
        tweetId: tweet?.id,
        userId: user?.id,
      },
    })
  );
  res.json({ ok: true, tweet, isLiked });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
