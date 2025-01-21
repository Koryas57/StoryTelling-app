import { OPENAI_API_KEY } from '@env';

export async function generateResponse(prompt: string): Promise<string> {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key is missing. Check your .env file.');
  }

  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 100,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch OpenAI response');
  }

  const data = await response.json();
  return data.choices[0].text.trim();
}
