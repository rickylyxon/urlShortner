"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const short_unique_id_1 = __importDefault(require("short-unique-id"));
const body_parser_1 = __importDefault(require("body-parser"));
const validate_1 = require("./middleware/validate");
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const uid = new short_unique_id_1.default({ length: 5 });
const prisma = new client_1.PrismaClient();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.post("/shorten", validate_1.urlValidate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = req.url;
        const shortUrl = uid.rnd();
        console.log("before");
        const createdUrl = yield prisma.url.create({
            data: {
                url,
                shortUrl,
            },
            select: {
                shortUrl: true,
            },
        });
        const shortenURL = createdUrl.shortUrl;
        console.log("after");
        res.status(200).json({ shortUrl: shortenURL, status: 200 });
    }
    catch (error) {
        console.error("Error creating shortened URL:", error);
        res.status(500).json({ error: "Failed to create shortened URL" });
    }
}));
app.get("/:url", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = req.params.url;
        const findUrl = yield prisma.url.findUnique({
            where: {
                shortUrl: url,
            },
            select: {
                url: true,
            },
        });
        if (findUrl) {
            res.status(200).json({ url: findUrl.url });
        }
        else {
            res.status(404).redirect("/");
        }
    }
    catch (error) {
        console.error("Error creating shortened URL:", error);
        res.status(500).json({ error: "Something is wrong with our server" });
    }
}));
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
