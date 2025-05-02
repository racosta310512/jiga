export async function sendMessageToOpenAI(message) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) throw new Error('Error al enviar mensaje al backend');

  const data = await res.json();
  return data.response;
}
