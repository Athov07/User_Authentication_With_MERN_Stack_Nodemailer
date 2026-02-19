const Footer = () => {
  return (
    <footer className="bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.20)] mt-10">
      <div className="max-w-7xl mx-auto px-4 py-4 text-center text-gray-500 text-sm">
        {new Date().getFullYear()} MyApp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
