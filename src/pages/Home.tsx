import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Brain, Users, Sparkles, Sun, Compass, Shield, Menu, X, ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { useSubmitContact } from "@/lib/api";
import heroBg from "@/assets/hero-bg.png";
import spaceImg from "@assets/Espaco_1778616799055.jpeg";
import portraitImg from "@/assets/Leticia_nova.png";
import logoImg from "@assets/Logo_Le-removebg-preview_1778616799049.png";
const GOOGLE_ADS_CONVERSION_ID = "AW-18161384693/dSg7CIn0xKwcEPX5gtRD";
const WHATSAPP_LINK = "https://dub.sh/comecarjornada";

const formSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  phone: z.string().min(10, "Informe um telefone válido."),
  email: z.string().email("Informe um e-mail válido."),
  reason: z.string().optional(),
  message: z.string().min(10, "Sua mensagem deve ter pelo menos 10 caracteres."),
});

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-[100dvh] bg-background text-foreground font-sans overflow-x-hidden">
      {/* Navigation */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 max-w-6xl flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollToSection("home")}
            data-testid="link-home-logo"
          >
            <img src={logoImg} alt="Logo Letícia Miranda" className="h-10 w-auto" />
            <div className="flex flex-col leading-tight">
              <span className="font-serif text-2xl font-semibold tracking-wide">Letícia Miranda</span>
              <span className="text-xs text-muted-foreground tracking-wide">CRP 06/180091</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button onClick={() => scrollToSection("home")} className="hover:text-primary transition-colors" data-testid="link-nav-home">Início</button>
            <button onClick={() => scrollToSection("sobre")} className="hover:text-primary transition-colors" data-testid="link-nav-about">Sobre</button>
            <button onClick={() => scrollToSection("especialidades")} className="hover:text-primary transition-colors" data-testid="link-nav-specialties">Especialidades</button>
            <button onClick={() => scrollToSection("como-funciona")} className="hover:text-primary transition-colors" data-testid="link-nav-how-it-works">Como Funciona</button>
            <button onClick={() => scrollToSection("contato")} className="hover:text-primary transition-colors" data-testid="link-nav-contact">Contato</button>
          </nav>

          <Button 
            className="hidden md:flex bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6"
            onClick={() => scrollToSection("contato")}
            data-testid="button-nav-cta"
          >
            Agendar Consulta
          </Button>

          <button 
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden flex flex-col gap-6"
          >
            <button onClick={() => scrollToSection("home")} className="text-xl font-serif text-left border-b pb-4">Início</button>
            <button onClick={() => scrollToSection("sobre")} className="text-xl font-serif text-left border-b pb-4">Sobre</button>
            <button onClick={() => scrollToSection("especialidades")} className="text-xl font-serif text-left border-b pb-4">Especialidades</button>
            <button onClick={() => scrollToSection("como-funciona")} className="text-xl font-serif text-left border-b pb-4">Como Funciona</button>
            <button onClick={() => scrollToSection("contato")} className="text-xl font-serif text-left border-b pb-4">Contato</button>
            <Button 
              className="bg-primary text-primary-foreground rounded-full py-6 text-lg mt-4"
              onClick={() => scrollToSection("contato")}
            >
              Agendar Consulta
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative min-h-[90vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40 z-10"></div>
          <img src={heroBg} alt="Cozy therapy room" className="w-full h-full object-cover object-center" />
        </div>
        
        <div className="container mx-auto px-6 max-w-6xl relative z-20">
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
              Atendimento online para adolescentes, adultos e idosos em um espaço seguro de escuta, acolhimento e autoconhecimento.
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
  Um espaço seguro para compreender sua mente, fortalecer suas emoções e enfrentar seus desafios internos.
</motion.p>
            </motion.h1>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 h-14 text-base font-medium shadow-sm gap-2"
                onClick={() => window.open(WHATSAPP_LINK, "_blank")}
                data-testid="button-hero-cta-1"
              >
                <FaWhatsapp className="text-xl" />
                Quero iniciar minha terapia
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full px-8 h-14 text-base font-medium border-muted-foreground/30 hover:bg-secondary/50"
                onClick={() => scrollToSection("contato")}
                data-testid="button-hero-cta-2"
              >
                Agendar conversa
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-12 flex items-center gap-6 text-sm text-muted-foreground">
              <a href="https://wa.me/5511947592016" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <FaWhatsapp className="text-xl" />
                (11) 94759-2016
              </a>
              <a href="https://instagram.com/psicleticiamiranda" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <FaInstagram className="text-xl" />
                @psicleticiamiranda
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* A Importância da Psicoterapia */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">A importância da psicoterapia para sua saúde emocional</h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {[
              { icon: <Heart className="w-6 h-6 text-primary" />, title: "Entender suas emoções", desc: "Compreenda melhor o que você sente e por quê." },
              { icon: <Users className="w-6 h-6 text-primary" />, title: "Melhorar relacionamentos", desc: "Desenvolva conexões mais saudáveis e significativas." },
              { icon: <Brain className="w-6 h-6 text-primary" />, title: "Reduzir ansiedade", desc: "Aprenda técnicas para lidar com preocupações excessivas." },
              { icon: <Sun className="w-6 h-6 text-primary" />, title: "Lidar com depressão", desc: "Encontre luz mesmo nos momentos mais difíceis." },
              { icon: <Shield className="w-6 h-6 text-primary" />, title: "Superar momentos difíceis", desc: "Desenvolva resiliência para enfrentar adversidades." },
              { icon: <Compass className="w-6 h-6 text-primary" />, title: "Desenvolver autoconhecimento", desc: "Descubra aspectos importantes sobre você mesmo." },
              { icon: <Sparkles className="w-6 h-6 text-primary" />, title: "Saúde emocional", desc: "Fortaleça seu bem-estar psicológico." },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="h-full border-none shadow-sm hover:shadow-md transition-all duration-300 bg-secondary/20">
                  <CardHeader>
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                      {item.icon}
                    </div>
                    <CardTitle className="font-serif text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-muted-foreground">{item.desc}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Transitional Section */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2"
            >
              <img
                src={spaceImg}
                alt="Espaço de atendimento"
                className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3]"
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="w-full md:w-1/2"
            >
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">Um espaço de acolhimento e transformação</h2>
              <p className="text-lg text-foreground/80 leading-relaxed mb-10">
                A terapia não é apenas para momentos de crise. É uma jornada de autoconhecimento que pode transformar positivamente todas as áreas da sua vida. Permita-se cuidar da sua saúde emocional com o mesmo carinho que cuida da saúde física.
              </p>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 h-14 text-base font-medium shadow-sm"
                onClick={() => window.open(WHATSAPP_LINK, "_blank")}
              >
                Começar meu processo terapêutico
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sobre a Psicóloga */}
      <section id="sobre" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row items-start gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-2/5 relative shrink-0"
            >
              <div className="absolute -inset-4 bg-secondary/50 rounded-full blur-2xl -z-10"></div>
              <img 
                src={portraitImg} 
                alt="Letícia Miranda" 
                className="w-full rounded-2xl shadow-xl relative z-10 object-cover object-top" 
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-3/5"
            >
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Sobre Mim</h2>
              <div className="w-16 h-1 bg-primary rounded-full mb-6"></div>
              <h3 className="text-lg font-medium text-muted-foreground mb-6">Psicóloga Clínica | Especialista em Psicanálise</h3>
              
              <div className="space-y-4 text-foreground/80 leading-relaxed text-lg">
                <p>
                  Sou uma psicóloga dedicada ao crescimento emocional dos meus pacientes e atuo a partir da psicanálise, com um olhar sensível e cuidadoso voltado à singularidade de cada pessoa!
                </p>
                <p>
                  Meu trabalho é direcionado ao acolhimento e à compreensão dos conflitos emocionais, ajudando cada indivíduo a entender aquilo que sente, reconhecer padrões que se repetem e enfrentar seus desafios internos com mais consciência e menos culpa!
                </p>
                <p>
                  Ao longo da minha trajetória clínica, acompanhei transformações importantes na vida de pessoas que chegaram até a terapia carregando angústias, conflitos internos, ansiedade e dificuldades emocionais, e que encontraram, nesse espaço, cuidado, escuta e compreensão sobre si mesmas! Acredito que muitas dores emocionais precisam, antes de tudo, ser acolhidas com humanidade, sensibilidade e sem julgamentos!
                </p>
                <p>
                  Na clínica, ofereço um ambiente seguro e acolhedor para que cada pessoa possa falar sobre si, elaborar suas vivências e construir formas mais saudáveis e honestas de se relacionar consigo mesma, com os outros e com a própria história!
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Formações */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Formação profissional em Psicologia e Psicanálise</h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp}>
              <h4 className="font-serif text-xl mb-4 text-foreground">Graduação &amp; Pós-Graduação</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-foreground/80">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Graduação em Psicologia — UNIP</span>
                </li>
                <li className="flex items-start gap-3 text-foreground/80">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Pós-graduação em Psicanálise — PUCRS</span>
                </li>
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h4 className="font-serif text-xl mb-4 text-foreground">Cursos Complementares</h4>
              <ul className="space-y-3">
                {[
                  "Neurociência do Desenvolvimento — PUCRS",
                  "Comunicação Não Violenta — PUCRS",
                  "Uma Psicanálise da Existência — Casa do Saber",
                  "Depressão: Entender para Vencer — Casa do Saber",
                  "Atenção à Saúde Mental do Homem — UFSC",
                  "Psicologia Organizacional — UEMA",
                  "Prevenção ao Suicídio — UFSC",
                ].map((course, i) => (
                  <li key={i} className="flex items-start gap-3 text-foreground/80">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{course}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Como Posso Ajudar */}
      <section id="especialidades" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Como a psicoterapia online pode ajudar você</h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Ansiedade", desc: "Compreenda e gerencie a ansiedade para viver com mais tranquilidade." },
              { title: "Depressão", desc: "Encontre caminhos para superar a depressão e redescobrir a alegria." },
              { title: "Luto", desc: "Apoio no processo de elaboração do luto e perdas significativas." },
              { title: "Relacionamentos", desc: "Melhore seus vínculos afetivos e relações interpessoais." },
              { title: "Compulsão alimentar", desc: "Trabalhe sua relação com a comida de forma saudável." },
              { title: "Identidade e autoconhecimento", desc: "Desenvolva uma compreensão profunda de si mesmo." },
              { title: "Fortalecimento emocional", desc: "Construa resiliência e equilíbrio emocional." },
              { title: "Dificuldades pessoais", desc: "Supere obstáculos e desafios do dia a dia." },
              { title: "Todas as idades", desc: "Atendimento especializado para adolescentes, adultos e idosos." },
            ].map((item, i) => (
              <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow bg-white">
                <CardHeader>
                  <CardTitle className="font-serif text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Como funciona o atendimento psicológico online</h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
          </motion.div>

          <div className="space-y-8">
            {[
              { step: "01", title: "Você entra em contato", desc: "Pode me chamar pelo WhatsApp ou preencher o formulário disponível na página." },
              { step: "02", title: "Conversamos sobre sua demanda", desc: "Esse primeiro contato ajuda a compreender sua necessidade e alinhar informações importantes." },
              { step: "03", title: "Agendamos o melhor horário", desc: "Os atendimentos são realizados de forma online, com conforto e praticidade." },
              { step: "04", title: "Início do acompanhamento", desc: "As sessões acontecem individualmente, em um espaço seguro de escuta e acolhimento." },
              { step: "05", title: "Acompanhamento personalizado", desc: "Cada processo terapêutico é único e respeita a história, o tempo e as necessidades de cada paciente." },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-secondary text-primary-foreground font-serif text-xl flex items-center justify-center shrink-0 shadow-sm">
                    {item.step}
                  </div>
                  {i !== 4 && <div className="w-0.5 h-full bg-secondary/50 my-2"></div>}
                </div>
                <div className="pt-2 pb-8">
                  <h3 className="font-serif text-2xl mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-lg">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Perguntas frequentes sobre terapia online</h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <Accordion type="single" collapsible className="w-full bg-white rounded-2xl shadow-sm p-2">
            {[
              { q: "Como funciona a terapia online?", a: "Os atendimentos acontecem de forma online, por videochamada, em um espaço seguro e acolhedor de escuta. Você pode realizar as sessões do conforto da sua casa, desde que esteja em um ambiente reservado, onde se sinta à vontade para falar sobre si." },
              { q: "Qual a duração das sessões?", a: "As sessões têm duração média de 45 minutos e acontecem semanalmente, em um horário previamente combinado." },
              { q: "Como faço para agendar?", a: "Você pode entrar em contato pelo WhatsApp ou preencher o formulário disponível na página. Após isso, conversaremos sobre sua disponibilidade e alinharemos as informações para o início do atendimento." },
              { q: "A terapia é sigilosa?", a: "Sim. O sigilo é um princípio ético fundamental da Psicologia. Tudo o que é compartilhado durante o processo terapêutico acontece em um espaço de escuta protegido, com respeito, ética e confidencialidade." },
              { q: "Você atende adolescentes?", a: "Sim. Realizo atendimento psicológico para adolescentes, considerando as singularidades, os atravessamentos emocionais e as transformações próprias dessa fase da vida. A psicoterapia pode ajudar o adolescente a construir mais compreensão sobre o que sente, fortalecendo seus recursos emocionais e sua relação consigo mesmo." },
            ].map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b-0">
                <AccordionTrigger className="font-serif text-xl px-4 hover:no-underline hover:text-primary transition-colors text-left">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="px-4 text-muted-foreground text-base leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA / Contact Form */}
      <section id="contato" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16">
            
            <div className="w-full lg:w-1/2">
              <h2 className="font-serif text-4xl text-foreground mb-6">Comece sua jornada de autoconhecimento com a terapia online</h2>
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
                    <a href="https://wa.me/5511947592016" className="text-muted-foreground hover:text-primary transition-colors">(11) 94759-2016</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-lg">
                  <div className="w-12 h-12 rounded-full bg-[#E1306C]/10 flex items-center justify-center shrink-0">
                    <FaInstagram className="text-2xl" style={{ color: "#E1306C" }} />
                  </div>
                  <div>
                    <p className="font-medium">Instagram</p>
                    <a href="https://instagram.com/psicleticiamiranda" className="text-muted-foreground hover:text-primary transition-colors">@psicleticiamiranda</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 bg-secondary/10 p-8 rounded-3xl">
              <h3 className="font-serif text-2xl mb-6">Entre em Contato</h3>
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
                            <SelectItem value="duvidas">Dúvidas sobre o Atendimento</SelectItem>
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
                    {submitContact.isPending ? "Enviando..." : "Solicitar Agendamento"}
                  </Button>
                </form>
              </Form>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img src={logoImg} alt="Logo Letícia Miranda" className="h-12 w-auto" />
                <div className="flex flex-col leading-tight">
                  <span className="font-serif text-2xl">Letícia Miranda</span>
                  <span className="text-xs text-white/50 tracking-wide">CRP 06/180091</span>
                </div>
              </div>
              <p className="text-white/70 mb-6 max-w-xs">
                Um espaço seguro para cuidar da sua saúde emocional.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-6">Links Rápidos</h4>
              <ul className="space-y-3 text-white/70">
                <li><button onClick={() => scrollToSection("home")} className="hover:text-primary transition-colors">Início</button></li>
                <li><button onClick={() => scrollToSection("sobre")} className="hover:text-primary transition-colors">Sobre a Psicóloga</button></li>
                <li><button onClick={() => scrollToSection("especialidades")} className="hover:text-primary transition-colors">Especialidades</button></li>
                <li><button onClick={() => scrollToSection("como-funciona")} className="hover:text-primary transition-colors">Como Funciona</button></li>
                <li><button onClick={() => scrollToSection("contato")} className="hover:text-primary transition-colors">Contato</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-6">Atendimento</h4>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary" />
                  Atendimento 100% Online
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary" />
                  Horários Flexíveis
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary" />
                  Sigilo Absoluto
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
            <p>&copy; {new Date().getFullYear()} Letícia Miranda - Psicóloga Clínica. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href={WHATSAPP_LINK}
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