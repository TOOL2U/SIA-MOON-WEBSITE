// utils/cloudinary.ts
import { Cloudinary } from '@cloudinary/url-gen';
import { quality } from '@cloudinary/url-gen/actions/delivery';
import { format } from '@cloudinary/url-gen/actions/delivery';

const cld = new Cloudinary({
  cloud: {
    cloudName: 'doez7m1hy', // Replace with your cloud name
  },
});

export function getCloudinaryUrl(publicId: string) {
  const image = cld.image(publicId);

  image
    .delivery(quality('auto')) // Auto quality
    .delivery(format('auto')); // Auto format (WebP)

  return image.toURL(); // Returns fully optimized URL without resizing
}