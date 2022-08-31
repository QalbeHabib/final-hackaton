const multer = require('multer')

// create middleware for multer single file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    }
    
    , filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
}
)
const upload = multer({ storage: storage })

module.exports = upload;