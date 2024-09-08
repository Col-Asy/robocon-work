"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Clock, ChevronLeft, ChevronRight, SkipForward, CheckCircle, XCircle } from "lucide-react"

const quizData = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },
  {
    question: "What is the largest mammal?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale"
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
    correctAnswer: "Leonardo da Vinci"
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Fe", "Cu"],
    correctAnswer: "Au"
  }
]

const QuestionNav = ({ 
  totalQuestions, 
  currentQuestion, 
  completedQuestions, 
  skippedQuestions,
  onQuestionClick 
}: { 
  totalQuestions: number, 
  currentQuestion: number, 
  completedQuestions: boolean[], 
  skippedQuestions: boolean[],
  onQuestionClick: (index: number) => void 
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-4">
      {Array.from({ length: totalQuestions }, (_, i) => (
        <Button
          key={i}
          variant={i === currentQuestion ? "default" : "outline"}
          className={`w-10 h-10 p-0 ${
            completedQuestions[i] 
              ? "bg-green-100 text-green-800" 
              : skippedQuestions[i]
              ? "bg-yellow-100 text-yellow-800"
              : ""
          }`}
          onClick={() => onQuestionClick(i)}
        >
          {i + 1}
        </Button>
      ))}
    </div>
  )
}

export default function QuizDashboard() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [score, setScore] = useState(0)
  const [isQuizCompleted, setIsQuizCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60) // 60 seconds per question
  const [completedQuestions, setCompletedQuestions] = useState(new Array(quizData.length).fill(false))
  const [skippedQuestions, setSkippedQuestions] = useState(new Array(quizData.length).fill(false))
  const [userAnswers, setUserAnswers] = useState(new Array(quizData.length).fill(""))
  const [showScore, setShowScore] = useState(false)
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false)
  

  useEffect(() => {
    if (timeLeft > 0 && !isQuizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !isQuizCompleted) {
      handleSkip()
    }
  }, [timeLeft, isQuizCompleted])

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
    const newUserAnswers = [...userAnswers]
    newUserAnswers[currentQuestion] = answer
    setUserAnswers(newUserAnswers)
    checkIfAllQuestionsAnswered()
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
    setCompletedQuestions(prev => {
      const newCompleted = [...prev]
      newCompleted[currentQuestion] = true
      return newCompleted
    })
    setSelectedAnswer("")
    if (currentQuestion === quizData.length - 1) {
      setShowScore(true)
    } else {
      setCurrentQuestion(currentQuestion + 1)
      setTimeLeft(60)
    }
    checkIfAllQuestionsAnswered()
  }

  const handlePrevQuestion = () => {
    setCurrentQuestion(currentQuestion - 1)
    setSelectedAnswer(userAnswers[currentQuestion - 1])
    setTimeLeft(60)
  }

  const handleSkip = () => {
    setSkippedQuestions(prev => {
      const newSkipped = [...prev]
      newSkipped[currentQuestion] = true
      return newSkipped
    })
    setSelectedAnswer("")
    setCurrentQuestion(currentQuestion + 1)
    setTimeLeft(60)
    checkIfAllQuestionsAnswered()
  }

  const handleSubmit = () => {
    if (selectedAnswer === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
    setCompletedQuestions(prev => {
      const newCompleted = [...prev]
      newCompleted[currentQuestion] = true
      return newCompleted
    })
    setShowScore(true)
    setIsQuizCompleted(true)
  }

  const handleQuestionClick = (index: number) => {
    setCurrentQuestion(index)
    setSelectedAnswer(userAnswers[index])
    setTimeLeft(60)
  }

  const checkIfAllQuestionsAnswered = () => {
    const allAnswered = quizData.every((_, index) => completedQuestions[index] || skippedQuestions[index] || userAnswers[index] !== "")
    setAllQuestionsAnswered(allAnswered)
  }

  const isLastQuestion = currentQuestion === quizData.length - 1
  const isQuestionAnswered = completedQuestions[currentQuestion] || skippedQuestions[currentQuestion]

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center mb-4">Quiz Dashboard</CardTitle>
          <QuestionNav
            totalQuestions={quizData.length}
            currentQuestion={currentQuestion}
            completedQuestions={completedQuestions}
            skippedQuestions={skippedQuestions}
            onQuestionClick={handleQuestionClick}
          />
        </CardHeader>
        <CardContent>
          {!isQuizCompleted ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm font-medium">
                  Question {currentQuestion + 1} of {quizData.length}
                </div>
                <div className="flex items-center text-sm font-medium">
                  <Clock className="w-4 h-4 mr-1" />
                  {timeLeft}s
                </div>
              </div>
              <Progress value={(currentQuestion / quizData.length) * 100} className="mb-6" />
              <h2 className="text-xl font-semibold mb-4">{quizData[currentQuestion].question}</h2>
              <RadioGroup onValueChange={handleAnswerSelect} value={selectedAnswer} className="space-y-2">
                {quizData[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6">Quiz Results</h2>
              {quizData.map((question, index) => (
                <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">
                    {index + 1}. {question.question}
                  </h3>
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center space-x-2">
                        <div className={`w-4 h-4 rounded-full ${
                          option === question.correctAnswer
                            ? 'bg-green-500'
                            : option === userAnswers[index] && option !== question.correctAnswer
                            ? 'bg-red-500'
                            : 'bg-gray-300'
                        }`} />
                        <span className={`${
                          option === question.correctAnswer
                            ? 'font-semibold text-green-700'
                            : option === userAnswers[index] && option !== question.correctAnswer
                            ? 'font-semibold text-red-700'
                            : ''
                        }`}>
                          {option}
                        </span>
                        {option === question.correctAnswer && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                        {option === userAnswers[index] && option !== question.correctAnswer && (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="mt-6 p-4 bg-blue-50 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Overall Result</h3>
                <p className="text-md">Your score: {score} out of {quizData.length}</p>
                <p className="text-md">Skipped questions: {skippedQuestions.filter(Boolean).length}</p>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {!isQuizCompleted && (
            <>
              <Button 
                onClick={handlePrevQuestion} 
                disabled={currentQuestion === 0}
                variant="outline"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
              </Button>
              <Button
                onClick={handleSkip}
                variant="secondary"
                className="mx-2"
              >
                Skip <SkipForward className="w-4 h-4 ml-1" />
              </Button>
              {isLastQuestion ? (
                <Button onClick={handleSubmit} disabled={!allQuestionsAnswered}>
                  Submit
                </Button>
              ) : (
                <Button onClick={handleNextQuestion} disabled={!selectedAnswer && !isQuestionAnswered}>
                  Next <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              )}
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}