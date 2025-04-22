import { getCloudinaryUrl } from "~/utils/cloudinary";
import CloudinaryGallery from "~/components/CloudinaryGallery";

//Index Images
const con1 = getCloudinaryUrl("9b5fe0cc-ae65-4225-b90b-a7d563e925db_2_ts54t8");
const hero = getCloudinaryUrl("8453f772-29b5-45bd-9292-f8e20501f735_ewzhvd");
const con2 = getCloudinaryUrl("2f31ecd7-f736-4473-9b74-0293ed14faa6_lxs0gm");
const box1 = getCloudinaryUrl("68adbec2-1e8f-41e6-b888-e0520a80bf64_2_ycca8m");
const box2 = getCloudinaryUrl("7fa422a4-a5a2-49b5-9cde-6b1fe91c7d2e_2_ysfvar");
const box3 = getCloudinaryUrl("e1261b8a-4301-40b2-85ca-36ab3b670059_1_zbxee1");
const box4 = getCloudinaryUrl("174f6ab9-d902-462a-b7c1-b2513a3e3781_1_b4otgj");

export interface Property {
  id: string;
  name: string;
  location: string;
  price: number;
  description: string;
  shortDescription: string;
  amenities: string[];
  images: string[];
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
}

export const properties: Property[] = [
  {
    id: "alesia-house",
    name: "Alesia House",
    location: "Koh Phangan, Thailand",
    price: 1200,
    description:
      "Perched on the cliffs of Malibu with breathtaking ocean views, Alesia House is the epitome of coastal luxury. This stunning 5-bedroom villa features floor-to-ceiling windows that frame the Pacific Ocean, creating a seamless indoor-outdoor living experience. The infinity pool appears to merge with the horizon, while the spacious terrace provides the perfect setting for al fresco dining under the stars. Inside, the open-concept living space is adorned with designer furnishings and curated artwork. The gourmet kitchen boasts top-of-the-line appliances and a marble island, ideal for preparing meals or having a private chef create culinary masterpieces. Each bedroom offers a private sanctuary with plush bedding and ocean views. The primary suite includes a spa-like bathroom with a soaking tub positioned to take in the coastal panorama. Additional amenities include a home theater, wine cellar, and direct beach access via a private path.",
    shortDescription:
      "Perched on the cliffs of Malibu with breathtaking ocean views, this stunning 5-bedroom villa features an infinity pool, spacious terrace, and direct beach access.",
    amenities: [
      "Infinity Pool",
      "Ocean Views",
      "Private Beach Access",
      "Home Theater",
      "Wine Cellar",
      "Gourmet Kitchen",
      "Outdoor Dining Area",
      "Fireplace",
      "Air Conditioning",
      "WiFi",
    ],
    images: [
      box2,
      hero,
      box1,
      box4,
      con1,
      con2,
    ],
    maxGuests: 10,
    bedrooms: 5,
    bathrooms: 5.5,
    squareFeet: 6500,
  },
  {
    id: "alpine-retreat",
    name: "Alpine Retreat",
    location: "Aspen, Colorado",
    price: 1800,
    description:
      "Nestled among the majestic peaks of Aspen, Alpine Retreat offers a luxurious mountain escape in every season. This timber and stone lodge combines rustic charm with modern luxury across its 6,000 square feet of living space. In winter, enjoy ski-in/ski-out access to world-class slopes, then return to warm up by the massive stone fireplace or in the outdoor heated pool and hot tub with mountain views. Summer brings opportunities for hiking, mountain biking, and fly fishing right from your doorstep. The great room features soaring ceilings with exposed beams and panoramic windows showcasing the alpine scenery. The gourmet kitchen is equipped for entertaining with professional-grade appliances and a large dining area that seats 12. Six beautifully appointed bedrooms, including a luxurious primary suite with a fireplace and private balcony, provide comfortable accommodations for up to 12 guests. Additional amenities include a game room with billiards and poker table, a media room, a fitness center, and a wine cellar.",
    shortDescription:
      "Nestled among the majestic peaks of Aspen, this timber and stone lodge offers ski-in/ski-out access, an outdoor heated pool, and panoramic mountain views.",
    amenities: [
      "Ski-in/Ski-out Access",
      "Heated Outdoor Pool",
      "Hot Tub",
      "Mountain Views",
      "Game Room",
      "Media Room",
      "Fitness Center",
      "Wine Cellar",
      "Fireplace",
      "WiFi",
    ],
    images: [
      "https://i.imgur.com/cZMdrKF.jpeg",
      "https://i.imgur.com/1GdDbqi.jpeg",
      "https://i.imgur.com/uC87ART.jpeg",
      "https://i.imgur.com/vtFQnQj.jpeg",
      "https://i.imgur.com/4v3rmg0.jpeg",
      "https://i.imgur.com/X8GeIsx.png",
      "https://i.imgur.com/7C41uy2.jpeg",
    ],
    maxGuests: 12,
    bedrooms: 6,
    bathrooms: 7,
    squareFeet: 6000,
  },
  {
    id: "tropical-haven",
    name: "Tropical Haven",
    location: "Kauai, Hawaii",
    price: 1500,
    description:
      "Experience the magic of Hawaii at Tropical Haven, a luxurious beachfront estate on Kauai's pristine North Shore. This Balinese-inspired property spans over an acre of lush tropical gardens leading directly to a secluded white sand beach. The main house and guest pavilions offer 4 bedrooms with en-suite bathrooms, accommodating up to 8 guests in complete privacy and comfort. Indoor and outdoor living spaces flow seamlessly through pocket doors that open to covered lanais and the spectacular infinity pool overlooking the Pacific Ocean. The professional kitchen features top-of-the-line appliances and an outdoor BBQ area perfect for entertaining. Wake up to breathtaking ocean views, spend your days swimming, snorkeling, and paddleboarding in the crystal-clear waters, then unwind with a massage in the dedicated spa pavilion. Additional amenities include an outdoor shower garden, meditation pavilion, and organic fruit orchard where guests can pick their own tropical fruits.",
    shortDescription:
      "A luxurious beachfront estate on Kauai's pristine North Shore with Balinese-inspired architecture, an infinity pool, and direct access to a secluded white sand beach.",
    amenities: [
      "Beachfront",
      "Infinity Pool",
      "Tropical Gardens",
      "Spa Pavilion",
      "Outdoor Shower",
      "Meditation Space",
      "Fruit Orchard",
      "Paddleboards & Snorkel Gear",
      "Air Conditioning",
      "WiFi",
    ],
    images: [
      "https://i.imgur.com/cZMdrKF.jpeg",
      "https://i.imgur.com/1GdDbqi.jpeg",
      "https://i.imgur.com/uC87ART.jpeg",
      "https://i.imgur.com/vtFQnQj.jpeg",
      "https://i.imgur.com/4v3rmg0.jpeg",
    ],
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 4.5,
    squareFeet: 4200,
  },
];

export function getProperties(): Property[] {
  return properties;
}

export function getProperty(id: string): Property | undefined {
  return properties.find((property) => property.id === id);
}