import React, { useState } from "react";
import { getCloudinaryUrl } from "~/utils/cloudinary";

const publicIds = [
  "image1_public_id",
  "image2_public_id",
  "image3_public_id",
  // Add as many Cloudinary public IDs as you'd like
];

export default function CloudinaryFullscreenGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div>
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {publicIds.map((id, index) => (
          <img
            key={index}
            src={getCloudinaryUrl(id)}
            alt={`Gallery Image ${index}`}
            className="w-full h-auto object-cover cursor-pointer rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            onClick={() => setSelectedImage(getCloudinaryUrl(id))}
          />
        ))}
      </div>

      {/* Fullscreen Overlay */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center overflow-auto"
          onClick={() => setSelectedImage(null)}
          style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%' }}
        >
          <img
            src={selectedImage}
            alt="Fullscreen"
            className="max-w-full max-h-full object-contain transition-opacity duration-500"
          />
          <button
            className="absolute top-6 right-6 text-white text-3xl bg-black bg-opacity-60 px-4 py-2 rounded-full hover:bg-opacity-80"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}