import { useCallback, useMemo, useState } from "react";
import About from "./components/About";
import Background from "./components/Background";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import OrderModal from "./components/OrderModal";
import Packages from "./components/Packages";
import Process from "./components/Process";
import Projects from "./components/Projects";
import Services from "./components/Services";
import TechMarquee from "./components/TechMarquee";
import { OrderContext } from "./context/order";

function OrderProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const openOrder = useCallback((pkgId = null) => {
    setSelectedPackage(pkgId);
    setIsOpen(true);
  }, []);

  const closeOrder = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, selectedPackage, openOrder, closeOrder }),
    [isOpen, selectedPackage, openOrder, closeOrder]
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export default function App() {
  return (
    <OrderProvider>
      <div className="grain relative min-h-screen overflow-hidden bg-ink text-white">
        <Background />
        <Header />
        <main className="relative z-10">
          <Hero />
          <TechMarquee />
          <Projects />
          <Services />
          <Packages />
          <About />
          <Process />
          <Contact />
        </main>
        <Footer />
        <OrderModal />
      </div>
    </OrderProvider>
  );
}
