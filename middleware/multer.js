
import multer from 'multer';

const storage = multer.diskStorage({});

const upload = multer({ storage });

export default upload;



// import multer from 'multer';

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Files will be stored in the "uploads" folder
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname); // Keep the original file name
//   },
// });

// const upload = multer({ storage });

// export default upload;
