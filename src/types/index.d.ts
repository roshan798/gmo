export interface User {
    name: string;
    email: string;
    phone: string;
}

export interface RedirecPropType {
    to: string;
    delay: number;
    loadingMessage: string;
}
export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}
export interface SubDepartment {
    id: number;
    name: string;
}

export interface Department {
    department: string;
    sub_departments: string[];
}