import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { scoresApi } from "../api/api";

interface Score {
  highestScore: number;
  testId: string;
}

export const ScoresUI: React.FC = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        if (courseId) {
          const data = await scoresApi.getCourseScores(courseId);
          setScores(data);
        }
      } catch (error) {
        console.error('Error fetching scores:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, [courseId]);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary-100 to-primary-50 rounded-bl-full opacity-50 -z-10" />
          
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Course Progress</h1>
            <button
              onClick={() => navigate(`/course/${courseId}`)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Course
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
          ) : scores.length > 0 ? (
            <div className="space-y-8">
              {/* Overall Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 shadow-sm hover:shadow transition-shadow">
                  <div className="text-sm text-emerald-600 mb-1 font-medium">Average Score</div>
                  <div className="text-3xl font-bold text-emerald-700">
                    {Math.round(scores.reduce((acc, score) => acc + score.highestScore, 0) / scores.length)}%
                  </div>
                </div>
                <div className="bg-gradient-to-br from-violet-50 to-violet-100 rounded-xl p-6 shadow-sm hover:shadow transition-shadow">
                  <div className="text-sm text-violet-600 mb-1 font-medium">Tests Attempted</div>
                  <div className="text-3xl font-bold text-violet-700">{scores.length}</div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 shadow-sm hover:shadow transition-shadow">
                  <div className="text-sm text-amber-600 mb-1 font-medium">Highest Score</div>
                  <div className="text-3xl font-bold text-amber-700">
                    {Math.max(...scores.map(s => s.highestScore))}%
                  </div>
                </div>
              </div>

              {/* Detailed Scores */}
              <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Test Scores</h2>
                <div className="grid gap-4">
                  {scores.map((score) => (
                    <div
                      key={score.testId}
                      className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex items-center justify-between hover:border-gray-200 transition-colors"
                    >
                      <div>
                        <div className="font-medium text-gray-900">Test {score.testId}</div>
                        <div className="text-sm text-gray-500">Highest attempt</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-2xl font-bold text-primary-600">{score.highestScore}%</div>
                        <div className={`w-3 h-3 rounded-full ${
                          score.highestScore >= 80 ? 'bg-emerald-500' :
                          score.highestScore >= 60 ? 'bg-amber-500' :
                          'bg-rose-500'
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Scores Yet</h3>
              <p className="text-gray-500">Start taking tests to track your progress!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
