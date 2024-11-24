import React from 'react'

interface FeatureIconProps {
  className?: string
}

export const features = [
  {
    title: '实时对话',
    description: '基于最新的AI技术,提供流畅的实时对话体验',
    icon: React.forwardRef<SVGSVGElement, FeatureIconProps>(({ className }, ref) => (
      <svg ref={ref} className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ))
  },
  {
    title: '多场景支持',
    description: '支持多种对话场景,满足不同需求',
    icon: React.forwardRef<SVGSVGElement, FeatureIconProps>(({ className }, ref) => (
      <svg ref={ref} className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ))
  },
  {
    title: '安全可靠',
    description: '采用先进的安全技术,保护您的隐私数据',
    icon: React.forwardRef<SVGSVGElement, FeatureIconProps>(({ className }, ref) => (
      <svg ref={ref} className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ))
  },
] 