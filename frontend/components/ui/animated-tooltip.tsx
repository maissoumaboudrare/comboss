"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TooltipProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  left: string;
}

export const AnimatedTooltip = ({ trigger, content, left }: TooltipProps) => {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div>{trigger}</div>
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.6 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.6 }}
            className={`absolute ${left} transform -translate-x-1/2 mt-4 flex items-center justify-center rounded-md bg-primary text-white px-4 py-2`}
          >
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-primary"></div>
            </div>
            {content}
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
};