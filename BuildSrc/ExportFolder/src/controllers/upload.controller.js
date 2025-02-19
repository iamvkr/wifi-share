export const UploadController = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    // console.log("saved file:", req.savedFileName);
    res.json({ message: "File uploaded successfully", filename: req.file.filename });
}

 