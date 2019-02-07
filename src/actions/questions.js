import { hideLoading, showLoading } from 'react-redux-loading'
import { saveQuestion, saveQuestionAnswer } from "../utils/api"
import { handleInitialData } from "./shared"

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'

export function receiveQuestions(questions) {
  return (
    {
      type: RECEIVE_QUESTIONS,
      questions
    }
  )
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(showLoading())
    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    })
      .then(() => {
        dispatch(handleInitialData())
        dispatch(hideLoading())
      })
  }
}

export function handleAnswerQuestion(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    const authedUserId = authedUser
    dispatch(showLoading())
    return saveQuestionAnswer({ authedUser: authedUserId, qid, answer })
      .then(() => {
        dispatch(handleInitialData())
        dispatch(hideLoading())
      })
  }
}