import { Box } from '@mui/system'
import React from 'react'
import { AnswerTypeEnum } from '../../../../../types/Question';
import { DefaultQuestionTypesEnum } from '../../../../../types/CourseSettings';
import theme from '../../../../../../assets/theme';

interface IQuestionTypeTagProps{
    questionType: string;
    answerType: string;
}

export default function QuestionTypeTag({questionType, answerType}: IQuestionTypeTagProps) {
  const showAnswerType = (questionType !== DefaultQuestionTypesEnum.T_F && questionType !== DefaultQuestionTypesEnum.SHORT_ANSWER)
  return (
    <Box sx={{backgroundColor: theme.palette.gray.light, px: 2, py: 0.6, borderRadius: 4, fontSize: '12px'}}>
        {questionType.replace('_', ' ')}{showAnswerType && ` (${answerType.replace('_', ' ')})`}
    </Box>
  )
}
