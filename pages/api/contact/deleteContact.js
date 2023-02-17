import db from "@/utils/db";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
    const client = await db;
    const database = client.db("contacts");
    const { id } = req.query;

    const contact = await db.collection("contacts").deleteOne({
        _id: ObjectId(id),
    });

    res.json(post);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};