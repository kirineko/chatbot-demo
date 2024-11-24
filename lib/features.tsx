import React from 'react'

interface FeatureIconProps {
  className?: string
}

const MessageIcon = React.forwardRef<SVGSVGElement, FeatureIconProps>(function MessageIcon({ className }, ref) {
  return (
    <svg ref={ref} className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
})

const BrainIcon = React.forwardRef<SVGSVGElement, FeatureIconProps>(function BrainIcon({ className }, ref) {
  return (
    <svg ref={ref} className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  )
})

const PracticeIcon = React.forwardRef<SVGSVGElement, FeatureIconProps>(function PracticeIcon({ className }, ref) {
  return (
    <svg ref={ref} className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
})

export const features = [
  {
    title: '编程学习助手',
    description: '通过交互式对话，帮助你理解编程概念，掌握代码技巧，提升开发能力',
    icon: MessageIcon
  },
  {
    title: 'AI技术探索',
    description: '深入浅出地讲解人工智能知识，带你了解前沿技术，启发创新思维',
    icon: BrainIcon
  },
  {
    title: '实践与反馈',
    description: '提供丰富的代码示例和实践建议，帮助你把理论转化为实际编程能力',
    icon: PracticeIcon
  },
] 