const multer = require('multer');
const moment = require('moment');

function fileFilter (req, file, cb) {

    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/gif' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, moment().format('DDMMYYYY_HHmmss_SSS') + '-' +  file.originalname);
    }
});

const limits = {
    fileSize: 1024 * 1024 * 10
};

module.exports = multer({
    fileFilter,
    limits,
    storage
});
