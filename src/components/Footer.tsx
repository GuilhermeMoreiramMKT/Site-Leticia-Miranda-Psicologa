import { Link } from "wouter";
import { CheckCircle2 } from "lucide-react";
import logoImg from "@assets/Logo_Le-removebg-preview_1778616799049.png";

export default function Footer() {
  return (
    <footer className="bg-foreground text-white py-16">
      <div className="container mx-auto px-4 max-w-6xl">
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
            <h4 className="text-lg font-medium mb-6">Links rápidos</h4>
            <ul className="space-y-3 text-white/70">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/especialidades" className="hover:text-primary transition-colors">
                  Especialidades
                </Link>
              </li>
              <li>
                <Link href="/formacao" className="hover:text-primary transition-colors">
                  Formação
                </Link>
              </li>
              <li>
                <Link href="/como-funciona" className="hover:text-primary transition-colors">
                  Como funciona
                </Link>
              </li>
              <li>
                <Link href="/#contato" className="hover:text-primary transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-6">Atendimento</h4>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-primary" />
                Atendimento 100% online
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-primary" />
                Adolescentes, adultos e idosos
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-primary" />
                Sigilo profissional
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} Letícia Miranda - Psicóloga Clínica. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}