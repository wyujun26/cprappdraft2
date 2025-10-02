import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ms', name: 'Melayu', flag: '🇲🇾' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  ];

  return (
    <div className="bg-white p-6 rounded-3xl shadow-2xl border-6 border-[#6B5B95]">
      <div className="flex items-center gap-3 mb-4">
        <Globe className="w-8 h-8 text-[#FF6F61]" />
        <h3 className="text-2xl font-black text-[#6B5B95]">{t('selectLanguage')}</h3>
      </div>
      
      <div className="flex gap-3">
        {languages.map((lang) => (
          <motion.button
            key={lang.code}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setLanguage(lang.code as any)}
            className={`px-6 py-3 rounded-2xl font-bold text-lg shadow-lg border-4 transition-all ${
              language === lang.code
                ? 'bg-[#FF6F61] text-white border-[#FFD700]'
                : 'bg-[#F7CAC9] text-[#6B5B95] border-[#88B04B] hover:bg-[#88B04B] hover:text-white'
            }`}
          >
            <span className="text-2xl mr-2">{lang.flag}</span>
            {lang.name}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
