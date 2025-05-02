export async function fetchChatHistory() {
    const res = await fetch('/api/messages');
    if (!res.ok) throw new Error('Error al cargar historial');
    const data = await res.json();
    return data.messages;
  }
  