import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import About from "./components/About";
import Background from "./components/Background";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Packages from "./components/Packages";
import PersonalBrand from "./components/PersonalBrand";
import Process from "./components/Process";
import Projects from "./components/Projects";
import Services from "./components/Services";
import TechMarquee from "./components/TechMarquee";
import { OrderContext } from "./context/order";

const OrderModal = lazy(() => import("./components/OrderModal"));

function OrderProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [activated, setActivated] = useState(false);

  const openOrder = useCallback((pkgId = null) => {
    setActivated(true);
    setSelectedPackage(pkgId);
    setIsOpen(true);
  }, []);

  const closeOrder = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, selectedPackage, openOrder, closeOrder }),
    [isOpen, selectedPackage, openOrder, closeOrder]
  );

  return (
    <OrderContext.Provider value={value}>
      {children}
      {activated && (
        <Suspense fallback={null}>
          <OrderModal />
        </Suspense>
      )}
    </OrderContext.Provider>
  );
}

export default function App() {
  useEffect(() => {
    document.documentElement.lang = "uz";
  }, []);

  return (
    <OrderProvider>
      <div className="grain relative min-h-screen overflow-x-hidden bg-cream text-espresso">
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
          <PersonalBrand />
          <Contact />
        </main>
        <Footer />
      </div>
    </OrderProvider>
  );
}
