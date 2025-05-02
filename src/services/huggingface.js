export const sendMessageToHuggingFace = async (userMessage) => {
  const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1";
  const API_TOKEN = process.env.REACT_APP_HUGGINGFACE_API_TOKEN; // Usando el token desde las variables de entorno

  const headers = {
    Authorization: `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
  };

  const body = {
    inputs: `Usuario: ${userMessage}\nAsistente:`,
    parameters: {
      max_new_tokens: 100,
      temperature: 0.7,
      return_full_text: false,
    },
  };

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

    const data = await res.json();

    // Verificar si la respuesta contiene la estructura esperada
    if (data[0]?.generated_text) {
      return data[0].generated_text.replace(/^Usuario:.*?\nAsistente:/s, '').trim() || "⚠️ Sin respuesta.";
    } else {
      throw new Error("Respuesta inesperada de la API");
    }
  } catch (err) {
    console.error("HuggingFace Error:", err);
    throw new Error("Hubo un problema al conectar con el servidor. Intenta más tarde.");
  }
};
