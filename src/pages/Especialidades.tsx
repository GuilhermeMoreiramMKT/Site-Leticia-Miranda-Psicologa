import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export default function Especialidades() {
  return (
    <div className="min-h-[100dvh] bg-background text-foreground font-sans overflow-x-hidden">
      <Header />

      <main className="min-h-screen bg-background text-foreground px-4 py-32">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-10">
              <ArrowLeft size={18} />
              Voltar para o início
            </Link>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
              Especialidades
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mb-12">
              Atendimento psicológico online para adolescentes, adultos e idosos, com escuta clínica voltada ao cuidado emocional, autoconhecimento e elaboração das experiências de vida.
            </p>
          </Reveal>

          <section className="grid md:grid-cols-2 gap-6">
            <Reveal delay={0}>
              <div className="rounded-2xl border bg-card p-6 shadow-sm h-full">
                <h2 className="font-serif text-2xl mb-3">Ansiedade</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Um espaço para compreender angústias, pensamentos acelerados, medos recorrentes e formas de lidar com os impactos emocionais da ansiedade.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="rounded-2xl border bg-card p-6 shadow-sm h-full">
                <h2 className="font-serif text-2xl mb-3">Depressão</h2>
                <p className="text-muted-foreground leading-relaxed">
                  A psicoterapia pode auxiliar na escuta do sofrimento, da perda de sentido, do cansaço emocional e das dificuldades que atravessam a vida cotidiana.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="rounded-2xl border bg-card p-6 shadow-sm h-full">
                <h2 className="font-serif text-2xl mb-3">Relacionamentos</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Um processo para olhar para vínculos, repetições, conflitos afetivos, dependência emocional e modos de se relacionar consigo e com o outro.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="rounded-2xl border bg-card p-6 shadow-sm h-full">
                <h2 className="font-serif text-2xl mb-3">Luto</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Um espaço de acolhimento para elaborar perdas, ausências, mudanças importantes e os efeitos emocionais que o luto pode produzir.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="rounded-2xl border bg-card p-6 shadow-sm h-full">
                <h2 className="font-serif text-2xl mb-3">Compulsão alimentar</h2>
                <p className="text-muted-foreground leading-relaxed">
                  A escuta clínica pode ajudar a compreender a relação com a comida, o corpo, a culpa e os afetos envolvidos nesse sofrimento.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="rounded-2xl border bg-card p-6 shadow-sm h-full">
                <h2 className="font-serif text-2xl mb-3">Autoestima e autoconhecimento</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Um processo para ampliar a compreensão sobre si, suas escolhas, seus limites, sua história e seus modos de existir.
                </p>
              </div>
            </Reveal>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}