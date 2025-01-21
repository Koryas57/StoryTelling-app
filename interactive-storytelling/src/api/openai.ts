import axios from 'axios';
import { OPENAI_API_KEY } from '@env';

export const generateResponse = async (
  prompt: string,
  type: 'text' | 'image' = 'text'
): Promise<string> => {
  try {
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
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 1000,
          }
        : {
            prompt,
            n: 1,
            size: '512x512', // Taille d'image valide
          };

    const response = await axios.post(url, data, { headers });

    if (type === 'text') {
      return response.data.choices[0]?.message?.content || 'Aucune réponse reçue.';
    } else {
      return response.data.data[0]?.url || '';
    }
  } catch (error: any) {
    console.error('Erreur lors de l’appel à l’API OpenAI :', error.message || error);
    throw new Error(
      error.response?.data?.error?.message || 'Erreur inconnue lors de l’appel à OpenAI.'
    );
  }
};
