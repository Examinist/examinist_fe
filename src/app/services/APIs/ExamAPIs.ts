import { get } from "react-hook-form";
import { ExamStatusEnum, IDetailedExam, IExamQuestionsGroup } from "../../types/Exam";
import { IExam } from "../../types/Exam";
import axiosInstance from "../AxiosConfig";
import { IResponse, IResponseData } from "../Response";
import { mockDetailedExam, mockExamsList } from "./mockData/MockData";
import { IQuestion } from "../../types/Question";


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

const mapQuestions = (questions: any) =>{
 return new Map(
    questions.map((obj:any) => [
      Object.keys(obj)[0],
      obj[Object.keys(obj)[0]],
    ])
  );
}

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
        status: status,
        page: page,
      },
    });
    return response as IExamsListResponse;
  } catch (error) {
    return { data: { exams: mockExamsList } } as IExamsListResponse;
  }
};

export const getExamApi = async (exam_id: number) => {
  const portal = localStorage.getItem("portal");
  const response = await axiosInstance.get(`${portal}/exams/${exam_id}`);
  console.log(response);
  return response as IExamResponse;
  // try {
  //   const portal = localStorage.getItem("portal");
  //   const response = await axiosInstance.get(`${portal}/exams/${exam_id}`);
  //   console.log(response)
  //   return response as IExamResponse;
  // } catch (error) {
  //   return { data: { exam: mockDetailedExam } } as IExamResponse;
  // }
};

export const createExamApi = async (exam: IExamPayload) => {
   const portal = localStorage.getItem("portal");
   const response = await axiosInstance.post(`${portal}/exams`, { ...exam });
   console.log(response);
   return response as IExamResponse;
  // try {
  //   const portal = localStorage.getItem("portal");
  //   const response = await axiosInstance.post(`${portal}/exams`, { ...exam });
  //   return response as IExamResponse;
  // } catch (error) {
  //   return { data: { exam: mockDetailedExam } } as IExamResponse;
  // }
}

export const autoGenerateExamApi = async (exam_parameters: IAutoGeneratePayload) => {
  try {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.post(`${portal}/exams/auto_generate`, {
      ...exam_parameters,
    });
    const exam = {
      ...response.data.exam,
      exam_questions: mapQuestions(response.data.exam.exam_questions),
    };
    return {
      ...response,
      data: { ...response.data, exam: exam },
    } as IExamResponse;
  } catch (error) {
    return { data: { exam: mockDetailedExam } } as IExamResponse;
  }
  
};

export const updateExamApi = async (exam_id: number, exam: IExamPayload) => {
  try {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.put(`${portal}/exams/${exam_id}`, { exam });
    return response as IExamResponse;
  } catch (error) {
    return { data: { exam: mockDetailedExam } } as IExamResponse;
  }
} 

export const deleteExamApi = async (exam_id: number) => {
  try {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.delete(`${portal}/exams/${exam_id}`);
    return response as IExamResponse;
  } catch (error) {
    return { data: { exam: {} } } as IExamResponse;
  }
}

