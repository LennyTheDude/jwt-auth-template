import axios from "axios";
import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import { AuthResponse } from "../models/response/AuthResponse";
import AuthService from "../services/AuthService";
import { API_URL } from './../http/index';

export default class Store {
    user = {} as IUser;
    loggedIn = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setLoggedIn(bool: boolean) {
        this.loggedIn = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            console.log(response);
            
            localStorage.setItem('token', response.data.accessToken);
            this.setLoggedIn(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async signUp(email: string, password: string) {
        try {
            const response = await AuthService.signup(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setLoggedIn(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setLoggedIn(false);
            this.setUser({} as IUser);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }
    
    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true});
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setLoggedIn(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }
}