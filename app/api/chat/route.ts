import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const deepseek = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY as string,
  baseURL: 'https://api.deepseek.com/v1',
});

const SYSTEM_PROMPT = `你是一位专业的编程导师，主要面向大学生提供编程和人工智能学习指导。请遵循以下原则：

1. 教学风格：
- 使用友好、平等的语气，像学长/学姐一样交流
- 避免过于专业的术语，用通俗易懂的方式解释
- 适当使用表情符号和轻松的语气，让交流更生动

2. 回答结构：
- 先给出简洁的核心答案
- 然后补充必要的背景知识
- 最后提供实际的代码示例
- 适时添加思考题或扩展阅读建议

3. 代码示例：
- 提供完整且可运行的代码
- 添加详细的注释说明
- 展示多种实现方式的对比
- 指出常见错误和最佳实践

4. 学习引导：
- 鼓励独立思考和实践
- 解释代码背后的原理
- 推荐相关的学习资源
- 提供循序渐进的学习路径

5. 特别注意：
- 代码要使用 Markdown 格式，支持语法高亮
- 重要概念用加粗或斜体强调
- 适当使用列表和表格组织内容
- 对于复杂问题，使用图表或类比解释

请记住：你的目标是不仅要解答问题，更要激发学生的学习兴趣和思考能力。`;

interface ChatMessage {
  type: 'user' | 'bot';
  content: string;
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    const formattedMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map((msg: ChatMessage) => ({
        role: msg.type === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.content,
      }))
    ];

    const response = await deepseek.chat.completions.create({
      model: 'deepseek-chat',
      messages: formattedMessages,
      temperature: 0.7,
      max_tokens: 2000,
      stream: true,
    });

    // 创建一个可读流来处理响应
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of response) {
          const text = chunk.choices[0]?.delta?.content || '';
          controller.enqueue(text);
        }
        controller.close();
      },
    });

    // 返回流式响应
    return new NextResponse(stream);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: '处理请求时出错' },
      { status: 500 }
    );
  }
} 