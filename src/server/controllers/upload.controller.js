export const UploadController = async (req, res) => {
    if (!req.files) {
        return res.status(400).json({ message: "Something Went Wrong" });
    }
    const files = req.files.map((f, i) => ({
        index:i,
        fileName: f.originalname,
        size: f.size,
        srcName: f.filename,
        fileMimeType: f.mimetype
    }))
    res.json({ message: "File uploaded successfully", files });
}

