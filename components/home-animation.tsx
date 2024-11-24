'use client'

import { motion } from 'framer-motion'
import { features } from '@/lib/features'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export function HomeAnimation() {
  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-6">
          编程学习助手
        </h1>
        <p className="text-gray-300 text-xl mb-8 max-w-2xl">
          专为大学生打造的智能编程学习平台，让AI助你掌握编程技能，探索人工智能的奥秘
        </p>
        <Link 
          href="/chat"
          className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
        >
          开始学习
          <ArrowRightIcon className="w-5 h-5 ml-2" />
        </Link>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl"
      >
        {features.map((feature, index) => (
          <div 
            key={index}
            className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700"
          >
            <feature.icon className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </div>
        ))}
      </motion.div>
    </>
  )
} 