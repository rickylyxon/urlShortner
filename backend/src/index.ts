import express from "express";
import ShortUniqueId from "short-unique-id";
import bodyParser from "body-parser";
import { urlValidate } from "./middleware/validate";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
const app = express();
const uid = new ShortUniqueId({ length: 5 });
const prisma = new PrismaClient();

app.use(bodyParser.json());
app.use(cors());

app.post("/shorten", urlValidate, async (req, res) => {
  try {
    const url = req.url;
    const shortUrl = uid.rnd();
    const createdUrl = await prisma.url.create({
      data: {
        url,
        shortUrl,
      },
      select: {
        shortUrl: true,
      },
    });
    const shortenURL = createdUrl.shortUrl;
    res.status(200).json({ shortUrl: shortenURL, status: 200 });
  } catch (error) {
    console.error("Error creating shortened URL:", error);
    res.status(500).json({ error: "Failed to create shortened URL" });
  }
});

app.get("/:url", async (req, res) => {
  try {
    const url = req.params.url;
    const findUrl = await prisma.url.findUnique({
      where: {
        shortUrl: url,
      },
      select: {
        url: true,
      },
    });
    if (findUrl) {
      res.status(200).json({ url: findUrl.url });
    } else {
      res.status(404).redirect("/");
    }
  } catch (error) {
    console.error("Error creating shortened URL:", error);
    res.status(500).json({ error: "Something is wrong with our server" });
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
