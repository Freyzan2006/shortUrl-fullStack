import { IShortUrlCreateForm } from "@/interface/shortUrl.interface";



export interface IForm extends IShortUrlCreateForm {
    originalUrl: string;
    expiresAt?: Date;
    alias?: string; 
}

