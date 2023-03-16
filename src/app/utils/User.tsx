interface User{
    username: string;
    firstName: string;
    lastName: string;
    role: string;
    auth_token: string;
}

export enum Roles{
    Instructor = "instructor",
    Student = "student",
    UniversityAdmin = "university_admin",
    FacultyAdmin = "faculty_admin",
    Proctor="proctor"
}


export default User;