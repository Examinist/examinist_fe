import React from 'react'
import SelectAnswerType from '../form/SelectAnswerType'

const answerTypes = ["Single", "Multiple"];
export default function MCQAnswer() {
  
  return (
    <div><SelectAnswerType answerTypes={answerTypes}></SelectAnswerType></div>
  )
}
