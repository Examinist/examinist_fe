import { ILab } from "../../types/Lab";
import axiosInstance from "../AxiosConfig";
import { IResponse, IResponseData } from "../Response";
import { mockLabs } from "./mockData/MockData";

interface ILabsListData extends IResponseData {
  labs: ILab[];
}

interface ILabData extends IResponseData {
  lab: ILab;
}

export interface ILabsListResponse extends IResponse<ILabsListData> {}
export interface ILabResponse extends IResponse<ILabData> {}

export const getLabsListApi = async () => {
  if (import.meta.env.VITE_IS_SERVER_UP === "true") {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.get(`${portal}/labs`);
    return response as ILabsListResponse;
  }
  return {
    data: {
      labs: mockLabs,
    },
  } as ILabsListResponse;
};

export const addLabApi = async (lab: ILab) => {
  const portal = localStorage.getItem("portal");
  const response = await axiosInstance.post(`${portal}/labs`, lab);
  return response as ILabResponse;
};

export const updateLabApi = async (lab: ILab) => {
  const portal = localStorage.getItem("portal");
  const response = await axiosInstance.patch(`${portal}/labs/${lab.id}`, lab);
  return response as ILabResponse;
};

export const deleteLabApi = async (labId: number) => {
  const portal = localStorage.getItem("portal");
  const response = await axiosInstance.delete(`${portal}/labs/${labId}`);
  return response as ILabResponse;
};
