

export interface IShortUrlRequest {
    originalUrl: string;
    expiresAt?: Date 
    alias?: string
}

export interface IShortUrlResponse {
    id: number
    originalUrl: string;
    shortUrl: string;
    expiresAt: Date 
    alias: string
    clickCount: number
}

export interface IShortUrlCreateForm {
    originalUrl: string;
    expiresAt?: Date;
    alias?: string; 
}

export interface IRedirectToOriginUrl {
    url: string
}