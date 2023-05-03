import { IFilterQuestionsParams, IQuestion } from "../../types/Question";
import axiosInstance from "../AxiosConfig";
import { IResponse, IResponseData } from "../Response";
import { mockQuestions } from "./mockData/MockData";

interface IQuestionsListData extends IResponseData {
  questions: IQuestion[];
}


export interface IQuestionsListResponse extends IResponse<IQuestionsListData> {}

export const getQuestionsApi = async (
  course_id: number,
  filterParams?: IFilterQuestionsParams
) => {
  try {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.get(`${portal}/courses/${course_id}/questions`, {
        params:filterParams
      });
    console.log(response);
    return response as IQuestionsListResponse;
  } catch (error) {
    return { data: { questions: mockQuestions }} as IQuestionsListResponse;
  }
};
