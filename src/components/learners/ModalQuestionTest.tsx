import React, { useState } from 'react';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setAnswer, submitTest, toggleCheckboxAnswer } from '@/store/slices/testSlice';
import { questionsData } from '@/types/data/questions';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore'; 
import { setTestPassed } from '@/store/slices/authSlice';
import {SubQuestion } from '@/types/test';
import toast from 'react-hot-toast';

const ModalQuestionTest: React.FC<{ onTestComplete?: () => void }> = ({ onTestComplete }) => {
  const dispatch = useAppDispatch();
  const { isSubmitting, answers, error } = useAppSelector((state) => state.test);
  const { token } = useSelector((state: RootState) => state.authReducer);
  const testPassed = useSelector((state: RootState) => state.authReducer.test_passed);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

// Calcul des totaux
const totalSubQuestions = questionsData.reduce((total, question) => 
  total + question.subQuestions.length, 0);

const totalRequiredQuestions = questionsData.reduce((total, question) => 
  total + (question.id > "1" ? question.subQuestions.length : 0), 0);

// const totalOptionalQuestions = totalSubQuestions - totalRequiredQuestions;

// Comptage des réponses
const answeredCount = Object.keys(answers).length;
const answeredRequiredCount = questionsData.reduce((count, question) => {
  if (question.id > "1") { // Questions obligatoires seulement
    question.subQuestions.forEach(subQ => {
      if (answers[subQ.id]?.length > 0) count++;
    });
  }
  return count;
}, 0);

// const answeredOptionalCount = answeredCount - answeredRequiredCount;

// Calcul de la progression (version simple et fiable)
const progress = totalSubQuestions > 0 
  ? (answeredCount / totalSubQuestions) * 100 
  : 0;

// Complétion (basée uniquement sur les questions obligatoires)
const isComplete = answeredRequiredCount === totalRequiredQuestions;


  // Fonction pour calculer le score total
  const calculateTotalScore = () => {
    let totalScore = 0;
    
    questionsData.forEach((question) => {
      question.subQuestions.forEach((subQuestion) => {
        const selectedOptionIds = answers[subQuestion.id] || [];
        
        selectedOptionIds.forEach(optionId => {
          const selectedOption = subQuestion.options.find(option => option.id === optionId);
          if (selectedOption) {
            totalScore += selectedOption.score;
          }
        });
      });
    });
    
    return totalScore;
  };

  const handleAnswerChange = (subQuestionId: string, optionId: string, questionId: string) => {
    if (questionId <= "1" ) {
      dispatch(toggleCheckboxAnswer({ subQuestionId, optionId }));
    } else {
      dispatch(setAnswer({ subQuestionId, optionId }));
    }
  };

  const handleSubmit = async () => {
    if (isComplete && !isSubmitting && token) {
      try {
        const totalScore = calculateTotalScore();
        console.log('Score total calculé:', totalScore);
        
        await dispatch(submitTest({ totalScore, token })).unwrap();
        dispatch(setTestPassed(true));
        
        toast.success(
          'Test terminé avec succès ! Vérifiez votre email pour connaître le nombre d\'heures recommandé pour votre apprentissage. Vous pouvez maintenant accéder au dashboard.', 
          { duration: 6000, position: 'top-center' }
        );

        // Appeler la fonction de callback après succès
        onTestComplete?.();

      } catch (error) {
        console.error('Erreur lors de la soumission:', error);
        toast.error('Erreur lors de la soumission du test. Veuillez réessayer.');
      }
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // Scroll vers le haut de la page suivante
      const modalContent = document.querySelector('.modal-content');
      if (modalContent) {
        modalContent.scrollTop = 0;
      }
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      // Scroll vers le haut de la page précédente
      const modalContent = document.querySelector('.modal-content');
      if (modalContent) {
        modalContent.scrollTop = 0;
      }
    }
  };

  const navigateToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    // Scroll vers le haut lors de la navigation directe
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
      modalContent.scrollTop = 0;
    }
  };

  const renderSubQuestion = (subQuestion: SubQuestion, questionIndex: number) => {
    const isCheckbox = currentQuestion.id <= "1" ;
    const currentAnswers = answers[subQuestion.id] || [];
    const isAnswered = currentAnswers.length > 0;
    
    return (
      <div key={subQuestion.id} className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
          <span className="w-5 h-5 flex items-center justify-center bg-[#6d59ed]/10 text-primary rounded-full text-xs mr-2">
            {questionIndex + 1}
          </span>
          {subQuestion.title}
          {isAnswered && (
            <CheckCircle className="w-4 h-4 text-green-500 ml-2" />
          )}
        </h4>
        <div className="space-y-2">
          {subQuestion.options.map((option) => (
            <label
              key={option.id}
              className={`flex items-center p-3 rounded-md cursor-pointer transition-all duration-200 ${
                isCheckbox 
                  ? currentAnswers.includes(option.id)
                    ? 'bg-[#6d59ed]/10 border-[#6d59ed] border-2'
                    : 'bg-white border border-gray-200 hover:bg-gray-50'
                  : answers[subQuestion.id]?.[0] === option.id
                    ? 'bg-[#6d59ed]/10 border-[#6d59ed] border-2'
                    : 'bg-white border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <input
                type={isCheckbox ? "checkbox" : "radio"}
                name={subQuestion.id}
                value={option.id}
                checked={isCheckbox 
                  ? currentAnswers.includes(option.id)
                  : answers[subQuestion.id]?.[0] === option.id
                }
                onChange={() => handleAnswerChange(subQuestion.id, option.id, currentQuestion.id)}
                className="w-4 h-4 text-[#6d59ed] border-gray-300 focus:ring-[#6d59ed]"
              />
              <span className="ml-3 text-sm text-gray-800">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    );
  };

  // Ne pas afficher le modal si le test a été passé ou si pas de token
  if (testPassed || !token) {
    return null;
  }

  const currentQuestion = questionsData[currentQuestionIndex];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-hidden">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] mx-4 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Évaluation initiale</h1>
            <div className="text-xs md:text-sm text-gray-600">
              {answeredRequiredCount} / {totalRequiredQuestions} questions obligatoires répondues
            </div>
          </div>
          
          {/* Barre de progression */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-[#6d59ed] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
         <div className="text-xs md:text-sm text-gray-600">
        {answeredRequiredCount}/{totalRequiredQuestions} obligatoires • {answeredCount}/{totalSubQuestions} au total
      </div>
        </div>

        {/* Contenu principal avec scroll caché */}
        <div className="modal-content flex-1 overflow-y-auto p-4 md:p-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style precedence="default">{`
            .modal-content::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          <div className="mb-6">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-1">
              {currentQuestion.title}
            </h2>
            <p className="text-xs md:text-sm text-gray-600">
              Question {currentQuestionIndex + 1} sur {questionsData.length}
            </p>
          </div>

          {/* Sous-questions */}
          <div className="space-y-4">
            {currentQuestion.subQuestions.map((subQuestion, index) => 
              renderSubQuestion(subQuestion, index)
            )}
          </div>

          {/* Affichage des erreurs */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}
        </div>

        {/* Footer avec navigation responsive */}
        <div className="p-4 md:p-6 border-t border-gray-200 flex-shrink-0">
          {/* Navigation mobile */}
          <div className="flex flex-col space-y-4 md:hidden">
            {/* Pagination dots pour mobile */}
            <div className="flex justify-center space-x-2">
              {questionsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => navigateToQuestion(index)}
                  className={`w-6 h-6 rounded-full text-xs font-medium transition-colors ${
                    index === currentQuestionIndex
                      ? 'bg-[#6d59ed] text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            
            {/* Boutons de navigation pour mobile */}
            <div className="flex justify-between">
              <button
                onClick={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Précédent
              </button>

              {currentQuestionIndex === questionsData.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  disabled={!isComplete || isSubmitting}
                  className={`px-6 py-2 text-sm font-medium rounded-md transition-colors flex items-center ${
                    isComplete && !isSubmitting
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Envoi...
                    </>
                  ) : (
                    'Valider le test'
                  )}
                </button>
              ) : (
                <button
                  onClick={goToNextQuestion}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#6d59ed] rounded-md hover:bg-[#6d59ed]/90 transition-colors"
                >
                  Suivant
                </button>
              )}
            </div>
          </div>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center justify-between">
            <button
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Précédent
            </button>

            <div className="flex space-x-2">
              {questionsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => navigateToQuestion(index)}
                  className={`w-8 h-8 rounded-full text-xs font-medium transition-colors ${
                    index === currentQuestionIndex
                      ? 'bg-[#6d59ed] text-white'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {currentQuestionIndex === questionsData.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={!isComplete || isSubmitting}
                className={`px-6 py-2 text-sm font-medium rounded-md transition-colors flex items-center ${
                  isComplete && !isSubmitting
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Envoi...
                  </>
                ) : (
                  'Valider le test'
                )}
              </button>
            ) : (
              <button
                onClick={goToNextQuestion}
                className="px-4 py-2 text-sm font-medium text-white bg-[#6d59ed] rounded-md hover:bg-[#6d59ed]/90 transition-colors"
              >
                Suivant
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalQuestionTest;


