'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SendIcon, User, Bot, Settings, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { ChatMessage, generateChatResponse } from '@/lib/deepseek'
import { MessageContent } from '@/components/message-content'

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      type: 'bot', 
      content: `👋 你好！我是你的编程学习助手！

我可以帮你：
• 📚 解答编程概念和原理
• 💻 编写和优化代码示例
• 🔍 调试和修复代码问题
• 📈 提供学习路线建议
• 🚀 讲解人工智能相关知识

**一些例子：**
1. "解释一下什么是递归，并给出Python示例"
2. "帮我优化这段React代码的性能"
3. "如何入门机器学习？需要哪些基础？"

💡 **小提示：** 
- 提问时尽量说明你的具体需求和背景
- 如果代码有问题，可以直接粘贴代码并说明问题
- 随时可以追问，我会更详细地解释

请告诉我你想了解什么？我会用通俗易懂的方式帮你解答！` 
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [partialResponse, setPartialResponse] = useState('')
  
  // 添加滚动相关的 ref
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // 自动滚动到底部
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // 监听消息变化和部分响应变化，自动滚动
  useEffect(() => {
    scrollToBottom()
  }, [messages, partialResponse])

  // 处理输入框快捷键
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    
    const userMessage: ChatMessage = { type: 'user', content: input.trim() }
    setInput('')
    const newMessages: ChatMessage[] = [...messages, userMessage]
    setMessages(newMessages)
    
    setIsLoading(true)
    setPartialResponse('')
    
    try {
      const stream = await generateChatResponse(newMessages)
      
      let fullResponse = ''
      for await (const chunk of stream) {
        fullResponse += chunk
        setPartialResponse(prev => prev + chunk)
      }
      
      const botMessage: ChatMessage = { type: 'bot', content: fullResponse }
      setMessages(prev => [...prev, botMessage])
      setPartialResponse('')
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: ChatMessage = { 
        type: 'bot', 
        content: '抱歉，处理您的请求时出现了错误。请稍后重试。'
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
        <Link href="/" className="text-xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
          AI Chat
        </Link>
        <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </header>

      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto space-y-4 p-4 scroll-smooth"
      >
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex items-start gap-3 ${message.type === 'user' ? 'justify-end' : ''}`}
            >
              {message.type === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-lg p-4 ${
                message.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-100'
              }`}>
                <MessageContent content={message.content} />
              </div>
              {message.type === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* 流式响应显示 */}
        {partialResponse && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="max-w-[80%] rounded-lg p-4 bg-gray-800 text-gray-100">
              <MessageContent content={partialResponse} />
            </div>
          </motion.div>
        )}
        
        {isLoading && !partialResponse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-gray-400"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>AI 正在思考...</span>
          </motion.div>
        )}
        
        {/* 用于自动滚动的空白元素 */}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-700 p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入您的问题... (按 Enter 发送，Shift + Enter 换行)"
            className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-[56px] max-h-[200px] overflow-y-auto"
            disabled={isLoading}
            rows={1}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  )
} 