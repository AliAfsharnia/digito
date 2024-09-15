import { S3Client } from '@aws-sdk/client-s3';
import { config } from 'dotenv';

config();

export const s3 = new S3Client({
  region: "default",
  endpoint: process.env.LIARA_ENDPOINT,
  credentials: {
    accessKeyId: process.env.LIARA_ACCESS_KEY,
    secretAccessKey: process.env.LIARA_SECRET_KEY
  },
});
