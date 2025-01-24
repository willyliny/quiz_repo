"use client";

import { useState, useEffect } from 'react';
import QuizCard from './components/quiz/QuizCard';
import QuizResult from './components/quiz/QuizResult';
import { chapter3Questions } from './data/questions/Chapter3';
import { chapter4Questions } from './data/questions/Chapter4';

import { QuizQuestion } from './data/commonTypes';
import { BookOpen } from 'lucide-react';

const chapters: { [key: string]: QuizQuestion[] } = {
  'chapter3': chapter3Questions,
  'chapter4': chapter4Questions,
};

const getChapterName = (chapter: string): string => {
  const names: { [key: string]: string } = {
    'chapter3': '第三章：基礎概念',
    'chapter4': '第四章 : test',
  };
  return names[chapter] || chapter;
};

interface AnswerRecord {
  questionId: number;
  isCorrect: boolean;
  timeSpent: number;
}

export default function QuizPage() {
  const [currentChapter, setCurrentChapter] = useState<string>('chapter3');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [key, setKey] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<AnswerRecord[]>([]);
  const [startTime, setStartTime] = useState<number>(Date.now());

  const currentQuestions = chapters[currentChapter];
  const progress = ((currentIndex + 1) / currentQuestions.length) * 100;

  useEffect(() => {
    setStartTime(Date.now());
  }, [currentIndex]);

  const handleAnswerSubmit = (isCorrect: boolean) => {
    const timeSpent = (Date.now() - startTime) / 1000;
    setAnsweredQuestions(prev => [
      ...prev,
      {
        questionId: currentQuestions[currentIndex].id,
        isCorrect,
        timeSpent,
      },
    ]);
  };

  const handleNext = () => {
    console.log('Current Index:', currentIndex);
    console.log('Total Questions:', currentQuestions.length);
    
    if (currentIndex + 1 < currentQuestions.length) {
      setCurrentIndex(prev => prev + 1);
      setKey(prev => prev + 1);
    } else {
      console.log('Showing results...');
      setShowResults(true);
    }
  };

  const handleChapterChange = (chapter: string) => {
    setCurrentChapter(chapter);
    setCurrentIndex(0);
    setKey(prev => prev + 1);
    setShowResults(false);
    setAnsweredQuestions([]);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setKey(prev => prev + 1);
    setShowResults(false);
    setAnsweredQuestions([]);
  };

  const correctAnswers = answeredQuestions.filter(
    (record) => record.isCorrect
  ).length;

  console.log('Current State:', {
    currentIndex,
    totalQuestions: currentQuestions.length,
    showResults,
    answeredQuestions: answeredQuestions.length
  });

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <QuizResult
            totalQuestions={currentQuestions.length}
            correctAnswers={correctAnswers}
            answeredQuestions={answeredQuestions}
            onRestart={handleRestart}
            onSelectChapter={() => handleChapterChange(currentChapter)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-800">AP CSA - 學習測驗</h1>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <select 
              className="w-full p-3 border rounded-lg bg-white text-gray-700 cursor-pointer hover:border-blue-500 transition-colors"
              value={currentChapter}
              onChange={(e) => handleChapterChange(e.target.value)}
            >
              {Object.keys(chapters).map((chapter) => (
                <option key={chapter} value={chapter}>
                  {getChapterName(chapter)}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white rounded-lg shadow p-4 mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">進度</span>
              <span className="text-sm font-medium text-blue-600">
                {currentIndex + 1} / {currentQuestions.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <QuizCard 
          key={key}
          question={currentQuestions[currentIndex]} 
          onNext={handleNext}
          onAnswerSubmit={handleAnswerSubmit}
          isLastQuestion={currentIndex === currentQuestions.length - 1}
        />
      </div>
    </div>
  );
}