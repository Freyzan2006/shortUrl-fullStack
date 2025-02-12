import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Query, Redirect } from '@nestjs/common';
import { IShortUrlCreateForm, IShortUrlResponse } from 'src/interface/shortUrl.interface';
import * as crypto from 'crypto';
import { ShortUrlService } from './shorten.service';


// {
//     "originalUrl": "https://example.com",
//     "expiresAt": "2025-12-31T23:59:59Z",
//     "alias": "mycustomalias"
//   }

@Controller('shorten')
export class ShortUrlController {
    // private shortUrls: IShortUrlResponse[] = [
    //     {
    //         id: 1,
    //         originalUrl: "https://www.github.com/openai/gpt-3/blob/main/README.md",
    //         shortUrl: "url1",
    //         expiresAt: new Date(),
    //         alias: "url1",
    //         clickCount: 0
    //     },
    //     {
    //         id: 2,
    //         originalUrl: "https://www.reddit.com/r/technology/comments/16r8kz9/latest_tech_innovation_and_its_impact_on_the/",
    //         shortUrl: "url2",
    //         expiresAt: new Date(),
    //         alias: "url2",
    //         clickCount: 0
    //     },
    //     {
    //         id: 3,
    //         originalUrl: "https://www.github.com/openai/gpt-3/blob/main/README.md",
    //         shortUrl: "url3",
    //         expiresAt: new Date(),
    //         alias: "url3",
    //         clickCount: 0
    //     },
    // ];

    constructor(private readonly shortUrlService: ShortUrlService) {}


    // @Get()
    // getShortsUrl(@Query('shortUrl') shortUrl?: string): IShortUrlResponse | IShortUrlResponse[] {
    //     if (shortUrl) {
           
    //         return this.shortUrls.find(url => url.shortUrl === shortUrl) || <IShortUrlResponse>{};
    //     } else {
            
    //         return this.shortUrls;
    //     }
    // }

    @Get()
    async getShortsUrl(@Query('shortUrl') shortUrl?: string): Promise<IShortUrlResponse | IShortUrlResponse[]> {
      if (shortUrl) {
        const shortUrlData = await this.shortUrlService.getShortUrl(shortUrl);
        if (!shortUrlData) {
          throw new NotFoundException(`Short URL with alias ${shortUrl} not found`);
        }
        return shortUrlData;
      } else {
        return await this.shortUrlService.getAllShortUrls();
      }
    }



    @Post()
    async createShortUrl(@Body() createDto: IShortUrlCreateForm) : Promise<IShortUrlResponse> {
        return await this.shortUrlService.createShortUrl(createDto);
        // const expiresAt = body.expiresAt ? new Date(body.expiresAt) : new Date()

       

      
        // if (isNaN(expiresAt.getTime())) throw new Error("Invalid date format");
        
        // let shortUrl: string = crypto.randomBytes(4).toString('hex');
        // let isUnique = false;

        // while (!isUnique) {
        //     shortUrl = crypto.randomBytes(4).toString('hex'); 
        //     isUnique = !this.shortUrls.some(url => url.shortUrl === shortUrl);
        // } 

        // const newShortUrl: IShortUrlResponse = {
        //     id: this.shortUrls.length + 1, 
        //     originalUrl: body.originalUrl,
        //     shortUrl,
        //     expiresAt, 
        //     alias: body.alias || shortUrl, 
        //     clickCount: 0
        // };

        
        // this.shortUrls.push(newShortUrl);

       
        // return newShortUrl;
    }

    @Get(':shortUrl') 
    async redirectToOriginalUrl(@Param('shortUrl') shortUrl: string) : Promise<{ url: string }> {
        // const findShortUrl = this.shortUrls.find(url => url.shortUrl === shortUrl);
        

        // if (findShortUrl && findShortUrl.expiresAt > new Date()) {
        //     findShortUrl.clickCount += 1;
        //     return { url: findShortUrl.originalUrl };
        // } else {
        //     throw new NotFoundException(`Short URL with alias ${shortUrl} not found or expired`);
        // }

        const shortUrlData = await this.shortUrlService.getShortUrl(shortUrl);

        if (!shortUrlData || shortUrlData.expiresAt < new Date()) {
            throw new NotFoundException(`Short URL with alias ${shortUrl} not found or expired`);
        }

        shortUrlData.clickCount += 1;
        await this.shortUrlService.saveShortUrl(shortUrlData);

        return { url: shortUrlData.originalUrl };
    }


    @Get("/info/:shortUrl")
    async infoShortUrl(@Param("shortUrl") shortUrl: string) : Promise<IShortUrlResponse> {
        // const findShortUrl = this.shortUrls.find(url => url.shortUrl === shortUrl && url.expiresAt > new Date()) 
        // if (!findShortUrl) {
        //     return `Short URL with alias ${shortUrl} not found or expired`; 
        // }
        // return findShortUrl
        const findShortUrl = await this.shortUrlService.getShortUrl(shortUrl);
        if (!findShortUrl || findShortUrl.expiresAt < new Date()) {
            throw new NotFoundException(`Short URL with alias ${shortUrl} not found or expired`);
        }
        return findShortUrl;
    }

    @Delete("/delete/:shortUrl")
    async deleteShortUrl(@Param("shortUrl") shortUrl: string) : Promise<IShortUrlResponse> {
        return await this.shortUrlService.deleteShortUrl(shortUrl);
        // const index = this.shortUrls.findIndex(url => url.shortUrl === shortUrl);

        // if (index === -1) {
            
        //     return `Short URL with alias ${shortUrl} not found`;
        // }
    
      
        // const deletedUrl = this.shortUrls.splice(index, 1)[0];
    
       
        // return deletedUrl;
    }
}
