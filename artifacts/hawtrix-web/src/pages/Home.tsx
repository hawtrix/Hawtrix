import { motion } from "framer-motion";
import { 
  Users, 
  GraduationCap, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  CreditCard,
  ShieldCheck,
  ArrowRight,
  Download,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Trouver des Professionnels",
    description: "Annuaire vérifié par métier et localisation",
    icon: Users,
  },
  {
    title: "Se Former en Ligne",
    description: "Formations pratiques par des experts africains",
    icon: GraduationCap,
  },
  {
    title: "Découvrir des Opportunités",
    description: "Bourses, emplois et concours au Togo et en Afrique",
    icon: Briefcase,
  },
  {
    title: "Outils Pro",
    description: "Générateur de CV, devis et factures professionnels",
    icon: FileText,
  },
  {
    title: "Discussion Intégrée",
    description: "Messagerie directe avec les prestataires",
    icon: MessageSquare,
  },
  {
    title: "Paiements Sécurisés",
    description: "Transactions sécurisées via TMoney et Flooz",
    icon: CreditCard,
  }
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <div className="min-h-screen bg-white text-primary flex flex-col font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <img src={`${baseUrl}logo.png`} alt="Hawtrix Logo" className="h-10 object-contain" />
          </a>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#features" className="hover:text-accent transition-colors">Fonctionnalités</a>
            <a href="#about" className="hover:text-accent transition-colors">Notre Mission</a>
            <div className="flex items-center gap-2 text-accent bg-accent/10 px-3 py-1.5 rounded-full font-bold">
              <ShieldCheck className="w-4 h-4" />
              Professionnels vérifiés
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <Button variant="default" className="bg-accent text-white hover:bg-accent/90 rounded-full px-6">
              Télécharger l'App
            </Button>
          </div>

          <button 
            className="md:hidden text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-b border-gray-100 p-6 flex flex-col gap-4"
          >
            <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Fonctionnalités</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Notre Mission</a>
            <div className="flex items-center gap-2 text-accent bg-accent/10 px-4 py-2 rounded-lg font-bold w-fit">
              <ShieldCheck className="w-5 h-5" />
              Professionnels vérifiés
            </div>
            <Button variant="default" className="bg-accent text-white hover:bg-accent/90 rounded-full w-full mt-4">
              Télécharger l'App
            </Button>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/[0.02] -z-10" />
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                La Référence des Services et Opportunités au Togo et en Afrique
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]"
              >
                Trouvez. Apprenez.<br />
                <span className="text-accent">Évoluez. Gagnez.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg lg:text-xl text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0"
              >
                Hawtrix est la plateforme tout-en-un qui connecte les talents africains, les opportunités et les solutions. Votre succès, notre mission.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <a href="#" className="flex items-center justify-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-bold w-full sm:w-auto hover:bg-primary/90 transition-transform hover:scale-105 active:scale-95">
                  <Download className="w-5 h-5" />
                  App Store
                </a>
                <a href="#" className="flex items-center justify-center gap-3 bg-accent text-white px-8 py-4 rounded-full font-bold w-full sm:w-auto hover:bg-accent/90 transition-transform hover:scale-105 active:scale-95">
                  <Download className="w-5 h-5" />
                  Google Play
                </a>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex-1 relative w-full max-w-lg lg:max-w-none"
            >
              <div className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl relative z-10 border-8 border-white">
                <img 
                  src={`${baseUrl}hero-professional.png`} 
                  alt="African professional using Hawtrix app" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-10" />
              <div className="absolute -top-8 -right-8 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-gray-50 px-6">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-6">Tout ce dont vous avez besoin pour exceller</h2>
            <p className="text-lg text-gray-600">
              Une suite complète d'outils et de services conçue spécifiquement pour propulser votre carrière ou votre entreprise au Togo et au-delà.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors duration-300 text-primary">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Dive / Mission */}
      <section id="about" className="py-24 px-6 relative">
        <div className="container mx-auto">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1 relative"
            >
              <div className="aspect-square lg:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl relative z-10 border-8 border-white">
                <img 
                  src={`${baseUrl}team-collaboration.png`} 
                  alt="African team collaborating" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl -z-10" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">
                Votre succès, <br/>
                <span className="text-accent">notre mission.</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-600">
                <p>
                  Hawtrix n'est pas juste une application. C'est un écosystème conçu pour libérer le potentiel des professionnels africains.
                </p>
                <p>
                  Que vous cherchiez à acquérir de nouvelles compétences, à proposer vos services, ou à gérer votre entreprise de manière plus professionnelle, Hawtrix rassemble tous les outils nécessaires dans une seule interface fluide et intuitive.
                </p>
              </div>
              <div className="mt-10 flex items-center gap-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full bg-gray-200 border-4 border-white overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/initials/svg?seed=User${i}&backgroundColor=0A1628,FF6B00`} alt="User" />
                    </div>
                  ))}
                </div>
                <div className="text-sm font-medium">
                  Rejoignez des milliers de<br/>professionnels au Togo
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-[2rem] overflow-hidden shadow-2xl"
          >
            <img 
              src={`${baseUrl}banner.png`} 
              alt="Hawtrix Marketing Banner" 
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-accent/5" />
        <div className="container mx-auto relative z-10 text-center max-w-4xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-bold mb-8"
          >
            Prêt à transformer votre carrière ?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 mb-12"
          >
            Téléchargez l'application Hawtrix dès aujourd'hui et accédez à un monde d'opportunités.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <a href="#" className="flex items-center justify-center gap-3 bg-primary text-white px-10 py-5 rounded-full font-bold text-lg w-full sm:w-auto hover:bg-primary/90 transition-transform hover:scale-105 shadow-xl">
              <Download className="w-6 h-6" />
              Télécharger sur l'App Store
            </a>
            <a href="#" className="flex items-center justify-center gap-3 bg-accent text-white px-10 py-5 rounded-full font-bold text-lg w-full sm:w-auto hover:bg-accent/90 transition-transform hover:scale-105 shadow-xl">
              <Download className="w-6 h-6" />
              Obtenir sur Google Play
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-16 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <img src={`${baseUrl}logo.png`} alt="Hawtrix Logo" className="h-12 object-contain mb-6 brightness-0 invert" />
              <p className="text-gray-400 max-w-md text-lg">
                La plateforme tout-en-un qui connecte les talents africains, les opportunités et les solutions.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Légal</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-accent transition-colors">Conditions d'utilisation</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Politique de confidentialité</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Mentions légales</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Contact</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-accent transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Partenariats</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} Hawtrix. Tous droits réservés.</p>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-accent" />
              <span>Paiements 100% sécurisés</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
