export const sendMessageToHuggingFace = async (userMessage) => {
  const API_URL = "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta";
  const API_TOKEN = process.env.REACT_APP_HUGGINGFACE_API_TOKEN;

  const headers = {
    Authorization: `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
  };

  const body = {
    inputs: `<|user|>\n${userMessage}\n<|assistant|>`,
    parameters: {
      max_new_tokens: 200,
      temperature: 0.7,
      return_full_text: false
    }
  };

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`API Error ${res.status}: ${errorText}`);
      throw new Error(errorText);
    }

    const data = await res.json();
    return data[0]?.generated_text?.trim() || "⚠️ Sin respuesta.";
  } catch (err) {
    console.error("HuggingFace Error:", err);
    throw err;
  }
};
