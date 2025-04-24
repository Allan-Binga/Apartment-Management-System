import SideBar from "../../components/SideBar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

function Contact() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar className="z-10" />

      <div className="flex flex-1 bg-gray-50">
        <SideBar />

        <main className="flex-1 ml-[calc(18rem+2rem)] p-6 bg-gray-50">
          <div className="bg-white p-8 rounded-2xl shadow-sm max-w-6xl mx-auto flex gap-12">
            {/* Left: Contact Form */}
            <div className="w-2/3">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Right: Contact Info */}
            <div className="w-1/3 space-y-6">
              <h2 className="text-2xl font-bold mb-4">Our Office</h2>

              <div className="flex items-start space-x-4">
                <Phone className="text-blue-600 w-5 h-5 mt-1" />
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <a
                    href="tel:+1234567890"
                    className="text-sm text-gray-600 hover:underline"
                  >
                    0702485856
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="text-blue-600 w-5 h-5 mt-1" />
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <a
                    href="mailto:support@buildestate.com"
                    className="text-sm text-gray-600 hover:underline"
                  >
                    murandiapartments@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MapPin className="text-blue-600 w-5 h-5 mt-1" />
                <div>
                  <h4 className="font-semibold">Address</h4>
                  <p className="text-sm text-gray-600">
                    Nairobi, Kenya
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="text-blue-600 w-5 h-5 mt-1" />
                <div>
                  <h4 className="font-semibold">Working Hours</h4>
                  <p className="text-sm text-gray-600">24/7</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;
