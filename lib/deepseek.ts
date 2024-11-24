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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (!response.body) {
      throw new Error('No response body');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    return {
      async *[Symbol.asyncIterator]() {
        try {
          let reading = true;
          while (reading) {
            try {
              const result = await Promise.race([
                reader.read(),
                new Promise((_, reject) => 
                  setTimeout(() => reject(new Error('Response timeout')), 30000)
                )
              ]) as ReadableStreamReadResult<Uint8Array>;

              if (result.done) {
                reading = false;
                break;
              }

              const chunk = decoder.decode(result.value, { stream: true });
              if (chunk) {
                yield chunk;
              }
            } catch (error) {
              console.error('Chunk reading error:', error);
              reading = false;
              break;
            }
          }
        } catch (error) {
          console.error('Stream reading error:', error);
          throw error;
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