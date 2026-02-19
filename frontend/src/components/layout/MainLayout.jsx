import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-10">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
