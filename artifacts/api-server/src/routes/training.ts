import { Router, type IRouter } from "express";
import type { Request, Response } from "express";
import OpenAI from "openai";

const router: IRouter = Router();

function getOpenAI(): OpenAI {
  const baseURL = process.env["AI_INTEGRATIONS_OPENAI_BASE_URL"];
  const apiKey = process.env["AI_INTEGRATIONS_OPENAI_API_KEY"];
  if (!baseURL || !apiKey) throw new Error("OpenAI not configured");
  return new OpenAI({ baseURL, apiKey });
}

// POST /api/training/lesson — génère le contenu d'une leçon
router.post("/training/lesson", async (req: Request, res: Response) => {
  const { trainingTitle, moduleTitle, lessonTitle, lessonType, instructor } = req.body as {
    trainingTitle: string;
    moduleTitle: string;
    lessonTitle: string;
    lessonType: string;
    instructor: string;
  };

  if (!trainingTitle || !moduleTitle || !lessonTitle) {
    res.status(400).json({ error: "Paramètres manquants" });
    return;
  }

  const openai = getOpenAI();

  const systemPrompt = `Tu es ${instructor}, formateur expert Hawtrix. Tu donnes des cours de qualité professionnelle à des professionnels africains (Togo, Afrique de l'Ouest). 
Ton style est : clair, motivant, concret, avec des exemples locaux africains quand c'est pertinent.
Réponds toujours en français.`;

  const isQuiz = lessonType.includes("Quiz");
  const isPractice = lessonType.includes("Pratique");

  let userPrompt = "";

  if (isQuiz) {
    userPrompt = `Crée un quiz de validation pour le module "${moduleTitle}" de la formation "${trainingTitle}".
Format JSON strict :
{
  "type": "quiz",
  "title": "...",
  "intro": "Message d'introduction court (1 phrase)",
  "questions": [
    {
      "question": "Question claire",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct": 0,
      "explanation": "Explication courte de la bonne réponse"
    }
  ]
}
Génère exactement 4 questions pertinentes sur le module.`;
  } else if (isPractice) {
    userPrompt = `Crée un exercice pratique pour "${lessonTitle}" dans la formation "${trainingTitle}".
Format JSON strict :
{
  "type": "practice",
  "title": "...",
  "intro": "Contexte de l'exercice (2-3 phrases)",
  "steps": [
    { "num": 1, "title": "Titre de l'étape", "instruction": "Description claire de ce qu'il faut faire", "tip": "Conseil pratique" }
  ],
  "conclusion": "Message de félicitation et lien avec la suite"
}
Génère 4-5 étapes pratiques réalistes et applicables immédiatement.`;
  } else {
    userPrompt = `Crée le contenu d'une leçon sur "${lessonTitle}" pour la formation "${trainingTitle}" (module: ${moduleTitle}).
Format JSON strict :
{
  "type": "lesson",
  "title": "...",
  "hook": "Accroche percutante (1-2 phrases qui donnent envie d'apprendre)",
  "slides": [
    {
      "title": "Titre de la slide",
      "content": "Contenu principal (3-5 phrases claires et instructives)",
      "keyPoints": ["Point clé 1", "Point clé 2", "Point clé 3"],
      "emoji": "🎯"
    }
  ],
  "summary": "Résumé des points essentiels à retenir (2-3 phrases)",
  "nextStep": "Ce que l'apprenant va faire ensuite"
}
Génère 4-5 slides pédagogiques de qualité, avec des exemples concrets africains.`;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-5.4-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
      max_tokens: 1500,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("Réponse vide");

    const parsed = JSON.parse(content);
    res.json({ success: true, lesson: parsed });
  } catch (err) {
    req.log.error({ err }, "Erreur génération leçon IA");
    res.status(500).json({ error: "Erreur lors de la génération du contenu" });
  }
});

export default router;
