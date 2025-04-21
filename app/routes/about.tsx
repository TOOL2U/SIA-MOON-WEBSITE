import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "About Us | Luxury Estates" },
    { name: "description", content: "Learn about Luxury Estates and our commitment to providing exceptional vacation experiences." },
  ];
};

export default function About() {
  return (
    <div className="bg-off-white py-[100px]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-arioso text-deep-green mb-8 text-center">About Luxury Estates</h1>
          
          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-2xl font-arioso text-deep-green mb-4">Our Story</h2>
            <p className="text-gray-700 mb-6">
              Luxury Estates was founded in 2010 with a simple mission: to provide discerning travelers with access to the world's most extraordinary homes, coupled with personalized service that exceeds expectations.
            </p>
            <p className="text-gray-700 mb-6">
              What began as a small collection of properties in the Hamptons has grown into a curated portfolio spanning the globe's most coveted destinations—from the sun-drenched coasts of California and the Caribbean to the snow-capped peaks of the Alps and the lush landscapes of Hawaii.
            </p>
            <p className="text-gray-700">
              Despite our growth, our commitment to excellence remains unwavering. Each property in our collection is personally vetted by our team to ensure it meets our exacting standards for design, location, amenities, and service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-arioso text-deep-green mb-4">Our Philosophy</h2>
              <p className="text-gray-700 mb-6">
                We believe that a truly luxurious vacation is about more than just beautiful surroundings—it's about creating moments of joy, connection, and discovery that become cherished memories.
              </p>
              <p className="text-gray-700">
                Every aspect of our service is designed with this philosophy in mind, from the thoughtful amenities in our homes to the personalized recommendations from our concierge team.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-arioso text-deep-green mb-4">Our Commitment</h2>
              <p className="text-gray-700 mb-6">
                We are committed to responsible tourism and sustainable practices. We work closely with property owners to implement eco-friendly initiatives and support local communities in the destinations where we operate.
              </p>
              <p className="text-gray-700">
                We also believe in giving back, which is why a portion of every booking goes to our Luxury Estates Foundation, supporting environmental conservation and education in our destinations.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-2xl font-arioso text-deep-green mb-4">Meet Our Team</h2>
            <p className="text-gray-700 mb-6">
              Behind Luxury Estates is a team of passionate travel enthusiasts, hospitality experts, and local specialists who share a common goal: to create exceptional experiences for our guests.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 bg-gray-200">
                  <img src="https://i.pravatar.cc/300?img=1" alt="Team Member" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-medium text-deep-green">Alexandra Chen</h3>
                <p className="text-gray-600 text-sm">Founder & CEO</p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 bg-gray-200">
                  <img src="https://i.pravatar.cc/300?img=11" alt="Team Member" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-medium text-deep-green">Marcus Johnson</h3>
                <p className="text-gray-600 text-sm">Head of Property Curation</p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 bg-gray-200">
                  <img src="https://i.pravatar.cc/300?img=9" alt="Team Member" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-medium text-deep-green">Sophia Rodriguez</h3>
                <p className="text-gray-600 text-sm">Guest Experience Director</p>
              </div>
            </div>
          </div>
          
          <div className="bg-terracotta rounded-xl p-8 text-white text-center">
            <h2 className="text-3xl font-arioso mb-4">Join Our Journey</h2>
            <p className="max-w-2xl mx-auto mb-6">
              Experience the Luxury Estates difference for yourself. Browse our collection of extraordinary homes and start planning your next unforgettable vacation.
            </p>
            <a 
              href="/properties"
              className="inline-block bg-white text-deep-green hover:bg-deep-green hover:text-white font-medium px-6 py-3 rounded-md transition-colors duration-300"
            >
              Explore Our Properties
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
