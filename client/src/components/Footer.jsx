function Footer({ noSidebar }) {
  return (
    <footer
      className={`bg-gray-200 text-blue-500 mt-10 ${
        noSidebar ? "" : "md:ml-[18rem]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm text-center md:text-left mb-4 md:mb-0">
          © 2025 Murandi. All rights reserved.
        </div>
        {/* <div className="flex space-x-4 text-sm">
          <a href="/about" className="hover:text-blue-600 transition">
            About
          </a>
          <a href="/contact" className="hover:text-blue-600 transition">
            Contact
          </a>
          <a href="/terms" className="hover:text-blue-600 transition">
            Terms
          </a>
        </div> */}
      </div>
    </footer>
  );
}

export default Footer