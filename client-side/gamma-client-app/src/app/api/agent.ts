import axios, { AxiosResponse } from 'axios';
import { IPostModel } from '../models/postModel';
import { ITagModel } from '../models/tagModel';
import { IUserModel } from '../models/userModel';
import { ILoginUserViewModel } from '../viewModels/loginUserViewModel';
import { ISignUpUserViewModel } from '../viewModels/signUpUserViewModel';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:3000/api';//process.env.GAMMA_REACT_APP_API_URL;


axios.interceptors.response.use(async response => {
    try {
        //await sleep(1);
        return response;
    }
    catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Post = {
    list: () => requests.get<IPostModel[]>('/posts/'),
    details: (id: string) => requests.get<IPostModel>(`/posts/${id}`),
    create: (postFormValues: IPostModel) => requests.post<void>('/posts/create', postFormValues),
    update: (postFormValues: IPostModel) => requests.post<void>(`/posts/update/${postFormValues.Id}`, postFormValues),
    delete: (id: string) => requests.del<void>(`/posts/delete/${id}`),
    listByTagId: (tagId: string) => requests.get<IPostModel[]>(`/posts/tag/${tagId}`),
}

const Account = {
    list: requests.get<IUserModel[]>('/users/admin/'),
    details: (id: string) => requests.get<IUserModel>(`/users/admin/${id}`),
    signup: (registerFormValues: ISignUpUserViewModel) => requests.post<void>('/users/signup', registerFormValues),
    login: (loginFormValues: ILoginUserViewModel) => requests.post<IUserModel>('/users/login', loginFormValues)
}

const Tag = {
    list: () => requests.get<ITagModel[]>('/tags/'),
    details: (id: string) => requests.get<ITagModel>(`/tags/${id}`),
    create: (tagFormValues: ITagModel) => requests.post<void>('/tags/create', tagFormValues),
    update: (tagFormValues: ITagModel) => requests.post<void>(`/tags/update/${tagFormValues.Id}`, tagFormValues),
    delete: (id: string) => requests.del<void>(`/tags/delete/${id}`)
}

const agent = {
    Post,
    Account,
    Tag
}

export default agent;
