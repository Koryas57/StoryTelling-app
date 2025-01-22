import axios from 'axios';
import { OPENAI_API_KEY } from '@env';

export const generateResponse = async (
  prompt: string,
  type: 'text' | 'image' = 'text'
): Promise<string> => {
  try {
    console.log(`[OpenAI] Type de requête : ${type}`);
    console.log(`[OpenAI] Prompt envoyé : ${prompt}`);

    const url =
      type === 'text'
        ? 'https://api.openai.com/v1/chat/completions'
        : 'https://api.openai.com/v1/images/generations';

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    };

    const data =
      type === 'text'
        ? {
            model: 'gpt-4-turbo',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 1200,
          }
        : {
            prompt,
            n: 1,
            size: '512x512', // Taille d'image valide
          };

    console.log(`[OpenAI] Requête envoyée à ${url} avec données :`, data);

    const response = await axios.post(url, data, { headers });
    console.log(`[OpenAI] Réponse reçue :`, response.data);

    if (type === 'text') {
      return response.data.choices[0]?.message?.content || 'Aucune réponse reçue.';
    } else {
      return response.data.data[0]?.url || '';
    }
  } catch (error: any) {
    console.error('[OpenAI] Erreur lors de l’appel à l’API :', error.message || error);
    if (error.response?.data?.error) {
      console.error('[OpenAI] Détails de l’erreur :', error.response.data.error);
    }
    throw new Error(
      error.response?.data?.error?.message || 'Erreur inconnue lors de l’appel à OpenAI.'
    );
  }
};
