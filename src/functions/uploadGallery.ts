import { Handler, Context, Callback } from "aws-lambda";
import AWS from "aws-sdk";
import config from "src/config";
import { v4 as uuid } from "uuid";

const s3 = new AWS.S3();
const bucketName = config.aws.bucket;

interface Event {
  order: number;
  image: string;
}

export const handler: Handler<Event> = (
  event: Event,
  context: Context,
  callback: Callback
) => {
  const order = event.order;
  const image = event.image;

  const base64Image = image.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Image, "base64");
  const key = `${order}/${uuid()}.png`;

  const params = {
    Bucket: bucketName,
    Key: key,
    Body: buffer,
    ContentType: "image/png",
    ACL: "public-read",
  };

  s3.upload(
    params,
    (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
      if (err) {
        console.error(err);
        callback(err);
      } else {
        console.log(`Image uploaded to ${data.Location}`);
        callback(null, { location: data.Location });
      }
    }
  );
};
