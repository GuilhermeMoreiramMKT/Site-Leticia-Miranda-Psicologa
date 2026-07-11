import { Link } from "wouter";
import { ArrowLeft, Video, Clock, ShieldCheck, CalendarCheck, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import portraitImg from "@/assets/Leticia-foto.jpg";

export default function ComoFunciona() {
  return (
    <div className="min-h-[100dvh] bg-background text-foreground font-sans overflow-x-hidden">
      <Header />

      <main className="min-h-screen bg-background text-foreground px-4 py-32">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-10">
              <ArrowLeft size={18} />
              Voltar para o início
            </Link>
          </Reveal>

          <section className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <Reveal delay={0.06}>
              <div>
                <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
                  Como funciona o atendimento psicológico online
                </h1>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  O atendimento online acontece por videochamada, em um espaço sigiloso e acolhedor, respeitando o tempo e a singularidade de cada pessoa.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="relative">
                <div className="absolute -inset-4 bg-secondary/50 rounded-full blur-2xl -z-10"></div>
                <img
                  src={portraitImg}
                  alt="Letícia Miranda"
                  className="w-[80%] mx-auto rounded-2xl shadow-xl relative z-10 object-cover object-top"
                />
              </div>
            </Reveal>
          </section>

          <section className="grid gap-6">
            <Reveal delay={0}>
              <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <Video className="text-primary mt-1" size={28} />
                  <div>
                    <h2 className="font-serif text-2xl mb-3">Atendimento por videochamada</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      As sessões acontecem online, permitindo que você realize o processo terapêutico de onde estiver, com privacidade e segurança.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <Clock className="text-primary mt-1" size={28} />
                  <div>
                    <h2 className="font-serif text-2xl mb-3">Tempo de sessão</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Cada sessão tem duração média de 50 minutos, com frequência combinada conforme a necessidade do processo terapêutico.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <ShieldCheck className="text-primary mt-1" size={28} />
                  <div>
                    <h2 className="font-serif text-2xl mb-3">Sigilo e cuidado ético</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      O atendimento é conduzido com sigilo profissional, responsabilidade ética e respeito à história de cada paciente.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <CalendarCheck className="text-primary mt-1" size={28} />
                  <div>
                    <h2 className="font-serif text-2xl mb-3">Agendamento</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      O primeiro contato pode ser feito pelo formulário ou pelo WhatsApp. Depois disso, são combinados horário, frequência e próximos passos.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <MessageCircle className="text-primary mt-1" size={28} />
                  <div>
                    <h2 className="font-serif text-2xl mb-3">Primeiro contato</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      No primeiro contato, você pode tirar dúvidas sobre o atendimento, valores, disponibilidade de horários e início do processo terapêutico.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}