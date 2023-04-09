import { NextApiRequest, NextApiResponse } from "next";
import db from "@lib/db";
import withApiSession from "@lib/withSession";
import withHandler from "@lib/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, password } = req.body;
  const exisingUser = await db.user.findFirst({
    where: { userId: id, password },
  });
  if (!exisingUser) return res.json({ ok: false });
  req.session.user = {
    id: exisingUser?.id,
  };
  await req.session.save();
  return res.json({ ok: true });
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false })
);
