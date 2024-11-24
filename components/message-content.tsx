'use client'

import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import 'highlight.js/styles/github-dark.css'

interface MessageContentProps {
  content: string
  className?: string
}

export function MessageContent({ content, className = '' }: MessageContentProps) {
  return (
    <ReactMarkdown
      className={`prose prose-invert max-w-none ${className}`}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight, rehypeRaw]}
      components={{
        pre: ({ node, ...props }) => (
          <pre className="bg-gray-900 rounded-md p-4 overflow-x-auto" {...props} />
        ),
        code: ({ node, inline, ...props }) => (
          inline 
            ? <code className="bg-gray-800 rounded px-1 py-0.5" {...props} />
            : <code {...props} />
        ),
        p: ({ node, ...props }) => (
          <p className="mb-4 last:mb-0" {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul className="list-disc list-inside mb-4" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="list-decimal list-inside mb-4" {...props} />
        ),
        li: ({ node, ...props }) => (
          <li className="mb-1" {...props} />
        ),
        a: ({ node, ...props }) => (
          <a className="text-blue-400 hover:text-blue-300 underline" {...props} />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote className="border-l-4 border-gray-700 pl-4 italic" {...props} />
        ),
        hr: ({ node, ...props }) => (
          <hr className="border-gray-700 my-4" {...props} />
        ),
        table: ({ node, ...props }) => (
          <div className="overflow-x-auto">
            <table className="border-collapse table-auto w-full" {...props} />
          </div>
        ),
        th: ({ node, ...props }) => (
          <th className="border border-gray-700 px-4 py-2 bg-gray-800" {...props} />
        ),
        td: ({ node, ...props }) => (
          <td className="border border-gray-700 px-4 py-2" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
} 