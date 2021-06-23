import multer from 'multer';

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/dp');
  },

  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    const { fieldname, originalname } = file;

    const on = originalname.split('.')[0];

    const fileName = `user_${fieldname}_${on}_${Math.floor(
      Math.random() * Date.now()
    )}.${ext}`;

    cb(null, fileName);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Not an Image please upload only images'), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

const uploadUserDP = upload.single('dp');

export default uploadUserDP;
