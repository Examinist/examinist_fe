import {
  ExamStatusEnum,
  IDetailedExam,
  IExamQuestionsGroup,
} from "../../types/Exam";
import { IExam } from "../../types/Exam";
import { fixExamDate } from "../../utilities/Date";
import axiosInstance from "../AxiosConfig";
import { IResponse, IResponseData } from "../Response";
import { mockDetailedExam, mockExamsList } from "./mockData/MockData";

export interface IExamPayload {
  title?: string;
  duration?: number;
  course_id?: number;
  is_auto?: boolean;
  has_models?: boolean;
  exam_questions_attributes?: IExamQuestionPayload[];
}

export interface IAutoGeneratePayload {
  duration: number;
  course_id: number;
  question_type_topics: IQuestionTypeTopics[];
}

export interface IQuestionTypeTopics {
  question_type_id: number;
  topic_ids: number[];
}

export interface IExamQuestionPayload {
  id?: number;
  score?: number;
  question_id?: number;
  _destroy?: boolean;
}

interface ExamsListData extends IResponseData {
  exams: IExam[];
}

interface IDetailedExamData extends IResponseData {
  exam: IDetailedExam;
}

export interface IExamsListResponse extends IResponse<ExamsListData> {}
export interface IExamResponse extends IResponse<IDetailedExamData> {}

const mapQuestions = (questions: any) => {
  return new Map(
    questions.map((obj: any) => [Object.keys(obj)[0], obj[Object.keys(obj)[0]]])
  );
};

export const getExamsApi = async (
  course_id?: number,
  status?: ExamStatusEnum,
  page: number = -1
) => {
  try {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.get(`${portal}/exams`, {
      params: {
        course_id: course_id,
        filter_by_status: status,
        page: page,
      },
    });
    let exams: IExam[] = response.data.exams;
    exams.forEach((exam: IExam) => {
      exam.created_at = new Date(exam.created_at);
      if (exam.scheduled_date) {
        exam.scheduled_date = new Date(exam.scheduled_date);
      }
    });
    return response as IExamsListResponse;
  } catch (error) {
    return { data: { exams: mockExamsList } } as IExamsListResponse;
  }
};

export const getExamApi = async (exam_id: number) => {
  try {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.get(`${portal}/exams/${exam_id}`);
    response.data.exam = fixExamDate(response.data.exam);
    return response as IExamResponse;
  } catch (error) {
    return { data: { exam: mockDetailedExam } } as IExamResponse;
  }
};

export const createExamApi = async (exam: IExamPayload) => {
  try {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.post(`${portal}/exams`, { ...exam });
    return response as IExamResponse;
  } catch (error) {
    return { data: { exam: mockDetailedExam } } as IExamResponse;
  }
};

export const autoGenerateExamApi = async (
  exam_parameters: IAutoGeneratePayload
) => {
  try {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.post(`${portal}/exams/auto_generate`, {
      ...exam_parameters,
    });
    return response as IExamResponse;
  } catch (error) {
    return { data: { exam: mockDetailedExam } } as IExamResponse;
  }
};

export const updateExamApi = async (exam_id: number, exam: IExamPayload) => {
  const portal = localStorage.getItem("portal");
  const response = await axiosInstance.put(`${portal}/exams/${exam_id}`, {
    ...exam,
  });
  return response as IExamResponse;
  // try {
  //   const portal = localStorage.getItem("portal");
  //   const response = await axiosInstance.put(`${portal}/exams/${exam_id}`, {
  //     exam,
  //   });
  //   return response as IExamResponse;
  // } catch (error) {
  //   return { data: { exam: mockDetailedExam } } as IExamResponse;
  // }
};

export const deleteExamApi = async (exam_id: number) => {
  try {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.delete(`${portal}/exams/${exam_id}`);
    return response as IExamResponse;
  } catch (error) {
    return { data: { exam: {} } } as IExamResponse;
  }
};
