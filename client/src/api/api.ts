
export interface IApiConfig {
    name: string
    apiUrl: string
}

class APIConfig implements IApiConfig {
    name: string
    apiUrl: string

    
    constructor(name: string, apiUrl: string) {
        this.apiUrl = apiUrl
        this.name = name
    }
}

export const apiConfig = new APIConfig("short", "http://localhost:8000",)

