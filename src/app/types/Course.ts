import IUser from "./User";

interface ICourse{
    id: number;
    title: string;
    code: string;
}

interface ICourseInfo extends ICourse{
     credit_hours: number;
     instructors: IUser[];
     students: IUser[];
}

interface ICourseGroup{
    id: number;
    name: string;
    end_date: Date;
    instructors: IUser[];
    students: IUser[];
}

export type {ICourse, ICourseInfo, ICourseGroup};

