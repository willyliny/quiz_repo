import React from 'react';
import { Trophy, Target, Clock, RotateCcw, ChevronRight, Share2 } from 'lucide-react';

interface QuizResultProps {
  totalQuestions: number;
  correctAnswers: number;
  answeredQuestions: Array<{
    questionId: number;
    isCorrect: boolean;
    timeSpent?: number;
  }>;
  onRestart: () => void;
  onSelectChapter: () => void;
}

const QuizResult: React.FC<QuizResultProps> = ({
  totalQuestions,
  correctAnswers,
  answeredQuestions,
  onRestart,
  onSelectChapter,
}) => {
  const score = Math.round((correctAnswers / totalQuestions) * 100);
  const accuracy = (correctAnswers / totalQuestions) * 100;

  const getGradeText = (score: number) => {
    if (score >= 90) return '優秀';
    if (score >= 80) return '良好';
    if (score >= 70) return '不錯';
    if (score >= 60) return '及格';
    return '需要加油';
  };

  const getGradeColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 80) return 'text-blue-500';
    if (score >= 70) return 'text-yellow-500';
    if (score >= 60) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-block p-4 bg-blue-50 rounded-full mb-4">
          <Trophy className="w-12 h-12 text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">章節完成！</h2>
        <p className="text-gray-600">讓我們來看看你的表現</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <div className="mb-2">
            <Target className="w-8 h-8 text-blue-500 mx-auto" />
          </div>
          <div className={`text-3xl font-bold mb-1 ${getGradeColor(score)}`}>
            {score}%
          </div>
          <div className="text-sm text-gray-600">總分</div>
          <div className={`text-lg font-medium mt-2 ${getGradeColor(score)}`}>
            {getGradeText(score)}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <div className="mb-2">
            <Target className="w-8 h-8 text-green-500 mx-auto" />
          </div>
          <div className="text-3xl font-bold mb-1 text-green-500">
            {correctAnswers}/{totalQuestions}
          </div>
          <div className="text-sm text-gray-600">答對題數</div>
          <div className="text-lg font-medium mt-2 text-green-500">
            {accuracy.toFixed(1)}% 正確率
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <div className="mb-2">
            <Clock className="w-8 h-8 text-purple-500 mx-auto" />
          </div>
          <div className="text-3xl font-bold mb-1 text-purple-500">
            {answeredQuestions.length}
          </div>
          <div className="text-sm text-gray-600">完成題數</div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">答題分析</h3>
        <div className="space-y-3">
          {answeredQuestions.map((question) => (
            <div
              key={question.questionId}
              className="flex items-center justify-between bg-gray-50 rounded-lg p-4"
            >
              <div className="flex items-center">
                <span className="text-gray-600 mr-4">題目 {question.questionId}</span>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    question.isCorrect
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {question.isCorrect ? '答對' : '答錯'}
                </span>
              </div>
              {question.timeSpent && (
                <span className="text-gray-500 text-sm">
                  耗時 {Math.round(question.timeSpent)}秒
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onRestart}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          重新開始
        </button>
        <button
          onClick={onSelectChapter}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
          選擇其他章節
        </button>
        <button
          onClick={() => {
            const shareText = `我在程式學習測驗中獲得了 ${score}分！\n正確率: ${accuracy.toFixed(
              1
            )}%\n答對: ${correctAnswers}/${totalQuestions} 題`;
            if (navigator.share) {
              navigator.share({
                title: '程式學習測驗結果',
                text: shareText,
              });
            } else {
              navigator.clipboard.writeText(shareText);
              alert('結果已複製到剪貼簿！');
            }
          }}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Share2 className="w-4 h-4" />
          分享結果
        </button>
      </div>
    </div>
  );
};

export default QuizResult;