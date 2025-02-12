import { BaseService } from "./BaseService";
import { apiConfig } from "../api";
import { IRedirectToOriginUrl, IShortUrlCreateForm, IShortUrlResponse } from "@/interface/shortUrl.interface";
import { clientAPI } from "../clientAPI";

interface IShortUrlService {
    infoShortUrl: (shortUrl: string) => Promise<IShortUrlResponse | null>
    redirectToOriginUrl: (shortUrl: string) => Promise<IRedirectToOriginUrl | null>
    getAllShortUrl: () => Promise<IShortUrlResponse[] | null>
    getShortUrl: (shortUrl: string) => Promise<IShortUrlResponse | null>
    createShortUrl: (data: IShortUrlCreateForm) => Promise<IShortUrlResponse | null>
    
}

class ShortUrlService extends BaseService implements IShortUrlService {
    public async deleteShortUrl(shortUrl: string) : Promise<IShortUrlResponse | string> {
        if (!shortUrl.length) return "not is empty this shortUrl"

        try {
            const response = await clientAPI.delete(`${this.getFullUrl()}/delete/${shortUrl}`)
            console.log(response.data)
            return response.data
        } catch(e) {
            console.warn("Err: not delete this short url")
            return "Not find shortUrl for delete !"
        }
    }
    
    
    public async infoShortUrl(shortUrl: string) : Promise<IShortUrlResponse | null> {
        if (!shortUrl.length) return null
        try {
            const response = await clientAPI.get(`${this.getFullUrl()}/info/${shortUrl}`) 
            console.log(response.data)
            return response.data
        } catch(e) {
            console.warn("Err: no this short url;", e)
            return null
        }
    }

    public async redirectToOriginUrl(shortUrl: string) : Promise<IRedirectToOriginUrl | null> {
        if ( !shortUrl.length ) return null
        try {
            const response = await clientAPI.get(`${this.getFullUrl()}/${shortUrl}`)
            console.log(response.data)
            return response.data
        } catch(e) {
            console.warn("Err: no redirect;", e)
            return null
        }
    }

    public async getAllShortUrl() : Promise<IShortUrlResponse[] | null> {
       
        try {
            const response = await clientAPI.get(`${this.getFullUrl()}/`)
            return response.data
        } catch(e) {
            console.warn("err: request to get short url", e)
            return null
        } 
    }

    public async getShortUrl(shortUrl: string) : Promise<IShortUrlResponse | null> {
        if ( !shortUrl.length ) return null
        try {
            const response = await clientAPI.get(`${this.getFullUrl()}?shortUrl=${shortUrl}`)
            console.log(response)
            return response.data
        } catch(e) {
            console.warn("err: request to get short url", e)
            return null
        } 
    }


    public async createShortUrl(data: IShortUrlCreateForm) : Promise<IShortUrlResponse | null> {
        try {
            const response = await clientAPI.post(this.getFullUrl(), data)
            return response.data
        } catch(e) {
            console.warn("err: request to create short url", e)
            return null
        }    
    } 


}

export const shortUrlService = new ShortUrlService(apiConfig.apiUrl, "/shorten")