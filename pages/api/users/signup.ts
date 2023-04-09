import { NextApiRequest, NextApiResponse } from "next";
import db from "@lib/db";
import withHandler from "@lib/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const users = await db.user.findMany();
    res.json({ users });
  }

  if (req.method === "POST") {
    const { id, password, nickname } = req.body;
    await db.user.create({
      data: {
        userId: id,
        password,
        nickname,
      },
    });
    res.json({ ok: true });
  }
}

export default withHandler({
  methods: ["GET", "POST"],
  handler,
  isPrivate: false,
});
