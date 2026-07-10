import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, BookOpen, GraduationCap, MessageCircle } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { useSubmitContact } from "@/lib/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
const PRESENTATION_VIDEO_URL = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?enablejsapi=1&rel=0&modestbranding=1`;

function trackWhatsappClick(eventName: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, {
      page_location: window.location.href,
    });
  }
}

const formSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  phone: z.string().min(10, "Informe um telefone válido."),
  email: z.string().email("Informe um e-mail válido."),
  reason: z.string().optional(),
  message: z.string().min(10, "Sua mensagem deve ter pelo menos 10 caracteres."),
});

export default function Home() {
  const [showVideoCta, setShowVideoCta] = useState(false);
  const youtubePlayerRef = useRef<any>(null);
  const progressIntervalRef = useRef<number | null>(null);

  const submitContact = useSubmitContact();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      reason: "",
      message: "",
    },
  });

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
          onStateChange: (event: any) => {
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    submitContact.mutate(
      { data: values },
      {
        onSuccess: () => {
          if (typeof window !== "undefined" && typeof window.gtag === "function") {
            window.gtag("event", "conversion", {
              send_to: GOOGLE_ADS_CONVERSION_ID,
            });

            window.gtag("event", "form_submit", {
              form_name: "contact_form",
              page_location: window.location.href,
            });
          }

          toast.success(
            "Obrigada pelo seu contato. Sei que, muitas vezes, esse primeiro passo não é simples. Em breve retornarei sua mensagem!",
            { duration: 6000 }
          );

          form.reset();
        },
        onError: () => {
          toast.error("Houve um erro ao enviar sua mensagem. Por favor, tente novamente ou entre em contato pelo WhatsApp.");
        },
      }
    );
  }

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

      {/* Hero */}
      <section id="home" className="relative min-h-[90vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40 z-10"></div>
          <img src={heroBg} alt="Ambiente acolhedor de atendimento psicológico" className="w-full h-full object-cover object-center" />
        </div>

        <div className="container mx-auto px-4 max-w-6xl relative z-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-2xl"
          >
            <motion.p variants={fadeInUp} className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-4">
              Letícia Miranda | Psicóloga Clínica | CRP 06/180091
            </motion.p>

            <motion.h1 variants={fadeInUp} className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-foreground mb-6">
              Um espaço seguro para compreender sua mente, fortalecer suas emoções e enfrentar seus desafios internos.
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
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

              <a href="#contato">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 h-14 text-base font-medium border-muted-foreground/30 hover:bg-secondary/50 w-full sm:w-auto"
                  data-testid="button-hero-cta-2"
                >
                  Agendar conversa
                </Button>
              </a>
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

      {/* Vídeo de apresentação */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <p className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-4">
              Apresentação
            </p>

            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              Conheça melhor o atendimento
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Uma breve apresentação sobre o processo terapêutico, a escuta clínica e a forma como o atendimento online acontece.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative w-full overflow-hidden rounded-3xl shadow-xl bg-black aspect-video">
              <iframe
                id="presentation-youtube-player"
                src={PRESENTATION_VIDEO_URL}
                title="Vídeo de apresentação Letícia Miranda"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {showVideoCta && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-8 flex justify-center"
              >
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 h-14 text-base font-medium shadow-sm gap-2"
                  onClick={() => openWhatsapp("whatsapp_click_video_half")}
                >
                  <FaWhatsapp className="text-xl" />
                  Quero conversar sobre a terapia
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Cards de navegação */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              Encontre o que você precisa saber
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Acesse as principais informações sobre o atendimento, a formação profissional e as áreas de cuidado clínico.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/especialidades">
              <Card className="h-full border-none shadow-sm hover:shadow-lg transition-all duration-300 bg-white cursor-pointer group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>

                  <CardTitle className="font-serif text-2xl">
                    Especialidades
                  </CardTitle>
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

            <Link href="/formacao">
              <Card className="h-full border-none shadow-sm hover:shadow-lg transition-all duration-300 bg-white cursor-pointer group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>

                  <CardTitle className="font-serif text-2xl">
                    Formação
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Veja a formação acadêmica, pós-graduação, cursos complementares e o percurso profissional da psicóloga Letícia Miranda.
                  </p>

                  <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                    Ver formação
                    <ArrowRight size={18} />
                  </span>
                </CardContent>
              </Card>
            </Link>

            <Link href="/como-funciona">
              <Card className="h-full border-none shadow-sm hover:shadow-lg transition-all duration-300 bg-white cursor-pointer group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>

                  <CardTitle className="font-serif text-2xl">
                    Como funciona
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Entenda como acontece o atendimento psicológico online, duração das sessões, sigilo, agendamento e primeiro contato.
                  </p>

                  <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                    Entender o atendimento
                    <ArrowRight size={18} />
                  </span>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="w-full lg:w-1/2">
              <h2 className="font-serif text-4xl text-foreground mb-6">
                Comece sua jornada de autoconhecimento com a terapia online
              </h2>

              <p className="text-xl text-muted-foreground mb-10">
                Um espaço acolhedor para cuidar da sua saúde emocional e compreender sua história.
              </p>

              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-4 text-lg">
                  <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center shrink-0">
                    <FaWhatsapp className="text-2xl" style={{ color: "#25D366" }} />
                  </div>

                  <div>
                    <p className="font-medium">WhatsApp</p>
                    <a
                      href="https://wa.me/5511947592016"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => trackWhatsappClick("whatsapp_click_contact")}
                    >
                      (11) 94759-2016
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-lg">
                  <div className="w-12 h-12 rounded-full bg-[#E1306C]/10 flex items-center justify-center shrink-0">
                    <FaInstagram className="text-2xl" style={{ color: "#E1306C" }} />
                  </div>

                  <div>
                    <p className="font-medium">Instagram</p>
                    <a
                      href="https://instagram.com/psicleticiamiranda"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      @psicleticiamiranda
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 bg-secondary/10 p-8 rounded-3xl">
              <h3 className="font-serif text-2xl mb-6">Entre em contato</h3>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input placeholder="Seu nome completo" className="bg-white" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone / WhatsApp</FormLabel>
                          <FormControl>
                            <Input placeholder="(11) 90000-0000" className="bg-white" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail</FormLabel>
                          <FormControl>
                            <Input placeholder="seu@email.com" className="bg-white" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Motivo do contato</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white">
                              <SelectValue placeholder="Selecione uma opção" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            <SelectItem value="primeira">Primeira consulta</SelectItem>
                            <SelectItem value="retorno">Retorno</SelectItem>
                            <SelectItem value="duvidas">Dúvidas sobre o atendimento</SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensagem</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Como posso ajudar?" className="bg-white min-h-[120px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={submitContact.isPending}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base rounded-full mt-4"
                    data-testid="button-submit-contact"
                  >
                    {submitContact.isPending ? "Enviando..." : "Solicitar agendamento"}
                  </Button>
                </form>
              </Form>
            </div>
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