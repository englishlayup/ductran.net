import { NextApiRequest, NextApiResponse } from "next";
import { searchPosts } from "../../lib/redis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const q = req.query.q;
  const posts = await searchPosts(q as string);
  res.status(200).json({ posts });
}
