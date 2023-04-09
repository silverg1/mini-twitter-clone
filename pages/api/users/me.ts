import withApiSession from "@lib/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import db from "@lib/db";
import withHandler from "@lib/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await db.user
    .findUnique({
      where: {
        id: req.session.user.id,
      },
    })
    .then((profile) => {
      res.json({ ok: true, profile });
    })
    .catch(() => res.json({ ok: false }));
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
