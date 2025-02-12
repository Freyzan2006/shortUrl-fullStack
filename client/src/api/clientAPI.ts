import axios, { AxiosInstance, AxiosResponse } from "axios";
import { IApiConfig, apiConfig } from "./api";


interface IClientAPIConfig {
    headers?: Record<string, string>;
    timeout?: number;
}

interface IClientAPI {
    get: (endpoint: string, params?: Record<string, any>) => Promise<AxiosResponse> 
    post: (endpoint: string, params?: Record<string, any>) => Promise<AxiosResponse>
    delete: (endpoint: string, params?: Record<string, any>) => Promise<AxiosResponse>
}

class ClientAPI implements IClientAPI {
    client: AxiosInstance
    config: IClientAPIConfig
    configAPI: IApiConfig 


    constructor(client: AxiosInstance, config: IClientAPIConfig, configAPI: IApiConfig) {
        this.client = client
        this.config = config
        this.configAPI = configAPI
    }

    async get(endpoint: string, params?: Record<string, any>) : Promise<AxiosResponse>{
        return this.client.get(endpoint, { params });
    }

    async post(endpoint: string, data?: Record<string, any>): Promise<AxiosResponse> {
        return this.client.post(endpoint, data); 
    }

    async delete(endpoint: string, params?: Record<string, any>): Promise<AxiosResponse> {
        return this.client.delete(endpoint, { params });
    }
}


export const clientAPI = new ClientAPI(axios.create(), {
    timeout: 10000, 
    headers: { 'Content-Type': 'application/json' } 
}, apiConfig)