import { NextApiRequest, NextApiResponse } from "next";
import db from "@lib/db";
import withHandler from "@lib/withHandler";
import withApiSession from "@lib/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { comment },
    session: { user },
    query: { id },
  } = req;
  await db.comment.create({
    data: {
      comment,
      user: {
        connect: {
          id: user?.id,
        },
      },
      tweet: {
        connect: {
          id: Number(id),
        },
      },
    },
  });
  res.json({ ok: true });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
