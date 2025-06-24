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
  imageAlt?: string;
}

const TimelineItem: FC<TimelineItemProps> = ({
  title,
  date,
  description,
  isLeft = false,
  icon,
  image,
  imageAlt,
  color = '#3B82F6',
  isLast = false,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, amount: 0.3 });
  return (
    <div ref={itemRef} className={`timeline-item relative py-4 sm:py-8 md:py-16 ${isLast ? 'pb-0' : ''}`}>
      {/* Center dot with icon - responsive positioning */}
      <div className="absolute left-4 sm:left-1/2 top-0 sm:-translate-x-1/2 z-20 flex justify-center">
        <motion.div
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white shadow-lg border-2 sm:border-4 border-white dark:border-gray-800"
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
              className="h-5 w-5 sm:h-7 sm:w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </motion.div>
      </div>      {/* Date pill - responsive positioning */}
      <motion.div
        className={`absolute ${
          isLeft 
            ? 'left-20 sm:right-[60%] md:right-[55%]' 
            : 'left-20 sm:left-[60%] md:left-[55%]'
        } top-1 sm:top-2 z-10 bg-white dark:bg-gray-800 px-2 sm:px-4 py-1 sm:py-2 rounded-full shadow-lg border-2`}
        style={{ borderColor: color }}
        initial={{ opacity: 0, x: isLeft ? 20 : -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? 20 : -20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <span className="text-xs sm:text-base font-bold" style={{ color }}>
          {date}
        </span>
      </motion.div><div className="grid grid-cols-2 gap-4 lg:gap-6 relative">
        {/* Content - alternates sides */}
        <motion.div
          className={`col-span-1 ${isLeft ? 'lg:col-start-1 order-1' : 'lg:col-start-2 order-2'}`}
          initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -30 : 30 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        ><div
            className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-t-4 border-l-4 ${isLeft ? 'lg:text-right' : 'lg:text-left'} hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:scale-[1.02]`}
            style={{ borderColor: color, boxShadow: `0 4px 20px ${color}30` }}
          >            {/* Content Section */}
            <div className="p-4 lg:p-6 xl:p-8">              <motion.h3 
                className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-3 lg:mb-4 text-gray-800 dark:text-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {title}
              </motion.h3>
              
              <motion.p 
                className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {description}
              </motion.p>
              
              {/* Decorative accent */}
              <motion.div
                className="mt-6 h-1 rounded-full opacity-20"
                style={{ backgroundColor: color }}
                initial={{ width: 0 }}
                animate={isInView ? { width: '100%' } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              />
            </div>
          </div>
        </motion.div>        {/* Image on opposite side - always visible on all screen sizes */}
        {image && (
          <motion.div
            className={`col-span-1 ${isLeft ? 'lg:col-start-2 order-2' : 'lg:col-start-1 order-1'}`}
            initial={{ opacity: 0, x: isLeft ? 30 : -30, scale: 0.9 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: isLeft ? 30 : -30, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative group">
              {/* Background decoration */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-20 blur-xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"
                style={{ backgroundColor: color }}
              />              {/* Main image container */}
              <div className="relative bg-white dark:bg-gray-800 p-2 lg:p-3 rounded-2xl shadow-xl transform group-hover:rotate-2 transition-transform duration-500">
                <div className="relative h-32 sm:h-40 lg:h-56 rounded-xl overflow-hidden"><Image 
                    src={image} 
                    width={600} 
                    height={500} 
                    alt={imageAlt || title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  
                  {/* Floating icon */}
                  <div 
                    className="absolute top-4 left-4 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg"
                    style={{ backgroundColor: color }}
                  >
                    {icon || (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Empty div for alternating layout when no image */}
        {!image && <div className="hidden md:block"></div>}
      </div>      {/* Vertical connecting line with current icon color */}
      {!isLast && (
        <motion.div
          className="absolute left-1/2 top-16 w-1 h-[calc(100%-64px)] -translate-x-1/2 z-0"
          style={{
            background: `linear-gradient(to bottom, ${color} 0%, ${color} 80%, transparent 100%)`,
            boxShadow: `0 0 8px ${color}40`,
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={isInView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        />
      )}
      
      {/* Linha para o último item - conecta até a decoração final */}
      {isLast && (
        <motion.div
          className="absolute left-1/2 top-16 w-1 h-[calc(100%+32px)] -translate-x-1/2 z-0"
          style={{
            background: `linear-gradient(to bottom, ${color} 0%, ${color} 70%, transparent 100%)`,
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
