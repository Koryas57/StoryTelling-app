import axios from 'axios';
import { OPENAI_API_KEY } from '@env';

export async function generateResponse(prompt: string): Promise<string> {
  if (!OPENAI_API_KEY) {
    console.error('Clé API OpenAI manquante.');
    throw new Error('Clé API OpenAI manquante.');
  }

  try {
    console.log('Envoi de la requête à OpenAI...');
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo', // Assurez-vous d'utiliser un modèle valide
        messages: [{ role: 'user', content: prompt }], // Structure requise pour gpt-3.5-turbo
        max_tokens: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Réponse API OpenAI reçue :', response.data);
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Erreur lors de l’appel API OpenAI :', error.response?.data || error.message);
    throw new Error('Échec de l’appel API OpenAI');
  }
}
