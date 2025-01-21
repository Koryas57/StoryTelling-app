import axios from 'axios';
import { OPENAI_API_KEY } from '@env';

/**
 * Fonction pour générer une réponse via l'API OpenAI.
 * @param prompt Texte ou description à envoyer à l'API
 * @param type Type de réponse souhaitée : 'text' ou 'image'
 * @returns Une chaîne de texte ou une URL d'image
 */
export const generateResponse = async (
  prompt: string,
  type: 'text' = 'text' // Force uniquement le texte
): Promise<string> => {
  try {
    const url = 'https://api.openai.com/v1/chat/completions';

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    };

    const data = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000,
    };

    console.log('Envoi de la requête OpenAI :', data);

    const response = await axios.post(url, data, { headers });

    return response.data.choices[0].message.content;
  } catch (error: any) {
    console.error('Erreur OpenAI :', error.message || error);
    throw new Error(error.response?.data?.error?.message || 'Erreur inconnue');
  }
};