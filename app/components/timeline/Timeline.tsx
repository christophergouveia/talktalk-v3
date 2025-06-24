'use client';

import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import TimelineItem from './TimelineItem';

export interface TimelineEvent {
  title: string;
  date: string;
  description: string;
  icon?: ReactNode;
  color?: string;
  image?: string;
  imageAlt?: string;
}

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

const Timeline: FC<TimelineProps> = ({ events, className = '' }) => {  return (
    <div className={`max-w-7xl mx-auto py-4 sm:py-8 px-2 sm:px-4 ${className}`}>      {/* Timeline container */}
      <div className="relative">
        {/* Timeline start decoration */}
        <motion.div
          className="absolute left-4 sm:left-1/2 top-0 w-4 h-4 sm:w-6 sm:h-6 sm:-translate-x-1/2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-600 shadow-lg border-2 sm:border-4 border-white dark:border-gray-900 z-30"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 to-secondary-600 animate-ping opacity-20" />
        </motion.div>        {/* Timeline end decoration */}
        <motion.div
          className="absolute left-4 sm:left-1/2 bottom-0 w-6 h-6 sm:w-8 sm:h-8 sm:-translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500 to-primary-600 shadow-lg border-2 sm:border-4 border-white dark:border-gray-900 z-30 flex items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          {/* Star icon for completion */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 sm:h-4 sm:w-4 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-blue-600 animate-pulse opacity-30" />
        </motion.div>        {/* Timeline events */}
        <div className="relative space-y-6 sm:space-y-12 pt-4 sm:pt-8 pb-4 sm:pb-8">
          {events.map((event, index) => (
            <motion.div
              key={`${event.title}-${index}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6 }}
            >
              <TimelineItem
                title={event.title}
                date={event.date}
                description={event.description}
                icon={event.icon}
                isLeft={index % 2 === 0}
                color={event.color || '#3B82F6'}
                image={event.image}
                imageAlt={event.imageAlt}
                isLast={index === events.length - 1}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
