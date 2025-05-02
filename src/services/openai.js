import axios from 'axios';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

export const sendMessageToOpenAI = async (message) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error al llamar a OpenAI:', error);
    throw error;
  }
};
