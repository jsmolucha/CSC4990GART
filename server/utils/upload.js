import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  accessSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
  // signatureVersion: "v4",
  region: "us-east-2",
});
const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
  }
};

export const upload = multer({
  fileFilter,
  storage: multerS3({
    acl: "public-read",
    s3,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    bucket: "gartimagebucket2021",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: "TESTING_METADATA" });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});