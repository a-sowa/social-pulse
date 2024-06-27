export function fileValidationMiddleware(req, res, next) {
    if (!req.file) {
        return res.status(400).json({ message: "No file provided" });
    }

    const allowedMimeTypes = ["image/jpg", "image/png", "image/jpeg"];
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
        return res.status(400).json({ message: "Invalid file type" });
    }

    const maxSize = 500000; // 500 KB
    if (req.file.size > maxSize) {
        return res.status(400).json({ message: "File size exceeds the limit of 500KB" });
    }

    next();
}