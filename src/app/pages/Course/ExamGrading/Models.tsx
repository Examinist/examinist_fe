import React, { Dispatch, SetStateAction } from "react";
import { ExamStatusEnum } from "../../../types/Exam";
import { IStudentExam } from "../../../types/StudentExam";

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