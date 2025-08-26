const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const uploadDir = path.join(__dirname, '../../uploads/images');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('Created upload directory:', uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = uuidv4();
        const originalName = file.originalname;
        const ext = path.extname(originalName);
        const nameWithoutExt = path.basename(originalName, ext);
        cb(null, `${uniqueSuffix}_${nameWithoutExt}${ext}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname){
        return cb(null, true);
    }
    else {
        cb(new Error("Only image files are allowed!"));
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 25 * 1024 * 1024,
        files: 5
    },
    fileFilter: fileFilter
});

module.exports = upload;