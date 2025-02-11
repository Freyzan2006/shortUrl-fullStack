import { BaseService } from "./BaseService";
import { apiConfig } from "../api";
import { IRedirectToOriginUrl, IShortUrl, IShortUrlCreateForm } from "@/interface/shortUrl.interface";
import { clientAPI } from "../clientAPI";

interface IShortUrlService {
    infoShortUrl: (shortUrl: string) => Promise<IShortUrl | null>
    redirectToOriginUrl: (shortUrl: string) => Promise<IRedirectToOriginUrl | null>
    getAllShortUrl: () => Promise<IShortUrl[] | null>
    getShortUrl: (shortUrl: string) => Promise<IShortUrl | null>
    createShortUrl: (data: IShortUrlCreateForm) => Promise<IShortUrl | null>
    
}

class ShortUrlService extends BaseService implements IShortUrlService {
    public async infoShortUrl(shortUrl: string) : Promise<IShortUrl | null> {
        if (!shortUrl.length) return null
        try {
            const response = await clientAPI.get(`${this.getFullUrl()}/info/${shortUrl}`) 
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
            return response.data
        } catch(e) {
            console.warn("Err: no redirect;", e)
            return null
        }
    }

    public async getAllShortUrl() : Promise<IShortUrl[] | null> {
       
        try {
            const response = await clientAPI.get(`${this.getFullUrl()}/`)
            return response.data
        } catch(e) {
            console.warn("err: request to get short url", e)
            return null
        } 
    }

    public async getShortUrl(shortUrl: string) : Promise<IShortUrl | null> {
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


    public async createShortUrl(data: IShortUrlCreateForm) : Promise<IShortUrl | null> {
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