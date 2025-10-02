import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'zh' | 'ms' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    appTitle: 'CPR Training',
    subtitle: 'Singapore SRFAC Guidelines',
    startLearning: 'Start Learning',
    practice: 'Practice Mode',
    takeQuiz: 'Take Quiz',
    selectLanguage: 'Select Language',
    adultCPR: 'Adult CPR',
    childCPR: 'Child CPR',
    infantCPR: 'Infant CPR',
    aed: 'AED Usage',
    choking: 'Choking Relief',
    back: 'Back',
    next: 'Next',
    complete: 'Complete',
    score: 'Score',
    tryAgain: 'Try Again',
    congratulations: 'Congratulations!',
    step: 'Step',
    compressions: 'Compressions',
    breaths: 'Breaths',
    rate: 'Rate',
    depth: 'Depth',
    ratio: 'Ratio',
  },
  zh: {
    appTitle: '心肺复苏训练',
    subtitle: '新加坡复苏与急救理事会指南',
    startLearning: '开始学习',
    practice: '练习模式',
    takeQuiz: '参加测验',
    selectLanguage: '选择语言',
    adultCPR: '成人心肺复苏',
    childCPR: '儿童心肺复苏',
    infantCPR: '婴儿心肺复苏',
    aed: '自动体外除颤器使用',
    choking: '窒息救援',
    back: '返回',
    next: '下一步',
    complete: '完成',
    score: '分数',
    tryAgain: '再试一次',
    congratulations: '恭喜！',
    step: '步骤',
    compressions: '按压',
    breaths: '呼吸',
    rate: '速率',
    depth: '深度',
    ratio: '比例',
  },
  ms: {
    appTitle: 'Latihan CPR',
    subtitle: 'Garis Panduan SRFAC Singapura',
    startLearning: 'Mula Belajar',
    practice: 'Mod Latihan',
    takeQuiz: 'Ambil Kuiz',
    selectLanguage: 'Pilih Bahasa',
    adultCPR: 'CPR Dewasa',
    childCPR: 'CPR Kanak-kanak',
    infantCPR: 'CPR Bayi',
    aed: 'Penggunaan AED',
    choking: 'Bantuan Tercekik',
    back: 'Kembali',
    next: 'Seterusnya',
    complete: 'Selesai',
    score: 'Skor',
    tryAgain: 'Cuba Lagi',
    congratulations: 'Tahniah!',
    step: 'Langkah',
    compressions: 'Mampatan',
    breaths: 'Nafas',
    rate: 'Kadar',
    depth: 'Kedalaman',
    ratio: 'Nisbah',
  },
  ta: {
    appTitle: 'CPR பயிற்சி',
    subtitle: 'சிங்கப்பூர் SRFAC வழிகாட்டுதல்கள்',
    startLearning: 'கற்றல் தொடங்கு',
    practice: 'பயிற்சி முறை',
    takeQuiz: 'வினாடி வினா எடு',
    selectLanguage: 'மொழியைத் தேர்ந்தெடு',
    adultCPR: 'வயது வந்தோர் CPR',
    childCPR: 'குழந்தை CPR',
    infantCPR: 'குழந்தை CPR',
    aed: 'AED பயன்பாடு',
    choking: 'மூச்சுத்திணறல் நிவாரணம்',
    back: 'பின்',
    next: 'அடுத்து',
    complete: 'முடிந்தது',
    score: 'மதிப்பெண்',
    tryAgain: 'மீண்டும் முயற்சி',
    congratulations: 'வாழ்த்துக்கள்!',
    step: 'படி',
    compressions: 'அழுத்தங்கள்',
    breaths: 'மூச்சுகள்',
    rate: 'விகிதம்',
    depth: 'ஆழம்',
    ratio: 'விகிதம்',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
