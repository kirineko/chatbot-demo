'use client'

import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import 'highlight.js/styles/github-dark.css'
import { Components } from 'react-markdown'

interface MessageContentProps {
  content: string
  className?: string
}

interface CodeProps extends React.HTMLProps<HTMLElement> {
  inline?: boolean
}

export function MessageContent({ content, className = '' }: MessageContentProps) {
  const components: Components = {
    pre: ({ children, ...props }) => (
      <pre className="bg-gray-900 rounded-md p-4 overflow-x-auto" {...props}>
        {children}
      </pre>
    ),
    code: ({ inline, children, ...props }: CodeProps) => (
      inline 
        ? <code className="bg-gray-800 rounded px-1 py-0.5" {...props}>{children}</code>
        : <code {...props}>{children}</code>
    ),
    p: ({ children, ...props }) => (
      <p className="mb-4 last:mb-0" {...props}>{children}</p>
    ),
    ul: ({ children, ...props }) => (
      <ul className="list-disc list-inside mb-4" {...props}>{children}</ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="list-decimal list-inside mb-4" {...props}>{children}</ol>
    ),
    li: ({ children, ...props }) => (
      <li className="mb-1" {...props}>{children}</li>
    ),
    a: ({ children, ...props }) => (
      <a className="text-blue-400 hover:text-blue-300 underline" {...props}>{children}</a>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote className="border-l-4 border-gray-700 pl-4 italic" {...props}>{children}</blockquote>
    ),
    hr: ({ ...props }) => (
      <hr className="border-gray-700 my-4" {...props} />
    ),
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto">
        <table className="border-collapse table-auto w-full" {...props}>{children}</table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th className="border border-gray-700 px-4 py-2 bg-gray-800" {...props}>{children}</th>
    ),
    td: ({ children, ...props }) => (
      <td className="border border-gray-700 px-4 py-2" {...props}>{children}</td>
    ),
  }

  return (
    <ReactMarkdown
      className={`prose prose-invert max-w-none ${className}`}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight, rehypeRaw]}
      components={components}
    >
      {content}
    </ReactMarkdown>
  )
} 