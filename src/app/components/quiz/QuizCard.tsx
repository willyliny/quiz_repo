"use client";

import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import CodeBlock from './CodeBlock';
import Options from './Options';
import type { QuizQuestion } from '../../data/commonTypes';

interface QuizCardProps {
  question: QuizQuestion;
  onNext?: () => void;
  onAnswerSubmit?: (isCorrect: boolean) => void;
  isLastQuestion?: boolean;
}

const QuizCard: React.FC<QuizCardProps> = ({ 
  question,
  onNext,
  onAnswerSubmit,
  isLastQuestion
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [activeTab, setActiveTab] = useState<'EN' | 'CN'>('EN');

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowResult(true);
    onAnswerSubmit?.(index === question.correctAnswer);
  };

  const handleNextClick = () => {
    console.log('Next button clicked');
    console.log('Is last question:', isLastQuestion);
    if (onNext) {
      onNext();
    }
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  const renderQuestion = () => {
    if (typeof question.question === 'string') {
      return <p className="text-lg text-gray-700 mb-4">{question.question}</p>;
    }
    
    return (
      <div className="mb-4">
        <p className="text-lg text-gray-700">{question.question.text}</p>
        {question.question.code && (
          <CodeBlock
            code={question.question.code.content}
            language={question.question.code.language}
            className="mt-4"
          />
        )}
      </div>
    );
  };

  const renderExplanation = () => {
    if (!showResult) return null;

    return (
      <div className="mt-6">
        <div className="flex gap-2 mb-4">
          {question.explanationEN && (
            <button
              onClick={() => setActiveTab('EN')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'EN' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              English
            </button>
          )}
          {question.explanationCN && (
            <button
              onClick={() => setActiveTab('CN')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'CN' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              中文
            </button>
          )}
        </div>
        
        <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
          {activeTab === 'EN' && question.explanationEN && (
            <p className="text-blue-800 leading-relaxed">{question.explanationEN}</p>
          )}
          {activeTab === 'CN' && question.explanationCN && (
            <p className="text-blue-800 leading-relaxed">{question.explanationCN}</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Question {question.id}
          </span>
          <h2 className="text-2xl font-bold text-gray-800">程式測驗</h2>
        </div>
        {renderQuestion()}
        {question.code && (
          <CodeBlock 
            code={question.code} 
            language={question.language}
            className="shadow-sm" 
          />
        )}
      </div>

      <Options
        options={question.options}
        onSelect={handleAnswerSelect}
        selectedAnswer={selectedAnswer}
        showResult={showResult}
        isCorrect={isCorrect}
      />

      {showResult && (
        <>
          <div className={`mt-6 p-4 rounded-lg flex items-center gap-3
            ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
          >
            {isCorrect ? (
              <>
                <Check className="w-6 h-6" />
                <span className="font-medium">答對了！做得好！</span>
              </>
            ) : (
              <>
                <X className="w-6 h-6" />
                <span className="font-medium">繼續努力！讓我們看看正確答案。</span>
              </>
            )}
          </div>

          {renderExplanation()}

          {!isLastQuestion ? (
            <button
              onClick={handleNextClick}
              className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 font-medium"
            >
              下一題
            </button>
          ) : (
            <button
              onClick={handleNextClick}
              className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 font-medium"
            >
              完成測驗
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default QuizCard;