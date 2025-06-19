import type { MetaFunction } from "@remix-run/node";
import { getCloudinaryUrl } from "~/utils/cloudinary";
import CloudinaryGallery from "~/components/CloudinaryGallery";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "~/utils/icons";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "About Us | Sia Moon Sanctuary" },
    { name: "description", content: "Learn about Sia Moon Sanctuary and our commitment to providing exceptional vacation experiences." },
  ];
};

export default function About() {
  const about = getCloudinaryUrl('IMG_2039_-_Edited_kcklsd');
  const mum = getCloudinaryUrl('PHOTO-2024-09-07-20-50-18_baystd');
  const dad = getCloudinaryUrl('IMG_2297_mm1evg');
  const fam = getCloudinaryUrl('fc19657d-11a7-414b-b045-0e21a47f02c7_amm4ig');

  return (
    <div className="bg-off-white">

        {/* Hero Section */}
        <div className="relative h-[100vh] object-contain overflow-hidden bg-deep-green">
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h1 className="text-8xl font-calluna text-off-white/80 z-50 text-center pb-16"
               data-aos="fade-up"
               data-aos-duration="1000"
               data-aos-delay="300">
              ABOUT US
            </h1>
          </div>
          <img
            src={fam}
            alt="Luxury Estate Contact"
            className="w-full h-full object-contain bg-contain mt-2"
            data-aos="fade-in"
            data-aos-duration="1500"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 z-10" />
        </div>

      <div className="container mx-auto p-16">
        <div className="max-w-5xl mx-auto p-10">
          <h1 className="text-5xl font-calluna text-deep-green mb-8 text-center"
             data-aos="fade-up"
             data-aos-duration="800">
            About Sia Moon Sanctuary
          </h1>

          <div className="p-8 mb-12" data-aos="fade-up" data-aos-delay="200">
            <h2 className="text-4xl font-calluna text-deep-green mb-4">Our Story</h2>
            <p className="text-deep-green mb-6 text-xl">
              Sia Moon Sanctuary was founded in 2010 with a simple mission: to provide discerning travelers with access to the world's most extraordinary homes, coupled with personalized service that exceeds expectations.
            </p>
            <p className="text-deep-green mb-6 text-xl">
              What began as a small collection of properties in the Hamptons has grown into a curated portfolio spanning the globe's most coveted destinations—from the sun-drenched coasts of California and the Caribbean to the snow-capped peaks of the Alps and the lush landscapes of Hawaii.
            </p>
            <p className="text-deep-green text-xl">
              Despite our growth, our commitment to excellence remains unwavering. Each property in our collection is personally vetted by our team to ensure it meets our exacting standards for design, location, amenities, and service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="p-8" data-aos="fade-right" data-aos-delay="300">
              <h2 className="text-4xl font-calluna text-deep-green mb-4">Our Philosophy</h2>
              <p className="text-deep-green mb-6 text-xl">
                We believe that a truly luxurious vacation is about more than just beautiful surroundings—it's about creating moments of joy, connection, and discovery that become cherished memories.
              </p>
              <p className="text-deep-green text-xl">
                Every aspect of our service is designed with this philosophy in mind, from the thoughtful amenities in our homes to the personalized recommendations from our concierge team.
              </p>
            </div>

            <div className="p-8" data-aos="fade-left" data-aos-delay="400">
              <h2 className="text-4xl font-calluna text-deep-green mb-4">Our Commitment</h2>
              <p className="text-deep-green mb-6 text-xl">
                We are committed to responsible tourism and sustainable practices. We work closely with property owners to implement eco-friendly initiatives and support local communities in the destinations where we operate.
              </p>
              <p className="text-deep-green text-xl">
                We also believe in giving back, which is why a portion of every booking goes to our Sia Moon Sanctuary Foundation, supporting environmental conservation and education in our destinations.
              </p>
            </div>
          </div>

          <div className="p-8 mb-12" data-aos="fade-up" data-aos-delay="200">
            <h2 className="text-4xl font-calluna text-deep-green mb-4">Meet Our Team</h2>
            <p className="text-deep-green mb-6 text-xl">
              Behind Sia Moon Sanctuary is a team of passionate travel enthusiasts, hospitality experts, and local specialists who share a common goal: to create exceptional experiences for our guests.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
              <div className="text-center" data-aos="fade-up" data-aos-delay="300">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 bg-gray-200">
                  <img src={dad} alt="Team Member" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-medium text-deep-green">Shaun Ducker</h3>
                <p className="text-gray-600 text-sm">Founder & CEO</p>
              </div>

              <div className="text-center" data-aos="fade-up" data-aos-delay="400">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 bg-gray-200">
                  <img src={mum} alt="Team Member" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-medium text-deep-green">Maria Ren</h3>
                <p className="text-gray-600 text-sm">Co-Founder & Chief Designer</p>
              </div>

            </div>
          </div>
          <div data-aos="zoom-in" data-aos-delay="500">
            <Link
              to="/properties"
              className=" bg-off-white hover:text-black font-calluna transition-colors duration-300 border-2 border-black hover:bg-terracotta/40 hover:text-black text-black text-center rounded-full w-[180px] h-[180px] flex flex-col items-center justify-center mx-auto">
              Explore Our Properties
            </Link>
          </div>
      </div>
    </div>
    </div>
  );
}
