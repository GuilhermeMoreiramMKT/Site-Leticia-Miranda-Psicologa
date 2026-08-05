import { useEffect, useRef } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Especialidades from "@/pages/Especialidades";
import Formacao from "@/pages/Formacao";
import ComoFunciona from "@/pages/ComoFunciona";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const queryClient = new QueryClient();

const GA4_MEASUREMENT_ID = "G-7PYR84MT0M";
const GOOGLE_ADS_ID = "AW-18161384693";

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    if (window.location.hash) return;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [location]);

  return null;
}

function TrackPageViews() {
  const [location] = useLocation();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.gtag !== "function") {
      return;
    }

    /**
     * O carregamento inicial já é registrado pelo script do Google Tag no index.html.
     * Aqui evitamos duplicar o primeiro page_view e registramos apenas mudanças internas de rota.
     */
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    const pagePath = window.location.pathname + window.location.search + window.location.hash;
    const pageLocation = window.location.href;
    const pageTitle = document.title;

    window.gtag("event", "page_view", {
      send_to: GA4_MEASUREMENT_ID,
      page_title: pageTitle,
      page_location: pageLocation,
      page_path: pagePath,
    });

    window.gtag("config", GOOGLE_ADS_ID, {
      page_title: pageTitle,
      page_location: pageLocation,
      page_path: pagePath,
    });
  }, [location]);

  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <TrackPageViews />

      <Switch>
        <Route path="/" component={Home} />
        <Route path="/especialidades" component={Especialidades} />
        <Route path="/formacao" component={Formacao} />
        <Route path="/como-funciona" component={ComoFunciona} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
        <SonnerToaster position="top-center" richColors />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;