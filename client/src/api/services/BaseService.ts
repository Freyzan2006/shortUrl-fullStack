

export class BaseService {
    BaseUrl: string
    url: string


    constructor(BaseUrl: string, url: string) {
        this.BaseUrl = BaseUrl
        this.url = url
    }


    protected getFullUrl() : string {
        return this.BaseUrl + this.url
    }
}