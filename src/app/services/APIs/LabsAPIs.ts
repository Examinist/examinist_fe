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
  //  const portal = localStorage.getItem("portal");
  //  const response = await axiosInstance.get(`${portal}/labs`);
  //  return response as ILabsListResponse;
  try {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.get(`${portal}/labs`);
    return response as ILabsListResponse;
  } catch (error) {
    return {
      data: {
        labs: mockLabs,
      },
    } as ILabsListResponse;
  }
};

export const addLabApi = async (lab: ILab) => {
  try {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.post(`${portal}/labs`, lab);
    return response as ILabResponse;
  } catch (error) {
    return {
      data: {
        lab: mockLabs[0],
      },
    } as ILabResponse;
  }
};

export const updateLabApi = async (lab: ILab) => {
  try {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.put(`${portal}/labs/${lab.id}`, lab);
    return response as ILabResponse;
  } catch (error) {
    return {
      data: {
        lab: mockLabs[0],
      },
    } as ILabResponse;
  }
};

export const deleteLabApi = async (labId: number) => {
  try {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.delete(`${portal}/labs/${labId}`);
    return response as ILabResponse;
  } catch (error) {
    return {
      data: {
        lab: mockLabs[0],
      },
    } as ILabResponse;
  }
  //  const portal = localStorage.getItem("portal");
  //  const response = await axiosInstance.delete(`${portal}/labs/${labId}`);
  //  return response as ILabResponse;
};
