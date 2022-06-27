export interface IUserRegistration {
    email: string;
    name: string;
    phone: string;
    password: string;
    confirmPassword: string;
    authId? : string;
    uid?: string;
}

export interface IUserLogin extends Omit<IUserRegistration, "name"|"phone"|"confirmPassword">{};

export interface IUserLoginResponseDto extends Omit<IUserRegistration, "name"|"phone"|"password"|"confirmPassword">{
    token: string;
    isSuccess: boolean;
};