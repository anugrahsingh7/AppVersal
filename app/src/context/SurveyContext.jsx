import { createContext, useContext, useMemo, useState } from 'react'
import {
  createDefaultQuestion,
  createId,
  createInitialState,
} from '../constants/defaults'

const SurveyContext = createContext(null)

export function SurveyProvider({ children }) {
  const [state, setState] = useState(createInitialState)

  const setActiveTab = (activeTab) => {
    setState((prev) => ({ ...prev, activeTab }))
  }

  const setActiveContentSection = (activeContentSection) => {
    setState((prev) => ({
      ...prev,
      activeContentSection,
      activeQuestionId: null,
    }))
  }

  const setActiveQuestionId = (activeQuestionId) => {
    setState((prev) => ({
      ...prev,
      activeQuestionId,
      activeContentSection: activeQuestionId,
    }))
  }

  const setPageCount = (count) => {
    const safeCount = Math.max(1, Math.min(10, Number(count) || 1))

    setState((prev) => {
      let questions = [...prev.questions]

      if (safeCount > questions.length) {
        while (questions.length < safeCount) {
          questions.push(createDefaultQuestion(questions.length + 1))
        }
      } else if (safeCount < questions.length) {
        questions = questions.slice(0, safeCount)
      }

      const previewQuestionIndex = Math.min(prev.previewQuestionIndex, safeCount - 1)

      return {
        ...prev,
        pageCount: safeCount,
        questions,
        previewQuestionIndex,
        activeQuestionId: questions[previewQuestionIndex]?.id ?? questions[0]?.id,
      }
    })
  }

  const updateQuestion = (questionId, updates) => {
    setState((prev) => ({
      ...prev,
      questions: prev.questions.map((question) =>
        question.id === questionId ? { ...question, ...updates } : question,
      ),
    }))
  }

  const addOption = (questionId) => {
    setState((prev) => ({
      ...prev,
      questions: prev.questions.map((question) => {
        if (question.id !== questionId) return question

        return {
          ...question,
          options: [
            ...question.options,
            { id: createId('option'), text: `Option ${question.options.length + 1}` },
          ],
        }
      }),
    }))
  }

  const updateOption = (questionId, optionId, text) => {
    setState((prev) => ({
      ...prev,
      questions: prev.questions.map((question) => {
        if (question.id !== questionId) return question

        return {
          ...question,
          options: question.options.map((option) =>
            option.id === optionId ? { ...option, text } : option,
          ),
        }
      }),
    }))
  }

  const removeOption = (questionId, optionId) => {
    setState((prev) => ({
      ...prev,
      questions: prev.questions.map((question) => {
        if (question.id !== questionId || question.options.length <= 2) return question

        return {
          ...question,
          options: question.options.filter((option) => option.id !== optionId),
          conditions: question.conditions.filter((condition) => condition.optionId !== optionId),
        }
      }),
    }))
  }

  const addCondition = (questionId) => {
    setState((prev) => ({
      ...prev,
      questions: prev.questions.map((question) => {
        if (question.id !== questionId) return question

        const firstOption = question.options[0]
        if (!firstOption) return question

        return {
          ...question,
          conditions: [
            ...question.conditions,
            {
              id: createId('condition'),
              optionId: firstOption.id,
              redirectTo: 'next',
            },
          ],
        }
      }),
    }))
  }

  const updateCondition = (questionId, conditionId, updates) => {
    setState((prev) => ({
      ...prev,
      questions: prev.questions.map((question) => {
        if (question.id !== questionId) return question

        return {
          ...question,
          conditions: question.conditions.map((condition) =>
            condition.id === conditionId ? { ...condition, ...updates } : condition,
          ),
        }
      }),
    }))
  }

  const removeCondition = (questionId, conditionId) => {
    setState((prev) => ({
      ...prev,
      questions: prev.questions.map((question) => {
        if (question.id !== questionId) return question

        return {
          ...question,
          conditions: question.conditions.filter((condition) => condition.id !== conditionId),
        }
      }),
    }))
  }

  const updateThankYou = (updates) => {
    setState((prev) => ({
      ...prev,
      thankYou: { ...prev.thankYou, ...updates },
    }))
  }

  const updateStyling = (path, value) => {
    setState((prev) => {
      const keys = path.split('.')
      const styling = structuredClone(prev.styling)
      let current = styling

      for (let i = 0; i < keys.length - 1; i += 1) {
        current = current[keys[i]]
      }

      current[keys[keys.length - 1]] = value
      return { ...prev, styling }
    })
  }

  const setPreviewQuestionIndex = (previewQuestionIndex) => {
    setState((prev) => ({ ...prev, previewQuestionIndex }))
  }

  const setPreviewSelection = (questionId, optionId) => {
    setState((prev) => ({
      ...prev,
      previewSelections: { ...prev.previewSelections, [questionId]: optionId },
    }))
  }

  const setPreviewComment = (previewComment) => {
    setState((prev) => ({ ...prev, previewComment }))
  }

  const goToNextPreviewScreen = () => {
    setState((prev) => {
      const currentQuestion = prev.questions[prev.previewQuestionIndex]
      const selectedOptionId = prev.previewSelections[currentQuestion?.id]
      const matchedCondition = currentQuestion?.conditions.find(
        (condition) => condition.optionId === selectedOptionId,
      )

      if (matchedCondition?.redirectTo === 'thank-you' && prev.thankYou.enabled) {
        return { ...prev, previewQuestionIndex: prev.questions.length }
      }

      if (matchedCondition?.redirectTo?.startsWith('question:')) {
        const targetId = matchedCondition.redirectTo.replace('question:', '')
        const targetIndex = prev.questions.findIndex((question) => question.id === targetId)
        if (targetIndex >= 0) {
          return { ...prev, previewQuestionIndex: targetIndex, previewComment: '' }
        }
      }

      const nextIndex = prev.previewQuestionIndex + 1

      if (nextIndex >= prev.questions.length) {
        if (prev.thankYou.enabled) {
          return { ...prev, previewQuestionIndex: prev.questions.length, previewComment: '' }
        }
        return { ...prev, previewQuestionIndex: 0, previewSelections: {}, previewComment: '' }
      }

      return { ...prev, previewQuestionIndex: nextIndex, previewComment: '' }
    })
  }

  const resetPreview = () => {
    setState((prev) => ({
      ...prev,
      previewQuestionIndex: 0,
      previewSelections: {},
      previewComment: '',
    }))
  }

  const value = useMemo(
    () => ({
      ...state,
      setActiveTab,
      setActiveContentSection,
      setActiveQuestionId,
      setPageCount,
      updateQuestion,
      addOption,
      updateOption,
      removeOption,
      addCondition,
      updateCondition,
      removeCondition,
      updateThankYou,
      updateStyling,
      setPreviewQuestionIndex,
      setPreviewSelection,
      setPreviewComment,
      goToNextPreviewScreen,
      resetPreview,
    }),
    [state],
  )

  return <SurveyContext.Provider value={value}>{children}</SurveyContext.Provider>
}

export function useSurvey() {
  const context = useContext(SurveyContext)
  if (!context) {
    throw new Error('useSurvey must be used within SurveyProvider')
  }
  return context
}
