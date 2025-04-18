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
}

export const properties: Property[] = [
  {
    id: "villa-serenity",
    name: "Villa Serenity",
    location: "Malibu, California",
    price: 1200,
    shortDescription: "A stunning beachfront villa with panoramic ocean views",
    description: "Villa Serenity is a luxurious beachfront property offering unparalleled views of the Pacific Ocean. This modern architectural masterpiece features floor-to-ceiling windows, a private infinity pool, and direct beach access. The spacious interior is elegantly furnished with high-end amenities and designer pieces, creating a perfect blend of comfort and sophistication. Ideal for those seeking a peaceful retreat with the sound of waves as your constant companion.",
    amenities: [
      "Private infinity pool",
      "Direct beach access",
      "Fully equipped gourmet kitchen",
      "Home theater",
      "Outdoor dining area",
      "Fire pit",
      "Smart home technology",
      "Private parking"
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
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 4.5
  },
  {
    id: "mountain-retreat",
    name: "Mountain Retreat",
    location: "Aspen, Colorado",
    price: 950,
    shortDescription: "A luxurious mountain lodge surrounded by natural beauty",
    description: "Nestled in the heart of the Rocky Mountains, this exquisite mountain retreat offers a perfect blend of rustic charm and modern luxury. The property features expansive windows that frame breathtaking mountain views, a stone fireplace that serves as the centerpiece of the living area, and a private hot tub on the deck. The interior combines warm wood elements with contemporary design, creating a cozy yet sophisticated atmosphere. Located just minutes from world-class skiing and hiking trails, this retreat is perfect for outdoor enthusiasts seeking luxury in nature.",
    amenities: [
      "Private hot tub",
      "Stone fireplace",
      "Gourmet kitchen",
      "Heated floors",
      "Game room",
      "Ski storage",
      "Panoramic mountain views",
      "Outdoor BBQ area"
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
    maxGuests: 10,
    bedrooms: 5,
    bathrooms: 4
  },
  {
    id: "urban-penthouse",
    name: "Urban Penthouse",
    location: "New York City, New York",
    price: 1500,
    shortDescription: "A sophisticated penthouse with stunning city skyline views",
    description: "Experience the height of urban luxury in this spectacular penthouse located in the heart of Manhattan. Floor-to-ceiling windows offer breathtaking panoramic views of the iconic New York City skyline. The interior features sleek, contemporary design with high-end finishes, custom furniture, and curated artwork. The gourmet kitchen is equipped with top-of-the-line appliances, perfect for entertaining. A private rooftop terrace provides an exclusive outdoor space for relaxation or hosting gatherings against the backdrop of the city lights. This penthouse embodies sophisticated city living at its finest.",
    amenities: [
      "Private rooftop terrace",
      "Floor-to-ceiling windows",
      "Gourmet kitchen",
      "Home automation system",
      "Wine cellar",
      "Fitness room",
      "24-hour concierge",
      "Private elevator access"
    ],
    images: [

    ],
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 3.5
  }
];

export function getProperty(id: string): Property | undefined {
  return properties.find(property => property.id === id);
}
