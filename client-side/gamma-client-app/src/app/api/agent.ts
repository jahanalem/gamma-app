import { toast } from 'react-toastify';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ICategoryModel } from '../models/categoryModel';
import { IPostModel } from '../models/postModel';
import { ITagModel } from '../models/tagModel';
import { IUserModel } from '../models/userModel';
import { ILoginUserViewModel } from '../viewModels/loginUserViewModel';
import { ISignUpUserViewModel } from '../viewModels/signUpUserViewModel';
import { store } from '../stores/store';
import { history } from '../..';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://127.0.0.1:3000/api';//process.env.GAMMA_REACT_APP_API_URL;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
})

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    console.log(error);
    const { data, status, config } = error.response!;
    switch (status) {
        case 400:
            if (config.method === 'get' &&
                (data.errors.hasOwnProperty('id') ||
                    data.errors.hasOwnProperty('tagId') ||
                    data.errors.hasOwnProperty('catId'))) {
                history.push('/not-found');
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error('unauthorised');
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
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
    listByCatId: (catId: string) => requests.get<IPostModel[]>(`/posts/category/${catId}`),
    search: (term: string) => requests.get<IPostModel[]>(`/posts/search/${term}`),
}

const Account = {
    list: () => requests.get<IUserModel[]>('/users/'),
    details: (id: string) => requests.get<IUserModel>(`/users/admin/${id}`),
    signup: (registerFormValues: ISignUpUserViewModel) => requests.post<IUserModel>('/users/signup', registerFormValues),
    login: (loginFormValues: ILoginUserViewModel) => requests.post<IUserModel>('/users/login', loginFormValues),
    delete: (id: string) => requests.del<void>(`/users/delete/${id}`),
    current: () => requests.get<IUserModel>('/users/current'),
    refreshToken: () => requests.post<IUserModel>('/account/refreshToken', {}),
}

const Tag = {
    list: () => requests.get<ITagModel[]>('/tags/'),
    details: (id: string) => requests.get<ITagModel>(`/tags/${id}`),
    create: (tagFormValues: ITagModel) => requests.post<void>('/tags/create', tagFormValues),
    update: (tagFormValues: ITagModel) => requests.post<void>(`/tags/update/${tagFormValues.Id}`, tagFormValues),
    delete: (id: string) => requests.del<void>(`/tags/delete/${id}`)
}

const Category = {
    list: () => requests.get<ICategoryModel[]>('/categories/'),
    details: (id: string) => requests.get<ICategoryModel>(`/categories/${id}`),
    create: (categoryFormValues: ICategoryModel) => requests.post<void>('/categories/create', categoryFormValues),
    update: (categoryFormValues: ICategoryModel) => requests.post<void>(`/categories/update/${categoryFormValues.Id}`, categoryFormValues),
    delete: (id: string) => requests.del<void>(`/categories/delete/${id}`)
}

const agent = {
    Post,
    Account,
    Tag,
    Category,
}

export default agent;
