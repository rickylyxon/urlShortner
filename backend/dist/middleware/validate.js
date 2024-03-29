"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlValidate = void 0;
const zod_1 = require("zod");
const URL = zod_1.z.string().url();
function urlValidate(req, res, next) {
    try {
        console.log("before");
        let param = req.body.url;
        console.log(param);
        if (param.startsWith("www.")) {
            param = "https://" + param;
        }
        console.log(param);
        const check = URL.safeParse(param);
        if (!check.success) {
            res.status(404).json({ msg: "URL is Invalid", status: 404 });
        }
        else {
            req.url = param;
            next();
        }
    }
    catch (error) {
        console.error("Error validating URL:", error);
        res.status(500).json({ error: "Failed to validate" });
    }
}
exports.urlValidate = urlValidate;
