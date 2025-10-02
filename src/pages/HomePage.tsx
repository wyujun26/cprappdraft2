import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, BookOpen, Target, Award, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import MemphisShapes from '../components/MemphisShapes';
import LanguageSelector from '../components/LanguageSelector';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const lessons = [
    { id: 'adult', title: t('adultCPR'), icon: '👨', color: '#FF6F61' },
    { id: 'child', title: t('childCPR'), icon: '👦', color: '#6B5B95' },
    { id: 'infant', title: t('infantCPR'), icon: '👶', color: '#88B04B' },
    { id: 'aed', title: t('aed'), icon: '⚡', color: '#F7CAC9' },
    { id: 'choking', title: t('choking'), icon: '🫁', color: '#FFD700' },
  ];

  return (
    <div className="min-h-screen memphis-bg relative" style={{ background: 'linear-gradient(135deg, #FF6F61 0%, #6B5B95 50%, #88B04B 100%)' }}>
      <MemphisShapes />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-white p-6 rounded-3xl shadow-2xl transform rotate-2 mb-6">
            <Heart className="w-20 h-20 text-[#FF6F61] mx-auto pulse-animation" fill="#FF6F61" />
          </div>
          
          <h1 className="text-7xl font-black text-white mb-4 drop-shadow-lg" style={{ fontFamily: 'Fredoka' }}>
            {t('appTitle')}
          </h1>
          
          <div className="bg-[#FFD700] inline-block px-8 py-3 rounded-full transform -rotate-1 shadow-xl">
            <p className="text-2xl font-bold text-[#6B5B95]">{t('subtitle')}</p>
          </div>
        </motion.div>

        {/* Language Selector */}
        <div className="flex justify-center mb-12">
          <LanguageSelector />
        </div>

        {/* Main Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          <motion.button
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/lesson/adult')}
            className="bg-white p-8 rounded-3xl shadow-2xl border-8 border-[#FF6F61] transform hover:rotate-2 transition-all"
          >
            <BookOpen className="w-16 h-16 text-[#FF6F61] mx-auto mb-4" />
            <h3 className="text-3xl font-black text-[#6B5B95] mb-2">{t('startLearning')}</h3>
            <div className="w-full h-3 bg-[#F7CAC9] rounded-full mt-4"></div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/practice')}
            className="bg-white p-8 rounded-3xl shadow-2xl border-8 border-[#88B04B] transform hover:-rotate-2 transition-all"
          >
            <Target className="w-16 h-16 text-[#88B04B] mx-auto mb-4" />
            <h3 className="text-3xl font-black text-[#6B5B95] mb-2">{t('practice')}</h3>
            <div className="w-full h-3 bg-[#88B04B] rounded-full mt-4"></div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/quiz')}
            className="bg-white p-8 rounded-3xl shadow-2xl border-8 border-[#FFD700] transform hover:rotate-2 transition-all"
          >
            <Award className="w-16 h-16 text-[#FFD700] mx-auto mb-4" />
            <h3 className="text-3xl font-black text-[#6B5B95] mb-2">{t('takeQuiz')}</h3>
            <div className="w-full h-3 bg-[#FFD700] rounded-full mt-4"></div>
          </motion.button>
        </div>

        {/* Lesson Cards */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black text-white text-center mb-8 drop-shadow-lg">
            Choose Your Lesson
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                onClick={() => navigate(`/lesson/${lesson.id}`)}
                className="bg-white p-8 rounded-3xl shadow-2xl cursor-pointer transform transition-all border-6"
                style={{ borderColor: lesson.color, borderWidth: '6px' }}
              >
                <div className="text-7xl mb-4 text-center float-animation">{lesson.icon}</div>
                <h3 className="text-2xl font-black text-center" style={{ color: lesson.color }}>
                  {lesson.title}
                </h3>
                <div className="mt-4 h-2 rounded-full" style={{ backgroundColor: lesson.color }}></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-white inline-block px-12 py-6 rounded-3xl shadow-2xl transform -rotate-1">
            <p className="text-xl font-bold text-[#6B5B95]">
              ⚠️ Based on Singapore Resuscitation & First Aid Council Guidelines
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
