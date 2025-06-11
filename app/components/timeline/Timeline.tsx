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
}

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

const Timeline: FC<TimelineProps> = ({ events, className = '' }) => {
  return (
    <div className={`max-w-7xl mx-auto py-8 px-4 ${className}`}>
      {/* Timeline container with vertical line */}
      <div className="relative">
        {/* Background vertical line */}
        <div className="absolute left-1/2 top-0 bottom-0 -ml-0.5 w-0.5 bg-gray-200 dark:bg-gray-700"></div>

        {/* Timeline events */}
        <div className="relative space-y-12">
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
