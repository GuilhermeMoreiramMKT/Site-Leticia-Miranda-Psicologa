import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, BookOpen, GraduationCap, MessageCircle } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import heroBg from "@/assets/hero-bg.png";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const GOOGLE_ADS_CONVERSION_ID = "AW-18161384693/dSg7CIn0xKwcEPX5gtRD";
const WHATSAPP_LINK = "https://dub.sh/comecarjornada";
const YOUTUBE_VIDEO_ID = "_WGlN8KcVNA";
const PRESENTATION_VIDEO_URL = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?enablejsapi=1&playsinline=1&rel=0&modestbranding=1&cc_load_policy=0`;

function trackWhatsappClick(eventName: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, {
      page_location: window.location.href,
    });
  }
}

export default function Home() {
  const [showVideoCta, setShowVideoCta] = useState(false);
  const youtubePlayerRef = useRef<any>(null);
  const progressIntervalRef = useRef<number | null>(null);

  
  useEffect(() => {
    if (window.location.hash === "#contato") {
      setTimeout(() => {
        document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, []);

  useEffect(() => {
    function clearProgressInterval() {
      if (progressIntervalRef.current) {
        window.clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    }

    function startProgressCheck() {
      clearProgressInterval();

      progressIntervalRef.current = window.setInterval(() => {
        const player = youtubePlayerRef.current;

        if (!player || typeof player.getDuration !== "function" || typeof player.getCurrentTime !== "function") {
          return;
        }

        const duration = player.getDuration();
        const currentTime = player.getCurrentTime();

        if (duration > 0 && currentTime / duration >= 0.5) {
          setShowVideoCta(true);
          clearProgressInterval();
        }
      }, 1000);
    }

    function createYoutubePlayer() {
      if (!window.YT?.Player || youtubePlayerRef.current) return;

     youtubePlayerRef.current = new window.YT.Player("presentation-youtube-player", {
  events: {
    onReady: (event: any) => {
      try {
        event.target.unloadModule("captions");
        event.target.unloadModule("cc");
      } catch (error) {
        console.warn("Não foi possível desativar as legendas automaticamente.", error);
      }
    },

    onStateChange: (event: any) => {
      try {
        event.target.unloadModule("captions");
        event.target.unloadModule("cc");
      } catch (error) {
        console.warn("Não foi possível desativar as legendas automaticamente.", error);
      }
            const playerState = window.YT?.PlayerState;

            if (!playerState) return;

            if (event.data === playerState.PLAYING) {
              startProgressCheck();
            }

            if (event.data === playerState.PAUSED || event.data === playerState.ENDED) {
              clearProgressInterval();
            }

            if (event.data === playerState.ENDED) {
              setShowVideoCta(true);
            }
          },
        },
      });
    }

    if (window.YT?.Player) {
      createYoutubePlayer();
    } else {
      const existingScript = document.querySelector("script[src='https://www.youtube.com/iframe_api']");

      window.onYouTubeIframeAPIReady = createYoutubePlayer;

      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        document.body.appendChild(script);
      }
    }

    return () => {
      clearProgressInterval();
    };
  }, []);

  
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  function openWhatsapp(eventName: string) {
    trackWhatsappClick(eventName);
    window.open(WHATSAPP_LINK, "_blank");
  }

  return (
    <div className="min-h-[100dvh] bg-background text-foreground font-sans overflow-x-hidden">
      <Header />

      <section id="home" className="relative min-h-[90vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40 z-10"></div>
          <img src={heroBg} alt="Ambiente acolhedor de atendimento psicológico" className="w-full h-full object-cover object-center" />
        </div>

        <div className="container mx-auto px-4 max-w-8xl relative z-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="max-w-6xl">
            <motion.p variants={fadeInUp} className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-4">
              Letícia Miranda | Psicóloga Clínica | CRP 06/180091
            </motion.p>

            <motion.h1 variants={fadeInUp} className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-foreground mb-6">
              Um espaço seguro para compreender sua mente, fortalecer suas emoções e enfrentar seus desafios internos.
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-4xl">
              Atendimento psicológico online para mulheres.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 h-14 text-base font-medium shadow-sm gap-2"
                onClick={() => openWhatsapp("whatsapp_click_hero")}
                data-testid="button-hero-cta-1"
              >
                <FaWhatsapp className="text-xl" />
                Quero iniciar minha terapia
              </Button>

              
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-12 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-sm text-muted-foreground">
              <a
                href="https://wa.me/5511947592016"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
                onClick={() => trackWhatsappClick("whatsapp_click_phone_link")}
              >
                <FaWhatsapp className="text-xl" />
                (11) 94759-2016
              </a>

              <a
                href="https://instagram.com/psicleticiamiranda"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <FaInstagram className="text-xl" />
                @psicleticiamiranda
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-8xl">
          <Reveal className="text-center max-w-5xl mx-auto mb-12">
            <p className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-4">
              Apresentação
            </p>

            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              É muito bom te ver aqui!
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              O primeiro passo em busca do autoconhecimento e do cuidado emocional é o mais importante. Por isso, quero te dar as boas-vindas e te convidar a conhecer um pouco mais sobre o atendimento psicológico online que realizo.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="max-w-6xl mx-auto">
            <div className="relative w-full overflow-hidden rounded-3xl shadow-xl bg-black aspect-video">
  <iframe
    id="presentation-youtube-player"
    src={PRESENTATION_VIDEO_URL}
    title="Vídeo de apresentação Letícia Miranda"
    className="absolute inset-0 w-full h-full"
    allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />

  {showVideoCta && (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="absolute left-0 right-0 bottom-0 z-20 p-4 md:p-6 bg-gradient-to-t from-black/80 via-black/45 to-transparent"
    >
      <div className="flex justify-center">
        <Button
          size="lg"
          className="bg-[#25D366] text-white hover:bg-[#1ebe5d] rounded-full px-8 h-14 text-base font-medium shadow-lg gap-2 border border-white/20"
          onClick={() => openWhatsapp("whatsapp_click_video_half")}
        >
          <FaWhatsapp className="text-xl" />
          Quero conversar sobre a terapia
        </Button>
      </div>
    </motion.div>
  )}
</div>

           
          </Reveal>
        </div>
      </section>

      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4 max-w-8xl">
          <Reveal className="text-center max-w-5xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              Encontre o que você precisa saber
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Acesse as principais informações sobre o atendimento, a formação profissional e as áreas de cuidado clínico.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Reveal delay={0}>
              <Link href="/especialidades">
                <Card className="h-full border-none shadow-sm hover:shadow-lg transition-all duration-300 bg-white cursor-pointer group">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>

                    <CardTitle className="font-serif text-2xl">Especialidades</CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Conheça as principais demandas atendidas, como ansiedade, depressão, luto, relacionamentos, compulsão alimentar e autoconhecimento.
                    </p>

                    <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                      Ver especialidades
                      <ArrowRight size={18} />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </Reveal>

            <Reveal delay={0.08}>
              <Link href="/formacao">
                <Card className="h-full border-none shadow-sm hover:shadow-lg transition-all duration-300 bg-white cursor-pointer group">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                      <GraduationCap className="w-6 h-6 text-primary" />
                    </div>

                    <CardTitle className="font-serif text-2xl">Formação</CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Entenda minha formação acadêmica, pós-graduação, cursos complementares e o percurso profissional.
                    </p>

                    <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                      Ver formação
                      <ArrowRight size={18} />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </Reveal>

            <Reveal delay={0.16}>
              <Link href="/como-funciona">
                <Card className="h-full border-none shadow-sm hover:shadow-lg transition-all duration-300 bg-white cursor-pointer group">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                      <MessageCircle className="w-6 h-6 text-primary" />
                    </div>

                    <CardTitle className="font-serif text-2xl">Como funciona</CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Entenda como acontece o atendimento online, duração das sessões, sigilo, agendamento e primeiro contato.
                    </p>

                    <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                      Entender o atendimento
                      <ArrowRight size={18} />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>


      <Footer />

      <a
        href={WHATSAPP_LINK}
        onClick={() => trackWhatsappClick("whatsapp_click_link")}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50"
        aria-label="Contato via WhatsApp"
        data-testid="floating-whatsapp-btn"
      >
        <FaWhatsapp size={28} />
      </a>
    </div>
  );
}