

export interface IShortUrl {
    id: number
    originalUrl: string;
    shortUrl: string;
    expiresAt: Date 
    alias: string
}

export interface IShortUrlCreateForm {
    originalUrl: string;
    expiresAt?: Date;
    alias?: string; 
}

export interface IRedirectToOriginUrl {
    url: string
}