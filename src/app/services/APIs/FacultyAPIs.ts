import { IUniversityFaculty } from "../../types/University";
import { IStaff } from "../../types/User";
import axiosInstance from "../AxiosConfig";
import { IResponse, IResponseData } from "../Response";

interface IFacultiesListData extends IResponseData {
  faculties: IUniversityFaculty[];
}

interface IFacultyStaffListData extends IResponseData{
  staffs: IStaff[];
}

interface IFacultyStaffData extends IResponseData {
  staff: IStaff;
}



export interface IFacultiesListResponse extends IResponse<IFacultiesListData> {}
export interface IFacultyStaffListResponse extends IResponse<IFacultyStaffListData> {}
export interface IFacultyStaffResponse
  extends IResponse<IFacultyStaffData> {}

export const getFacultiesApi = async () => {
  try {
    const response = await axiosInstance.get(`coordinator_portal/faculties`);

    return response as IFacultiesListResponse;
  } catch (error) {
    return { data: { faculties: [] } } as IFacultiesListResponse;
  }
};

export const getFacultyInstructorsApi = async (facultyId: number) =>{
  const response = await axiosInstance.get(`coordinator_portal/faculties/${facultyId}/staffs`);
  return response as IFacultyStaffListResponse;
}

export const updateStaffRoleApi = async (facultyId: number, staffId: number, newRole: string) => {
  const response = await axiosInstance.patch(`coordinator_portal/faculties/${facultyId}/staffs/${staffId}`,{
    role: newRole
  });
  return response as IFacultyStaffResponse;
}
