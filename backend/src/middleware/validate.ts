import { z } from "zod";
import { Request, Response, NextFunction } from "express";

const URL = z.string().url();

function urlValidate(req: Request, res: Response, next: NextFunction) {
  try {
    let param = req.body.url;
    if (param.startsWith("www.")) {
      param = "https://" + param;
    }
    const check = URL.safeParse(param);
    if (!check.success) {
      res.status(404).json({ msg: "URL is Invalid", status: 404 });
    } else {
      req.url = param;
      next();
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to validate" });
  }
}
export { urlValidate };
