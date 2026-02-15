export interface UserExistenceCriteria {
    email: string;
    name: string;
}

export interface CreateUser {
    email: string,
    name: string,
    password: string,
    signupToken: string
}