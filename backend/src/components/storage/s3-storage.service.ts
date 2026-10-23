import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { generateFileName } from '@src/components/storage/file-name';
import { StorageService, StorageUploadResult, UploadedFile } from '@src/components/storage/storage.service';
import { AwsStorageConfig } from '@src/types';

export default class S3StorageService implements StorageService {
  private readonly client: S3Client;

  constructor(private readonly aws: AwsStorageConfig) {
    this.client = new S3Client({
      region: aws.region,
      credentials: { accessKeyId: aws.accessKeyId, secretAccessKey: aws.secretAccessKey },
    });
  }

  public upload = async (file: UploadedFile, directory: string): Promise<StorageUploadResult> => {
    const filename = generateFileName(file.mimetype);
    const key = `${directory}/${filename}`;
    await this.client.send(new PutObjectCommand({
      Bucket: this.aws.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    }));
    return {
      filename,
      path: key,
      url: `https://${this.aws.bucketName}.s3.${this.aws.region}.amazonaws.com/${key}`,
      mimetype: file.mimetype,
      size: file.size,
    };
  };

  public delete = async (path: string): Promise<void> => {
    await this.client.send(new DeleteObjectCommand({ Bucket: this.aws.bucketName, Key: path }));
  };
}
