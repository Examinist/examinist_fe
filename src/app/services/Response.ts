export interface IResponseData {
  status?: string;
  message?: string;
}

export interface IResponse <T>{
    status?: number;
    statusText?: string;
    data: T;
}

export interface IErrorResponse{
    response: IResponse<IResponseData>;
}