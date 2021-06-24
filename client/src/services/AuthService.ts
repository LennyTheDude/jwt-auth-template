import { AxiosResponse } from 'axios';
import { $api } from '../http';
import { AuthResponse } from '../models/response/AuthResponse';

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/login', {email, password});
    }

    static async signup(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/signup', {email, password});
    }

    static async logout(): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('/logout');
    }
}