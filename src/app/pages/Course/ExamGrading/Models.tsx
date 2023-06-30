import React, { Dispatch, SetStateAction } from "react";
import { ExamStatusEnum } from "../../../types/Exam";
import { IStudentAnswer, IStudentExam } from "../../../types/StudentExam";
import { IStudentAnswerPayload } from "../../../services/APIs/GradingAPIs";

export interface IGradeTable {
    totalPages?: number;
    pageNumber?: number;
    filterType?:ExamStatusEnum;
    studentsExams?: IStudentExam[];
  }
export interface IGradingTableContext {
    gradeTableState: IGradeTable;
    setGradeTableState: Dispatch<SetStateAction<IGradeTable>>;
  }
  export const setGradeTableContext = React.createContext<IGradingTableContext>({
    gradeTableState: {},
    setGradeTableState: () => {},
  });

  export interface IGradeExam {
    totalScore?: number;
    partialScore?: number;
    totalQuestions?:number;
    questionsAnswered?: number;
    answers?: IStudentAnswer[];
    student_answers_attributes?: IStudentAnswerPayload[];

  }
export interface IIGradeExamContext {
    gradeState: IGradeExam;
    setGradeState: Dispatch<SetStateAction<IGradeExam>>;
  }
  export const setGradeExamContext = React.createContext<IIGradeExamContext>({
    gradeState: {},
    setGradeState: () => {},
  });