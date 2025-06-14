import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "next-sanity";
import slugify from "slugify";

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN, // WRITE access
  apiVersion: "2023-06-01",
  useCdn: false,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST method allowed" });
  }

  const { title, author, content } = req.body;

  if (!title || !author || !content) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const slug = slugify(title, { lower: true, strict: true });

  try {
    const result = await client.create({
      _type: "post",
      title,
      author,
      isAakash: false, // community post
      slug: { current: slug },
      body: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: content,
            },
          ],
        },
      ],
      publishedAt: new Date().toISOString(),
    });

    return res.status(200).json({ success: true, id: result._id });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
