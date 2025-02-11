import { Body, Controller, Get, Param, Post, Query, Redirect } from '@nestjs/common';
import { IShortUrl, IShortUrlCreateForm } from 'src/interface/shortUrl.interface';
import * as crypto from 'crypto';


// {
//     "originalUrl": "https://example.com",
//     "expiresAt": "2025-12-31T23:59:59Z",
//     "alias": "mycustomalias"
//   }

@Controller('shorten')
export class ShortUrlController {
    private shortUrls: IShortUrl[] = [
        {
            id: 1,
            originalUrl: "https://www.github.com/openai/gpt-3/blob/main/README.md",
            shortUrl: "url1",
            expiresAt: new Date(),
            alias: "url1",
        },
        {
            id: 2,
            originalUrl: "https://www.reddit.com/r/technology/comments/16r8kz9/latest_tech_innovation_and_its_impact_on_the/",
            shortUrl: "url2",
            expiresAt: new Date(),
            alias: "url2",
        },
        {
            id: 3,
            originalUrl: "https://www.github.com/openai/gpt-3/blob/main/README.md",
            shortUrl: "url3",
            expiresAt: new Date(),
            alias: "url3",
        },
    ];

    // @Get()
    // getAllShortsUrl() : IShortUrl[] {
    //     console.log(this.shortUrls)
    //     return this.shortUrls;  
    // }

    // @Get()
    // getShortsUrl(@Query('shortUrl') shortUrl: string) : IShortUrl | undefined {
    //     if (shortUrl) {
    //         return this.shortUrls.find(url => url.shortUrl === shortUrl);
    //     }
    // }

    @Get()
    getShortsUrl(@Query('shortUrl') shortUrl?: string): IShortUrl | IShortUrl[] {
        if (shortUrl) {
            // Если пришел shortUrl, ищем и возвращаем только его
            return this.shortUrls.find(url => url.shortUrl === shortUrl) || <IShortUrl>{};
        } else {
            // Если shortUrl не передан, возвращаем все ссылки
            return this.shortUrls;
        }
    }



    @Post()
    createShortUrl(@Body() body: IShortUrlCreateForm) : IShortUrl {
        const expiresAt = body.expiresAt ? new Date(body.expiresAt) : new Date()

       

      
        if (isNaN(expiresAt.getTime())) throw new Error("Invalid date format");
        

        const shortUrl = crypto.randomBytes(4).toString('hex'); 

       
        const newShortUrl: IShortUrl = {
            id: this.shortUrls.length + 1, 
            originalUrl: body.originalUrl,
            shortUrl,
            expiresAt, 
            alias: body.alias || shortUrl, 
        };

        
        this.shortUrls.push(newShortUrl);

       
        return newShortUrl;
    }

    @Get(':alias') 
    redirectToOriginalUrl(@Param('alias') alias: string) : { url: string } {
        const findShortUrl = this.shortUrls.find(url => url.alias === alias);
        console.log(findShortUrl)

        if (findShortUrl && findShortUrl.expiresAt > new Date()) {
            return { url: findShortUrl.originalUrl };
        } else {
            return { url: 'http://example.com/404' }; 
        }
    }


    @Get("/info/:shortUrl")
    infoShortUrl(@Param("shortUrl") shortUrl) : IShortUrl {
        return this.shortUrls.find(url => url.shortUrl === shortUrl) || <IShortUrl>{}
    }
}
