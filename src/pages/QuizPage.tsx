import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle, XCircle, Trophy } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import MemphisShapes from '../components/MemphisShapes';
import { quizQuestions } from '../data/quizData';

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const question = quizQuestions[currentQuestion];

  const handleAnswer = (index: number) => {
    if (answered) return;
    
    setSelectedAnswer(index);
    setAnswered(true);
    
    if (index === question.correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setAnswered(false);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
  };

  if (showResult) {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    
    return (
      <div className="min-h-screen memphis-bg relative" style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FF6F61 100%)' }}>
        <MemphisShapes />
        
        <div className="relative z-10 container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="bg-white p-12 rounded-3xl shadow-2xl border-8 border-[#6B5B95] max-w-2xl w-full text-center"
          >
            <Trophy className="w-32 h-32 text-[#FFD700] mx-auto mb-6 pulse-animation" />
            
            <h2 className="text-6xl font-black text-[#FF6F61] mb-4">
              {t('congratulations')}!
            </h2>
            
            <div className="bg-[#F7CAC9] p-8 rounded-3xl mb-8 border-4 border-[#88B04B]">
              <p className="text-3xl font-bold text-[#6B5B95] mb-4">Your Score</p>
              <p className="text-8xl font-black text-[#FF6F61]">{percentage}%</p>
              <p className="text-2xl font-bold text-[#6B5B95] mt-4">
                {score} / {quizQuestions.length} correct
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRestart}
                className="px-8 py-4 rounded-2xl font-black text-xl shadow-xl bg-[#88B04B] text-white border-4 border-[#FFD700]"
              >
                {t('tryAgain')}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="px-8 py-4 rounded-2xl font-black text-xl shadow-xl bg-[#6B5B95] text-white border-4 border-[#FF6F61]"
              >
                {t('back')} Home
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen memphis-bg relative" style={{ background: 'linear-gradient(135deg, #F7CAC9 0%, #6B5B95 100%)' }}>
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

          <div className="bg-white px-8 py-4 rounded-3xl shadow-xl border-6 border-[#FFD700] transform rotate-1">
            <h1 className="text-4xl font-black text-[#6B5B95]">{t('takeQuiz')}</h1>
          </div>

          <div className="bg-white px-6 py-4 rounded-2xl shadow-xl border-4 border-[#88B04B]">
            <p className="text-2xl font-black text-[#88B04B]">
              {currentQuestion + 1}/{quizQuestions.length}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white p-4 rounded-3xl shadow-xl border-4 border-[#F7CAC9]">
            <div className="h-6 bg-[#F7CAC9] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                className="h-full bg-[#88B04B] rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white p-12 rounded-3xl shadow-2xl border-8 border-[#FF6F61] mb-8">
              <h2 className="text-4xl font-black text-[#6B5B95] mb-8">
                {question.question}
              </h2>

              <div className="space-y-4">
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === question.correctAnswer;
                  const showFeedback = answered;

                  let bgColor = 'bg-[#F7CAC9]';
                  let borderColor = 'border-[#6B5B95]';
                  let icon = null;

                  if (showFeedback) {
                    if (isCorrect) {
                      bgColor = 'bg-[#88B04B]';
                      borderColor = 'border-[#88B04B]';
                      icon = <CheckCircle className="w-8 h-8 text-white" />;
                    } else if (isSelected) {
                      bgColor = 'bg-[#FF6F61]';
                      borderColor = 'border-[#FF6F61]';
                      icon = <XCircle className="w-8 h-8 text-white" />;
                    }
                  }

                  return (
                    <motion.button
                      key={index}
                      whileHover={!answered ? { scale: 1.02, x: 10 } : {}}
                      whileTap={!answered ? { scale: 0.98 } : {}}
                      onClick={() => handleAnswer(index)}
                      disabled={answered}
                      className={`w-full p-6 rounded-2xl font-bold text-xl text-left shadow-xl border-6 transition-all flex items-center justify-between ${bgColor} ${borderColor} ${
                        answered ? 'cursor-not-allowed' : 'cursor-pointer hover:shadow-2xl'
                      }`}
                    >
                      <span className={showFeedback && (isCorrect || isSelected) ? 'text-white' : 'text-[#6B5B95]'}>
                        {option}
                      </span>
                      {icon}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Score Display */}
            <div className="text-center">
              <div className="bg-white inline-block px-12 py-6 rounded-3xl shadow-xl border-6 border-[#FFD700] transform -rotate-1">
                <p className="text-2xl font-black text-[#6B5B95]">
                  {t('score')}: {score} / {currentQuestion + (answered ? 1 : 0)}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizPage;
