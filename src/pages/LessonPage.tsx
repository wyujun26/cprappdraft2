import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import MemphisShapes from '../components/MemphisShapes';
import { lessonData } from '../data/lessonData';

const LessonPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);

  const lesson = lessonData[id as keyof typeof lessonData];

  if (!lesson) {
    return <div>Lesson not found</div>;
  }

  const handleNext = () => {
    if (currentStep < lesson.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/');
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = lesson.steps[currentStep];

  return (
    <div className="min-h-screen memphis-bg relative" style={{ background: 'linear-gradient(135deg, #88B04B 0%, #FF6F61 100%)' }}>
      <MemphisShapes />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/')}
            className="bg-white p-4 rounded-2xl shadow-xl border-4 border-[#6B5B95]"
          >
            <ArrowLeft className="w-8 h-8 text-[#6B5B95]" />
          </motion.button>

          <div className="bg-white px-8 py-4 rounded-3xl shadow-xl border-6 border-[#FFD700] transform rotate-1">
            <h1 className="text-4xl font-black text-[#6B5B95]">{lesson.title}</h1>
          </div>

          <div className="w-16"></div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white p-4 rounded-3xl shadow-xl border-4 border-[#F7CAC9]">
            <div className="flex justify-between mb-2">
              {lesson.steps.map((_, index) => (
                <div
                  key={index}
                  className={`flex-1 h-4 mx-1 rounded-full transition-all ${
                    index <= currentStep ? 'bg-[#FF6F61]' : 'bg-[#F7CAC9]'
                  }`}
                />
              ))}
            </div>
            <p className="text-center text-xl font-bold text-[#6B5B95]">
              {t('step')} {currentStep + 1} / {lesson.steps.length}
            </p>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-[#6B5B95]">
              {/* Image */}
              <div className="relative h-96 bg-gradient-to-br from-[#F7CAC9] to-[#88B04B] overflow-hidden">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#FFD700] px-6 py-3 rounded-2xl shadow-xl transform -rotate-2">
                  <p className="text-2xl font-black text-[#6B5B95]">
                    {t('step')} {currentStep + 1}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h2 className="text-4xl font-black text-[#FF6F61] mb-6">{step.title}</h2>
                
                <div className="space-y-4 mb-8">
                  {step.description.map((desc, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 bg-[#F7CAC9] p-4 rounded-2xl"
                    >
                      <CheckCircle className="w-6 h-6 text-[#88B04B] flex-shrink-0 mt-1" />
                      <p className="text-xl text-[#6B5B95] font-semibold">{desc}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Key Points */}
                {step.keyPoints && (
                  <div className="bg-[#FFD700] p-6 rounded-3xl mb-8 border-4 border-[#FF6F61]">
                    <h3 className="text-2xl font-black text-[#6B5B95] mb-4">⚠️ Key Points</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {Object.entries(step.keyPoints).map(([key, value]) => (
                        <div key={key} className="bg-white p-4 rounded-2xl">
                          <p className="text-lg font-bold text-[#FF6F61] mb-1">{key}</p>
                          <p className="text-2xl font-black text-[#6B5B95]">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between items-center">
                  <motion.button
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className={`px-8 py-4 rounded-2xl font-black text-xl shadow-xl border-4 ${
                      currentStep === 0
                        ? 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed'
                        : 'bg-[#6B5B95] text-white border-[#FF6F61] hover:bg-[#5a4a7d]'
                    }`}
                  >
                    ← {t('back')}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNext}
                    className="px-8 py-4 rounded-2xl font-black text-xl shadow-xl bg-[#FF6F61] text-white border-4 border-[#FFD700] hover:bg-[#e55a4d]"
                  >
                    {currentStep === lesson.steps.length - 1 ? t('complete') : t('next')} →
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LessonPage;
