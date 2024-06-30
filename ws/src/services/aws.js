const {
  S3Client,
  CreateBucketCommand,
  DeleteObjectCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");

// AWS S3 Client initialization
const s3Client = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: "AKIA6ODU7GZMOOUGWWUU",
    secretAccessKey: "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",
  },
});

module.exports = {
  AWS_REGION: "us-east-2",
  BUCKET_NAME: "hair-on-hands-bucket",
  IAM_USER_KEY: "AKIA6ODU7GZMOOUGWWUU",
  IAM_USER_SECRET: "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",
  async uploadToS3(file, filename, acl = "public-read") {
    try {
      const uploadParams = {
        Bucket: this.BUCKET_NAME,
        Key: filename,
        Body: file.data,
        ACL: acl,
      };

      const data = await s3Client.send(new PutObjectCommand(uploadParams));
      console.log("Upload successful:", data);
      return { error: false, message: data };
    } catch (err) {
      console.error("Upload error:", err);
      return { error: true, message: err };
    }
  },
  async deleteFileS3(key) {
    try {
      const deleteParams = {
        Bucket: this.BUCKET_NAME,
        Key: key,
      };

      const data = await s3Client.send(new DeleteObjectCommand(deleteParams));
      console.log("Delete successful:", data);
      return { error: false, message: data };
    } catch (err) {
      console.error("Delete error:", err);
      return { error: true, message: err };
    }
  },
};

// accessKeyId: "AKIA6ODU7GZMOOUGWWUU",
//   secretAccessKey: "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",
