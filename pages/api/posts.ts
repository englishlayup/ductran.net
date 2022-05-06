import { NextApiRequest, NextApiResponse } from "next";
import { getAllPosts } from "../../lib/redis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const posts = await getAllPosts();
  res.status(200).json({ posts });
}
