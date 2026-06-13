import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { filename, contentType } = body;

    if (!filename || !contentType) {
      return NextResponse.json({ error: 'Missing filename or contentType' }, { status: 400 });
    }

    const S3 = new S3Client({
      region: 'auto',
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
      },
    });

    // Make filename unique
    const uniqueFilename = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: uniqueFilename,
      ContentType: contentType,
    });

    const presignedUrl = await getSignedUrl(S3, command, { expiresIn: 3600 });
    
    // Construct the public URL
    // Remove trailing slash if present
    const publicUrlBase = process.env.NEXT_PUBLIC_R2_PUBLIC_URL?.replace(/\/$/, '');
    const publicUrl = `${publicUrlBase}/${uniqueFilename}`;

    return NextResponse.json({ presignedUrl, publicUrl });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    return NextResponse.json({ error: 'Error generating presigned URL' }, { status: 500 });
  }
}
