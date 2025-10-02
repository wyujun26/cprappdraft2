import React from 'react';
import { motion } from 'framer-motion';

const MemphisShapes: React.FC = () => {
  const shapes = [
    { type: 'circle', color: '#FF6F61', size: 80, top: '10%', left: '5%' },
    { type: 'triangle', color: '#FFD700', size: 100, top: '20%', right: '10%' },
    { type: 'square', color: '#88B04B', size: 60, bottom: '15%', left: '8%' },
    { type: 'circle', color: '#F7CAC9', size: 120, top: '60%', right: '5%' },
    { type: 'zigzag', color: '#6B5B95', size: 90, bottom: '25%', right: '15%' },
    { type: 'circle', color: '#FFD700', size: 70, top: '40%', left: '15%' },
    { type: 'triangle', color: '#FF6F61', size: 85, bottom: '40%', left: '20%' },
    { type: 'square', color: '#88B04B', size: 75, top: '75%', left: '40%' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          style={{
            position: 'absolute',
            width: shape.size,
            height: shape.size,
            top: shape.top,
            left: shape.left,
            right: shape.right,
            bottom: shape.bottom,
          }}
          className="float-animation"
        >
          {shape.type === 'circle' && (
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                backgroundColor: shape.color,
              }}
            />
          )}
          {shape.type === 'triangle' && (
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: `${shape.size / 2}px solid transparent`,
                borderRight: `${shape.size / 2}px solid transparent`,
                borderBottom: `${shape.size}px solid ${shape.color}`,
              }}
            />
          )}
          {shape.type === 'square' && (
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: shape.color,
                transform: 'rotate(45deg)',
              }}
            />
          )}
          {shape.type === 'zigzag' && (
            <svg width={shape.size} height={shape.size} viewBox="0 0 100 100">
              <path
                d="M 0 50 L 25 25 L 50 50 L 75 25 L 100 50"
                stroke={shape.color}
                strokeWidth="8"
                fill="none"
              />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default MemphisShapes;
