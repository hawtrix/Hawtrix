export interface Training {
  id: string;
  title: string;
  category: string;
  level: string;
  duration: string;
  lessons: number;
  color: string;
  icon: string;
  instructor: string;
  description: string;
  modules: string[];
}

export const TRAININGS: Training[] = [
  { id: "1", title: "Trading & Marchés Financiers", category: "Finance", level: "Débutant", duration: "8h", lessons: 24, color: "#10B981", icon: "trending-up", instructor: "M. Kofi Mensah", description: "Apprenez les bases du trading sur les marchés financiers mondiaux. Comprenez les concepts fondamentaux : analyse technique, gestion du risque, types d'ordres, psychologie du trader. Idéal pour les débutants souhaitant investir intelligemment.", modules: ["Introduction au trading", "Analyse technique", "Gestion du risque", "Psychologie du trader", "Plateformes de trading", "Stratégies gagnantes", "Mise en pratique", "Erreurs à éviter"] },
  { id: "2", title: "Crypto & Blockchain pour tous", category: "Finance", level: "Débutant", duration: "6h", lessons: 18, color: "#F59E0B", icon: "logo-bitcoin", instructor: "Mme Afi Koudou", description: "Découvrez l'univers des cryptomonnaies et de la technologie blockchain. Bitcoin, Ethereum, DeFi, NFTs : comprenez comment ça fonctionne et comment investir prudemment.", modules: ["Qu'est-ce que la blockchain ?", "Bitcoin et Ethereum", "Acheter ses premières cryptos", "Sécuriser son portefeuille", "DeFi et NFTs", "Stratégies d'investissement"] },
  { id: "3", title: "Développement Web Complet", category: "Informatique", level: "Intermédiaire", duration: "40h", lessons: 80, color: "#3B82F6", icon: "code-slash", instructor: "M. Mawuli Agbeko", description: "Maîtrisez le développement web de A à Z : HTML, CSS, JavaScript, React, Node.js. Ce cours intensif vous prépare à devenir développeur full-stack.", modules: ["HTML & CSS fondamentaux", "JavaScript avancé", "React.js", "Node.js & Express", "Bases de données", "Git & GitHub", "Déploiement", "Projet final"] },
  { id: "4", title: "Intelligence Artificielle & Machine Learning", category: "Informatique", level: "Avancé", duration: "20h", lessons: 40, color: "#7C3AED", icon: "sparkles", instructor: "Dr. Edem Lawson", description: "Plongez dans le monde de l'IA. Apprenez Python, les algorithmes de Machine Learning, les réseaux de neurones, et créez vos propres modèles intelligents.", modules: ["Python pour la Data Science", "Algorithmes ML", "Réseaux de neurones", "ChatGPT & LLMs", "Computer Vision", "Projets pratiques"] },
  { id: "5", title: "Marketing Digital & Réseaux Sociaux", category: "Marketing", level: "Débutant", duration: "10h", lessons: 30, color: "#EC4899", icon: "megaphone", instructor: "Mme Yawa Dogo", description: "Boostez votre business grâce au marketing digital. Facebook Ads, Instagram, TikTok, SEO, email marketing : maîtrisez tous les canaux pour développer votre audience et vendre en ligne.", modules: ["Stratégie digitale", "Facebook & Instagram", "TikTok Business", "SEO & Google", "Email Marketing", "Publicité en ligne", "Création de contenu", "Analyse des résultats"] },
  { id: "6", title: "Entrepreneuriat & Création d'entreprise", category: "Business", level: "Débutant", duration: "12h", lessons: 35, color: "#FF6B00", icon: "rocket", instructor: "M. Kosi Atcha", description: "De l'idée à l'entreprise : apprenez comment créer, structurer et financer votre startup en Afrique de l'Ouest. Business plan, financement, gestion, fiscalité OHADA.", modules: ["Valider son idée", "Business model", "Business plan", "Financement", "Statut juridique OHADA", "Gestion financière", "Marketing et ventes", "Scale your business"] },
  { id: "7", title: "Graphisme & Design avec Canva & Photoshop", category: "Créatif", level: "Débutant", duration: "8h", lessons: 25, color: "#EF4444", icon: "color-palette", instructor: "Mme Abla Foli", description: "Créez des visuels professionnels pour vos réseaux sociaux, affiches, logos. Maîtrisez Canva pour les débutants et initiez-vous à Photoshop.", modules: ["Principes du design", "Canva maîtrise complète", "Identité visuelle", "Social media design", "Introduction Photoshop", "Projets pratiques"] },
  { id: "8", title: "Comptabilité & Gestion SYSCOHADA", category: "Finance", level: "Intermédiaire", duration: "15h", lessons: 45, color: "#0F52BA", icon: "calculator", instructor: "M. Kodzo Dossou", description: "Maîtrisez la comptabilité selon le système SYSCOHADA applicable en Afrique de l'Ouest. Tenue de comptabilité, bilans, comptes de résultat, TVA.", modules: ["Principes comptables", "SYSCOHADA révisé", "Journal et grand livre", "Balance et bilan", "Compte de résultat", "TVA et fiscalité"] },
  { id: "9", title: "Agriculture Moderne & Business Agricole", category: "Agriculture", level: "Débutant", duration: "10h", lessons: 28, color: "#65A30D", icon: "leaf", instructor: "M. Kwame Agbo", description: "Transformez l'agriculture en business rentable. Maïs, manioc, volaille, poisson : apprenez les techniques modernes et comment commercialiser vos produits.", modules: ["Agriculture moderne", "Cultures rentables", "Élevage et pisciculture", "Business agricole", "Accès aux marchés", "Financement agricole"] },
  { id: "10", title: "Réparation Téléphones & Électronique", category: "Technique", level: "Débutant", duration: "16h", lessons: 48, color: "#6B7280", icon: "phone-portrait", instructor: "M. Sena Amavi", description: "Devenez technicien en réparation de smartphones et tablettes. Diagnostic, remplacement d'écrans, batteries, cartes mères. Formations pratiques avec vidéos.", modules: ["Outils et sécurité", "Diagnostic logiciel", "Remplacement écran", "Batteries et chargeurs", "Carte mère", "Créer son atelier"] },
  { id: "11", title: "Cuisine & Restauration Professionnelle", category: "Artisanat", level: "Débutant", duration: "14h", lessons: 42, color: "#DC2626", icon: "restaurant", instructor: "Mme Kossiwa Atchoe", description: "Apprenez l'art culinaire africain et international. Techniques de cuisine, gestion d'un restaurant, création de menus, hygiène alimentaire, business de la restauration.", modules: ["Techniques culinaires", "Cuisine africaine", "Cuisine internationale", "Pâtisserie", "Hygiène HACCP", "Gérer un restaurant"] },
  { id: "12", title: "Électricité Bâtiment & Solaire", category: "Technique", level: "Intermédiaire", duration: "18h", lessons: 55, color: "#FBBF24", icon: "flash", instructor: "M. Yao Tossou", description: "Maîtrisez l'électricité du bâtiment et les installations solaires. Schémas électriques, câblage, sécurité, dimensionnement solaire.", modules: ["Bases de l'électricité", "Schémas et normes", "Câblage bâtiment", "Éclairage LED", "Solaire photovoltaïque", "Maintenance"] },
];

export const CATEGORIES = ["Tous", "Finance", "Informatique", "Marketing", "Business", "Créatif", "Agriculture", "Technique", "Artisanat"];

export const LEVEL_COLORS: Record<string, string> = {
  Débutant: "#10B981",
  Intermédiaire: "#F59E0B",
  Avancé: "#EF4444",
};
