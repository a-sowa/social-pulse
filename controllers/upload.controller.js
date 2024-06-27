import UserModel from "../models/user.model.js";
import * as fs from 'fs/promises'; // Use fs/promises for async operations
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function uploadProfil(req, res) {
    const fileName = req.body.name + ".jpg";
    const uploadPath = path.join(__dirname, '../client/public/uploads/profil', fileName);

    try {
        await fs.writeFile(uploadPath, req.file.buffer); // Write the file buffer directly
        res.status(200).json({ message: "File uploaded successfully!" });
    } catch (error) {
        console.error("File upload error:", error); // Detailed error logging
        res.status(500).json({ message: "File upload failed!" });
    }

    try {
        const docs = await UserModel.findByIdAndUpdate(
            req.body.userId,
            { $set: { picture: "./uploads/profil/" + fileName } },
            { new: true, upsert: true, setDefaultsOnInsert: true },
        )
        res.send(docs);
    } catch (err) {
        return res.status(500).send({ message: err });
    }
}