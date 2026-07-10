import { Link } from "wouter";
import { ArrowLeft, GraduationCap, BookOpen, HeartHandshake } from "lucide-react";

export default function Formacao() {
  return (
    <main className="min-h-screen bg-background text-foreground px-4 py-24">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-10">
          <ArrowLeft size={18} />
          Voltar para o início
        </Link>

        <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
          Formação profissional
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mb-12">
          Conheça a formação acadêmica e o percurso profissional que sustentam o atendimento psicológico online realizado por Letícia Miranda.
        </p>

        <section className="grid gap-6">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <GraduationCap className="text-primary mt-1" size={28} />
              <div>
                <h2 className="font-serif text-2xl mb-3">Psicóloga clínica</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Formação em Psicologia, com atuação clínica voltada à escuta, ao cuidado emocional e ao acompanhamento de adolescentes, adultos e idosos.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <BookOpen className="text-primary mt-1" size={28} />
              <div>
                <h2 className="font-serif text-2xl mb-3">Pós-graduação em Psicanálise</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Pós-graduada em Psicanálise, com olhar voltado à singularidade de cada sujeito, sua história, seus vínculos e seus modos de sofrimento.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <HeartHandshake className="text-primary mt-1" size={28} />
              <div>
                <h2 className="font-serif text-2xl mb-3">Atendimento ético e humanizado</h2>
                <p className="text-muted-foreground leading-relaxed">
                  O trabalho clínico é conduzido com sigilo, responsabilidade profissional e respeito ao tempo de cada pessoa no processo terapêutico.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}