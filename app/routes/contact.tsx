import { useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { sendContactFormToWebhook } from "~/utils/webhooks";
import { getCloudinaryUrl } from "~/utils/cloudinary";
import CloudinaryGallery from "~/components/CloudinaryGallery"; 
export const meta: MetaFunction = () => {
  return [
    { title: "Contact Us | Luxury Estates" },
    { name: "description", content: "Get in touch with our team to inquire about our luxury vacation rentals or to book your next stay." },
  ];
};

export default function Contact() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const phangan = getCloudinaryUrl('best-island-in-Thailand_yknta2_c_crop_w_2650_h_1050_uag884');


  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.subject) newErrors.subject = "Please select a subject";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Send the form data to the webhook
      const response = await sendContactFormToWebhook(formData);

      if (response instanceof Error) {
        console.error('Error sending contact form:', response);
        alert('There was an error sending your message. Please try again later.');
        setIsSubmitting(false);
        return;
      }

      console.log('Contact form sent successfully');
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset form after success
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error in contact form submission:', error);
      alert('There was an error sending your message. Please try again later.');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-off-white min-h-screen">
        {/* Hero Section */}
        <div className="relative h-[60vh] sm:h-[80vh] md:h-[100vh] overflow-hidden">
          <div className="absolute inset-0 bg-black/30 z-10 flex items-center justify-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-calluna text-white text-center px-4"
               data-aos="fade-up"
               data-aos-duration="1000"
               data-aos-delay="300">
              ENQUIRE NOW
            </h1>
          </div>
          <img
            src={phangan}
            alt="Luxury Estate Contact"
            className="w-full h-full object-cover"
            data-aos="fade-in"
            data-aos-duration="1500"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 z-10" />
        </div>

        <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
          <div className="max-w-5xl mx-auto relative z-20">

            {/* Success message popup - centered like dropdown menu */}
            {isSuccess && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center transition-all duration-700 ease-in-out"
                style={{
                  opacity: isSuccess ? 1 : 0,
                  visibility: isSuccess ? 'visible' : 'hidden'
                }}
              >
                {/* Semi-transparent backdrop */}
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

                {/* Success message container */}
                <div
                  className="relative w-[90%] sm:w-[400px] md:w-[450px] shadow-xl rounded-md p-6 sm:p-8 md:p-10 border-2 border-transparent bg-deep-green transition-all duration-500 hover:shadow-2xl transform mx-4"
                  style={{
                    opacity: isSuccess ? 1 : 0,
                    transform: isSuccess ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.95)'
                  }}
                >
                  {/* Close button */}
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors duration-300"
                    aria-label="Close message"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {/* Success icon */}
                  <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-white/10 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <p className="font-calluna uppercase text-white text-xl sm:text-2xl text-center mb-3 sm:mb-4">THANK YOU FOR YOUR MESSAGE!</p>
                  <p className="font-calluna uppercase text-white/80 text-center text-sm sm:text-base mb-2">WE'VE RECEIVED YOUR INQUIRY AND WILL GET BACK TO YOU SHORTLY.</p>
                  <p className="font-calluna uppercase text-white/70 text-center text-xs sm:text-sm">YOUR MESSAGE HAS BEEN SENT TO: SHAUN@SIAMOON.COM</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} data-aos="fade-up" data-aos-delay="300" className=" p-4 sm:p-6 md:p-8 shadow-sm rounded-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-4 sm:mb-5 md:mb-6">
                <div>
                  <label htmlFor="name" className="block text-black font-calluna mb-1 text-sm sm:text-base uppercase">YOUR NAME*</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full p-2 sm:p-3 text-sm sm:text-base border ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder=""
                  />
                  {errors.name && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-black font-calluna mb-1 text-sm sm:text-base uppercase">EMAIL ADDRESS*</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-2 sm:p-3 text-sm sm:text-base border ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder=""
                  />
                  {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-black font-calluna mb-1 text-sm sm:text-base uppercase">PHONE NUMBER</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300"
                    placeholder=""
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-black font-calluna mb-1 text-sm sm:text-base uppercase">SUBJECT*</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full p-2 sm:p-3 text-sm sm:text-base border ${errors.subject ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="" className="font-calluna uppercase">SELECT A SUBJECT</option>
                    <option value="booking" className="font-calluna uppercase">PROPERTY BOOKING</option>
                    <option value="inquiry" className="font-calluna uppercase">PROPERTY INQUIRY</option>
                    <option value="support" className="font-calluna uppercase">CUSTOMER SUPPORT</option>
                    <option value="partnership" className="font-calluna uppercase">PARTNERSHIP OPPORTUNITY</option>
                    <option value="other" className="font-calluna uppercase">OTHER</option>
                  </select>
                  {errors.subject && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.subject}</p>}
                </div>
              </div>

              <div className="mb-4 sm:mb-5 md:mb-6">
                <label htmlFor="message" className="block text-black font-calluna mb-1 text-sm sm:text-base uppercase">MESSAGE*</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full p-2 sm:p-3 text-sm sm:text-base border ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder=""
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.message}</p>}
              </div>

              <div className="flex justify-center items-center w-full">
                <button
                  type="submit"
                  className="inline-flex bg-deep-green hover:bg-off-white text-white hover:text-black border-2 border-deep-green font-calluna py-3 sm:py-4 md:py-5 px-6 sm:px-8 md:px-10 rounded-full text-sm sm:text-base transition-colors duration-1000 items-center justify-center w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-3 w-3 sm:h-4 sm:w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      SENDING...
                    </>
                  ) : (
                    'SUBMIT'
                  )}
                </button>
              </div>
            </form>
          </div>
          </div>
        </div>


    </>
  );
}
