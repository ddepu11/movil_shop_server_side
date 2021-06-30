import multer from 'multer';
import fs from 'fs';
import mkdirp from 'mkdirp';

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { _id } = req.userInfo;

    const fileSrc = `public/sellers/${_id}`;

    fs.access(fileSrc, (err) => {
      if (err) {
        mkdirp(fileSrc).then(() => cb(null, fileSrc));
      } else {
        cb(null, fileSrc);
      }
    });
  },

  filename: (req, file, cb) => {
    const { originalname, mimetype } = file;

    const fName = originalname.split('.')[0];
    const ext = mimetype.split('/')[1];

    cb(null, `${fName}_${Math.floor(Math.random() * Date.now())}.${ext}`);
  },
});

const upload = multer({ storage: multerStorage });

const uploadMobilePics = upload.array('mobilePics', 6);

export default uploadMobilePics;
