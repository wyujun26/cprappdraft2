import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import MemphisShapes from '../components/MemphisShapes';

const PracticePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isActive, setIsActive] = useState(false);
  const [compressions, setCompressions] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [timer, setTimer] = useState(0);

  const targetRate = 100; // 100-120 compressions per minute
  const targetDepth = '5-6 cm';
  const compressionRatio = '30:2';

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const handleCompression = () => {
    if (isActive) {
      setCompressions((prev) => {
        const newCount = prev + 1;
        if (newCount % 30 === 0) {
          setCycles((c) => c + 1);
        }
        return newCount;
      });
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setCompressions(0);
    setCycles(0);
    setTimer(0);
  };

  const currentRate = timer > 0 ? Math.round((compressions / timer) * 60) : 0;

  return (
    <div className="min-h-screen memphis-bg relative" style={{ background: 'linear-gradient(135deg, #6B5B95 0%, #88B04B 100%)' }}>
      <MemphisShapes />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/')}
            className="bg-white p-4 rounded-2xl shadow-xl border-4 border-[#FF6F61]"
          >
            <ArrowLeft className="w-8 h-8 text-[#FF6F61]" />
          </motion.button>

          <div className="bg-white px-8 py-4 rounded-3xl shadow-xl border-6 border-[#FFD700] transform -rotate-1">
            <h1 className="text-4xl font-black text-[#6B5B95]">{t('practice')}</h1>
          </div>

          <div className="w-16"></div>
        </div>

        {/* Main Practice Area */}
        <div className="max-w-4xl mx-auto">
          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="bg-white p-6 rounded-3xl shadow-xl border-6 border-[#FF6F61]"
            >
              <p className="text-lg font-bold text-[#6B5B95] mb-2">{t('compressions')}</p>
              <p className="text-5xl font-black text-[#FF6F61]">{compressions}</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              className="bg-white p-6 rounded-3xl shadow-xl border-6 border-[#88B04B]"
            >
              <p className="text-lg font-bold text-[#6B5B95] mb-2">Cycles</p>
              <p className="text-5xl font-black text-[#88B04B]">{cycles}</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="bg-white p-6 rounded-3xl shadow-xl border-6 border-[#FFD700]"
            >
              <p className="text-lg font-bold text-[#6B5B95] mb-2">{t('rate')}</p>
              <p className="text-5xl font-black text-[#FFD700]">{currentRate}</p>
              <p className="text-sm font-bold text-[#6B5B95]">per min</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              className="bg-white p-6 rounded-3xl shadow-xl border-6 border-[#F7CAC9]"
            >
              <p className="text-lg font-bold text-[#6B5B95] mb-2">Time</p>
              <p className="text-5xl font-black text-[#F7CAC9]">{timer}s</p>
            </motion.div>
          </div>

          {/* Compression Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-12 rounded-3xl shadow-2xl border-8 border-[#FF6F61] mb-8"
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleCompression}
              disabled={!isActive}
              className={`w-full h-96 rounded-3xl font-black text-6xl shadow-2xl transition-all ${
                isActive
                  ? 'bg-[#FF6F61] text-white border-8 border-[#FFD700] cursor-pointer hover:bg-[#e55a4d]'
                  : 'bg-gray-300 text-gray-500 border-8 border-gray-400 cursor-not-allowed'
              }`}
            >
              {isActive ? '👐 PRESS HERE' : '▶️ START FIRST'}
            </motion.button>

            <div className="mt-6 text-center">
              <p className="text-2xl font-bold text-[#6B5B95]">
                {compressions % 30 === 0 && compressions > 0
                  ? '🫁 Give 2 Rescue Breaths!'
                  : `${30 - (compressions % 30)} compressions until breaths`}
              </p>
            </div>
          </motion.div>

          {/* Guidelines */}
          <div className="bg-[#FFD700] p-8 rounded-3xl shadow-xl border-6 border-[#6B5B95] mb-8">
            <h3 className="text-3xl font-black text-[#6B5B95] mb-6 text-center">
              📋 SRFAC Guidelines
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-2xl text-center">
                <p className="text-xl font-bold text-[#FF6F61] mb-2">{t('rate')}</p>
                <p className="text-3xl font-black text-[#6B5B95]">100-120</p>
                <p className="text-lg font-semibold text-[#6B5B95]">per minute</p>
              </div>
              <div className="bg-white p-6 rounded-2xl text-center">
                <p className="text-xl font-bold text-[#88B04B] mb-2">{t('depth')}</p>
                <p className="text-3xl font-black text-[#6B5B95]">{targetDepth}</p>
                <p className="text-lg font-semibold text-[#6B5B95]">for adults</p>
              </div>
              <div className="bg-white p-6 rounded-2xl text-center">
                <p className="text-xl font-bold text-[#F7CAC9] mb-2">{t('ratio')}</p>
                <p className="text-3xl font-black text-[#6B5B95]">{compressionRatio}</p>
                <p className="text-lg font-semibold text-[#6B5B95]">comp:breaths</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsActive(!isActive)}
              className={`px-12 py-6 rounded-2xl font-black text-2xl shadow-xl border-6 flex items-center gap-3 ${
                isActive
                  ? 'bg-[#FF6F61] text-white border-[#FFD700]'
                  : 'bg-[#88B04B] text-white border-[#6B5B95]'
              }`}
            >
              {isActive ? (
                <>
                  <Pause className="w-8 h-8" /> Pause
                </>
              ) : (
                <>
                  <Play className="w-8 h-8" /> Start
                </>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="px-12 py-6 rounded-2xl font-black text-2xl shadow-xl bg-[#6B5B95] text-white border-6 border-[#F7CAC9] flex items-center gap-3"
            >
              <RotateCcw className="w-8 h-8" /> Reset
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticePage;
