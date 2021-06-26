import multer from 'multer';
import fs from 'fs';

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.access(`public/sellers/${req.userEmail}`, (err) => {
      if (err) {
        fs.mkdir(`public/sellers/${req.userEmail}`, () => {
          cb(null, `public/sellers/${req.userEmail}`);
        });
      } else {
        cb(null, `public/sellers/${req.userEmail}`);
      }
    });
  },

  filename: (req, file, cb) => {
    const { fieldname, originalname, mimetype } = file;

    const fName = originalname.split('.')[0];
    const ext = mimetype.split('/')[1];

    cb(
      null,
      `${fName}_${fieldname}_${Math.floor(Math.random() * Date.now())}.${ext}`
    );
  },
});

const upload = multer({ storage: multerStorage });

const uploadMobilePics = upload.array('mobilePics', 6);

export default uploadMobilePics;
