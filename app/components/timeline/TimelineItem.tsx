'use client';

import { FC, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

interface TimelineItemProps {
  title: string;
  date: string;
  description: string;
  isLeft?: boolean;
  icon?: React.ReactNode;
  color?: string;
  isLast?: boolean;
  image?: string;
}

const TimelineItem: FC<TimelineItemProps> = ({
  title,
  date,
  description,
  isLeft = false,
  icon,
  image,
  color = '#3B82F6',
  isLast = false,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, amount: 0.3 });

  return (
    <div ref={itemRef} className={`timeline-item relative py-8 md:py-16 ${isLast ? 'pb-0' : ''}`}>
      {/* Center dot with icon */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 z-20 flex justify-center">
        <motion.div
          className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white dark:border-gray-800"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 20px ${color}70`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {icon || (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </motion.div>
      </div>

      {/* Date pill */}
      <motion.div
        className={`absolute ${isLeft ? 'right-[60%] md:right-[55%]' : 'left-[60%] md:left-[55%]'} top-2 z-10 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg border-2`}
        style={{ borderColor: color }}
        initial={{ opacity: 0, x: isLeft ? 20 : -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? 20 : -20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <span className="text-base font-bold" style={{ color }}>
          {date}
        </span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        {/* Content - alternates sides */}
        <motion.div
          className={`col-span-1 ${isLeft ? 'md:col-start-1' : 'md:col-start-2'}`}
          initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -30 : 30 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div
            className={`bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl border-t-4 border-l-4 ${isLeft ? 'md:text-right' : 'md:text-left'} hover:shadow-2xl transition-shadow duration-300`}
            style={{ borderColor: color, boxShadow: `0 4px 20px ${color}30` }}
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg">{description}</p>
            {image && <Image src={image} width={1000} height={1000} alt={title} />}
          </div>
        </motion.div>

        {/* Empty div for alternating layout */}
        <div className="hidden md:block"></div>
      </div>

      {/* Vertical connecting line with current icon color */}
      {!isLast && (
        <motion.div
          className="absolute left-[49.7%] top-14 w-1 h-[calc(100%-14px)] -translate-x-1/2 z-0"
          style={{
            background: `linear-gradient(to bottom, ${color} 0%, ${color} 80%, transparent 100%)`,
            boxShadow: `0 0 8px ${color}40`,
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={isInView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        />
      )}
    </div>
  );
};

export default TimelineItem;
