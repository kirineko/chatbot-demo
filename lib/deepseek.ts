export interface ChatMessage {
  type: 'user' | 'bot';
  content: string;
}

export async function generateChatResponse(messages: ChatMessage[]) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '请求失败');
    }

    if (!response.body) {
      throw new Error('没有响应数据');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    return {
      async *[Symbol.asyncIterator]() {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              break;
            }
            const chunk = decoder.decode(value, { stream: true });
            if (chunk) {
              yield chunk;
            }
          }
        } finally {
          reader.releaseLock();
        }
      }
    };
  } catch (error) {
    console.error('Chat API Error:', error);
    throw error;
  }
} 