const Footer = () => {
  return (
    <footer className="bg-white shadow-inner mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
        {new Date().getFullYear()} MyApp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
