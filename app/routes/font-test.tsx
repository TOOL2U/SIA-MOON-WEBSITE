import type { MetaFunction } from "@remix-run/node";
import FontTest from "~/components/FontTest";

export const meta: MetaFunction = () => {
  return [
    { title: "Font Test | Luxury Estates" },
    { name: "description", content: "Testing the Berling Nova Sans W04 Regular font." },
  ];
};

export default function FontTestPage() {
  return (
    <div className="bg-off-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-arioso text-deep-green mb-8 text-center">
            Font Test Page
          </h1>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <FontTest />
          </div>
        </div>
      </div>
    </div>
  );
}
