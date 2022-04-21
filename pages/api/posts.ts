import { createPost } from "../../lib/redis";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    const id = await createPost(req.body);
    res.status(200).json({ id })
}