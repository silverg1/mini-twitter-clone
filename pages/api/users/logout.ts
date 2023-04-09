import { NextApiRequest, NextApiResponse } from "next";
import withApiSession from "@lib/withSession";
import withHandler from "@lib/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  req.session.user = {
    id: -1,
  };
  await req.session.save();
  return res.json({ ok: true });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
