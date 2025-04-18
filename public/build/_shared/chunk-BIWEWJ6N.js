// app/models/property.ts
var properties = [
  {
    id: "villa-paradiso",
    name: "Villa Paradiso",
    location: "Malibu, California",
    price: 1200,
    description: "Perched on the cliffs of Malibu with breathtaking ocean views, Villa Paradiso is the epitome of coastal luxury. This stunning 5-bedroom villa features floor-to-ceiling windows that frame the Pacific Ocean, creating a seamless indoor-outdoor living experience. The infinity pool appears to merge with the horizon, while the spacious terrace provides the perfect setting for al fresco dining under the stars. Inside, the open-concept living space is adorned with designer furnishings and curated artwork. The gourmet kitchen boasts top-of-the-line appliances and a marble island, ideal for preparing meals or having a private chef create culinary masterpieces. Each bedroom offers a private sanctuary with plush bedding and ocean views. The primary suite includes a spa-like bathroom with a soaking tub positioned to take in the coastal panorama. Additional amenities include a home theater, wine cellar, and direct beach access via a private path.",
    shortDescription: "Perched on the cliffs of Malibu with breathtaking ocean views, this stunning 5-bedroom villa features an infinity pool, spacious terrace, and direct beach access.",
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
      "WiFi"
    ],
    images: [
      "https://i.imgur.com/ODJBFsx.jpeg",
      "https://i.imgur.com/754i92z.jpeg",
      "https://i.imgur.com/sC7evpD.jpeg",
      "https://i.imgur.com/SMClibD.jpeg",
      "https://i.imgur.com/0BkhibD.jpeg",
      "https://i.imgur.com/5ibXcVz.png",
      "https://i.imgur.com/DoiLlLO.jpeg",
      "https://i.imgur.com/2cfc5MI.jpeg",
      "https://i.imgur.com/DZsL3mm.jpeg"
    ],
    maxGuests: 10,
    bedrooms: 5,
    bathrooms: 5.5,
    squareFeet: 6500
  },
  {
    id: "alpine-retreat",
    name: "Alpine Retreat",
    location: "Aspen, Colorado",
    price: 1800,
    description: "Nestled among the majestic peaks of Aspen, Alpine Retreat offers a luxurious mountain escape in every season. This timber and stone lodge combines rustic charm with modern luxury across its 6,000 square feet of living space. In winter, enjoy ski-in/ski-out access to world-class slopes, then return to warm up by the massive stone fireplace or in the outdoor heated pool and hot tub with mountain views. Summer brings opportunities for hiking, mountain biking, and fly fishing right from your doorstep. The great room features soaring ceilings with exposed beams and panoramic windows showcasing the alpine scenery. The gourmet kitchen is equipped for entertaining with professional-grade appliances and a large dining area that seats 12. Six beautifully appointed bedrooms, including a luxurious primary suite with a fireplace and private balcony, provide comfortable accommodations for up to 12 guests. Additional amenities include a game room with billiards and poker table, a media room, a fitness center, and a wine cellar.",
    shortDescription: "Nestled among the majestic peaks of Aspen, this timber and stone lodge offers ski-in/ski-out access, an outdoor heated pool, and panoramic mountain views.",
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
      "WiFi"
    ],
    images: [
      "https://i.imgur.com/cZMdrKF.jpeg",
      "https://i.imgur.com/1GdDbqi.jpeg",
      "https://i.imgur.com/uC87ART.jpeg",
      "https://i.imgur.com/vtFQnQj.jpeg",
      "https://i.imgur.com/4v3rmg0.jpeg",
      "https://i.imgur.com/X8GeIsx.png",
      "https://i.imgur.com/7C41uy2.jpeg"
    ],
    maxGuests: 12,
    bedrooms: 6,
    bathrooms: 7,
    squareFeet: 6e3
  },
  {
    id: "tropical-haven",
    name: "Tropical Haven",
    location: "Kauai, Hawaii",
    price: 1500,
    description: "Experience the magic of Hawaii at Tropical Haven, a luxurious beachfront estate on Kauai's pristine North Shore. This Balinese-inspired property spans over an acre of lush tropical gardens leading directly to a secluded white sand beach. The main house and guest pavilions offer 4 bedrooms with en-suite bathrooms, accommodating up to 8 guests in complete privacy and comfort. Indoor and outdoor living spaces flow seamlessly through pocket doors that open to covered lanais and the spectacular infinity pool overlooking the Pacific Ocean. The professional kitchen features top-of-the-line appliances and an outdoor BBQ area perfect for entertaining. Wake up to breathtaking ocean views, spend your days swimming, snorkeling, and paddleboarding in the crystal-clear waters, then unwind with a massage in the dedicated spa pavilion. Additional amenities include an outdoor shower garden, meditation pavilion, and organic fruit orchard where guests can pick their own tropical fruits.",
    shortDescription: "A luxurious beachfront estate on Kauai's pristine North Shore with Balinese-inspired architecture, an infinity pool, and direct access to a secluded white sand beach.",
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
      "WiFi"
    ],
    images: [
      "https://i.imgur.com/cZMdrKF.jpeg",
      "https://i.imgur.com/1GdDbqi.jpeg",
      "https://i.imgur.com/uC87ART.jpeg",
      "https://i.imgur.com/vtFQnQj.jpeg",
      "https://i.imgur.com/4v3rmg0.jpeg"
    ],
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 4.5,
    squareFeet: 4200
  }
];
function getProperties() {
  return properties;
}

export {
  getProperties
};
//# sourceMappingURL=/build/_shared/chunk-BIWEWJ6N.js.map
