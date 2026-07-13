// utils/api.ts
//
// Client d'appel utilisé par les écrans qui ont besoin de contenu généré
// (ex: les leçons de formation). Hawtrix n'a pas encore de backend dédié
// à la génération de contenu IA, donc ce client :
//   1. Essaie d'abord un backend configuré (si EXPO_PUBLIC_API_URL est défini).
//   2. Si aucun backend n'est configuré ou qu'il ne répond pas, génère un
//      contenu local cohérent — comme le fait déjà app/ai.tsx pour l'assistant IA —
//      pour que l'écran ne reste jamais bloqué sur une erreur.
//
// Signature inchangée : apiPost<T>(path, body) -> Promise<T>
// Aucun autre fichier de l'application n'est modifié.

export class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const API_BASE_URL = (process.env.EXPO_PUBLIC_API_URL ?? "").replace(/\/+$/, "");

export async function apiPost<T>(path: string, body?: Record<string, any>): Promise<T> {
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body ?? {}),
      });
      if (!res.ok) throw new ApiError(`Requête échouée (${res.status})`, res.status);
      return (await res.json()) as T;
    } catch (err) {
      console.warn(`apiPost(${path}) : backend indisponible, contenu local utilisé.`, err);
    }
  }

  const fallback = localFallback(path, body ?? {});
  if (fallback !== undefined) return fallback as T;

  throw new ApiError(`Aucun backend configuré et aucun contenu local pour ${path}`);
}

// ---------------------------------------------------------------------------
// Génération locale de contenu (aucun backend requis)
// ---------------------------------------------------------------------------

function localFallback(path: string, body: Record<string, any>): unknown {
  if (path === "/training/lesson") {
    return { success: true, lesson: generateLessonContent(body) };
  }
  return undefined;
}

function generateLessonContent(body: Record<string, any>) {
  const { lessonType, lessonTitle, moduleTitle, trainingTitle, instructor } = body;
  const subject = moduleTitle ?? trainingTitle ?? "ce module";

  if (lessonType === "quiz") {
    return {
      type: "quiz",
      title: lessonTitle ?? "Quiz",
      intro: `Testez vos connaissances sur "${subject}".`,
      questions: [
        {
          question: `Quel est l'objectif principal du module "${subject}" ?`,
          options: [
            "Acquérir les bases essentielles",
            "Ignorer la théorie",
            "Passer directement à l'examen",
            "Aucune de ces réponses",
          ],
          correct: 0,
          explanation: "Chaque module vise d'abord à poser des bases solides avant la pratique.",
        },
        {
          question: "Quelle est la meilleure façon de progresser dans cette formation ?",
          options: [
            "Pratiquer régulièrement",
            "Ne jamais réviser",
            "Sauter les exercices",
            "Attendre sans agir",
          ],
          correct: 0,
          explanation: "La pratique régulière est la clé de la progression, quel que soit le domaine.",
        },
      ],
    };
  }

  if (lessonType === "practice") {
    return {
      type: "practice",
      title: lessonTitle ?? "Exercice pratique",
      intro: `Mettez en application ce que vous avez appris dans "${subject}".`,
      steps: [
        { num: 1, title: "Préparez votre environnement", instruction: "Réunissez les outils et informations nécessaires avant de commencer.", tip: "Un environnement bien préparé évite les interruptions." },
        { num: 2, title: "Appliquez la méthode", instruction: `Suivez les principes vus dans "${subject}" étape par étape.`, tip: "Ne cherchez pas la perfection dès le premier essai." },
        { num: 3, title: "Analysez le résultat", instruction: "Comparez votre résultat aux objectifs du module et notez ce qui peut être amélioré.", tip: "L'auto-évaluation accélère l'apprentissage." },
      ],
      conclusion: "Répétez cet exercice régulièrement pour consolider vos compétences.",
    };
  }

  return {
    type: "lesson",
    title: lessonTitle ?? subject,
    hook: `Découvrez les points clés de "${subject}"${instructor ? ` avec ${instructor}` : ""}.`,
    slides: [
      {
        title: "Introduction",
        content: `Cette leçon fait partie du module "${subject}". Elle pose les bases indispensables avant d'aller plus loin.`,
        keyPoints: ["Comprendre le contexte", "Identifier les objectifs", "Se préparer à la pratique"],
        emoji: "🎯",
      },
      {
        title: "Points clés",
        content: "Concentrez-vous sur les notions essentielles avant de vous lancer dans des cas plus avancés.",
        keyPoints: ["Méthode claire", "Étapes progressives", "Application concrète"],
        emoji: "💡",
      },
      {
        title: "Passage à l'action",
        content: "La théorie seule ne suffit pas : appliquez ce que vous venez de voir dès que possible.",
        keyPoints: ["Pratiquer régulièrement", "Demander de l'aide si besoin", "Suivre votre progression"],
        emoji: "🚀",
      },
    ],
    summary: `Vous avez terminé "${lessonTitle ?? subject}". Continuez avec la prochaine leçon.`,
    nextStep: "Passez à la leçon suivante pour continuer votre progression.",
  };
}
