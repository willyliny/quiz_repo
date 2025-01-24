"use client";

import React from 'react';
import type { FC } from 'react';
import CodeBlock from './CodeBlock';

interface OptionsProps {
  options: Array<{
    text: string;
    code?: {
      content: string;
      language: string;
    };
  }>;
  onSelect: (index: number) => void;
  selectedAnswer: number | null;
  showResult: boolean;
  isCorrect: boolean;
}

const Options: FC<OptionsProps> = ({
  options,
  onSelect,
  selectedAnswer,
  showResult,
  isCorrect,
}) => {
  return (
    <div className="space-y-3">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          disabled={showResult}
          className={`w-full p-3 text-left rounded-lg border transition-colors
            ${
              selectedAnswer === index
                ? showResult
                  ? isCorrect
                    ? "bg-green-100 border-green-500 text-green-700"
                    : "bg-red-100 border-red-500 text-red-700"
                  : "bg-blue-100 border-blue-500 text-blue-700"
                : "bg-white hover:bg-gray-50 border-gray-200 text-gray-900"
            }`}
        >
          <div>
            <p className="whitespace-pre-wrap">{option.text}</p>
            {option.code && (
              <CodeBlock
                code={option.code.content}
                language={option.code.language}
                className="mt-2"
              />
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default Options;