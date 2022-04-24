import { NextApiRequest, NextApiResponse } from "next";
import { searchPosts } from "../../lib/redis";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const q = req.query.q;
    if (typeof(q) === "string") {
        const posts = await searchPosts(q);
        res.status(200).json({ posts })
    }
}
