import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  private readonly s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3();
  }

  generateSignedUrl(
    bucketName: string,
    objectKey: string,
    expirationTimeInSeconds: number,
  ): string {
    const params = {
      Bucket: bucketName,
      Key: objectKey,
      Expires: expirationTimeInSeconds,
    };

    return this.s3.getSignedUrl('getObject', params);
  }
}
