// import { Test, TestingModule } from '@nestjs/testing';
// import { ShortUrlController } from './shorten.controller';
// import { IShortUrlCreateForm, IShortUrlResponse, IRedirectToOriginUrl } from 'src/interface/shortUrl.interface';
// import { NotFoundException } from '@nestjs/common';

// describe('ShortUrlController', () => {
//   let controller: ShortUrlController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [ShortUrlController],
//     }).compile();

//     controller = module.get<ShortUrlController>(ShortUrlController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });

//   describe('createShortUrl', () => {
//     it('should create a short URL successfully', () => {
//       const createDto: IShortUrlCreateForm = {
//         originalUrl: 'https://example.com',
//         expiresAt: new Date('2025-12-31T23:59:59Z'),
//         alias: 'mycustomalias',
//       };

//       const result: IShortUrlResponse = controller.createShortUrl(createDto);

//       expect(result).toHaveProperty('id');
//       expect(result).toHaveProperty('originalUrl', 'https://example.com');
//       expect(result).toHaveProperty('alias', 'mycustomalias');
//       expect(result).toHaveProperty('clickCount', 0);
//       expect(result).toHaveProperty('expiresAt');
//       expect(result.expiresAt).toBeInstanceOf(Date);
//       expect(result).toHaveProperty('shortUrl');
//     });
//   });

//   describe('redirectToOriginalUrl', () => {
//     it('should redirect to the original URL if the short URL exists and is not expired', () => {
//       const createDto: IShortUrlCreateForm = {
//         originalUrl: 'https://example.com',
//         expiresAt: new Date('2025-12-31T23:59:59Z'),
//         alias: 'mycustomalias',
//       };
//       const newShortUrl = controller.createShortUrl(createDto);

//       const result: IRedirectToOriginUrl = controller.redirectToOriginalUrl(newShortUrl.shortUrl);

//       expect(result).toHaveProperty('url', 'https://example.com');
//     });


    
//     it('should throw a 404 error if the short URL is not found or is expired', () => {
//       const result = () => controller.redirectToOriginalUrl('nonexistentalias');
//       expect(result).toThrowError(NotFoundException);
//     });
    
//   });

//   describe('infoShortUrl', () => {
//     it('should return information about the short URL if it exists', () => {
//       const createDto: IShortUrlCreateForm = {
//         originalUrl: 'https://example.com',
//         expiresAt: new Date('2025-12-31T23:59:59Z'),
//         alias: 'mycustomalias',
//       };
//       const newShortUrl = controller.createShortUrl(createDto);

  
//       const result: IShortUrlResponse | string = controller.infoShortUrl(newShortUrl.shortUrl);

//       expect(result).toHaveProperty('originalUrl', 'https://example.com');
//       expect(result).toHaveProperty('clickCount', 0);
//       expect(result).toHaveProperty('expiresAt');
//       expect(result).toHaveProperty('id');
//       expect(result).toHaveProperty('shortUrl');
//     });

//     it('should return error if the short URL does not exist or is expired', () => {
//       const result = controller.infoShortUrl('nonexistentalias');

//       expect(result).toBe('Short URL with alias nonexistentalias not found or expired');
//     });
//   });

//   describe('deleteShortUrl', () => {
//     it('should delete the short URL successfully', () => {
//       const createDto: IShortUrlCreateForm = {
//         originalUrl: 'https://example.com',
//         expiresAt: new Date('2025-12-31T23:59:59Z'),
//         alias: 'mycustomalias',
//       };
//       const newShortUrl = controller.createShortUrl(createDto);


//       const result: IShortUrlResponse | string = controller.deleteShortUrl(newShortUrl.shortUrl);

//       expect(result).toHaveProperty('shortUrl', newShortUrl.shortUrl);
//       expect(result).toHaveProperty('originalUrl', 'https://example.com');
//     });

//     it('should return an error message if the short URL does not exist', () => {
//       const result = controller.deleteShortUrl('nonexistentalias');

//       expect(result).toBe('Short URL with alias nonexistentalias not found');
//     });
//   });
// });



import { Test, TestingModule } from '@nestjs/testing';
import { ShortUrlController } from './shorten.controller';
import { ShortUrlService } from './shorten.service';
import { NotFoundException } from '@nestjs/common';
import { IShortUrlCreateForm, IShortUrlResponse } from 'src/interface/shortUrl.interface';

// Мокаем ShortUrlService
const mockShortUrlService = {
  createShortUrl: jest.fn(),
  getShortUrl: jest.fn(),
  getAllShortUrls: jest.fn(),
  deleteShortUrl: jest.fn(),
  saveShortUrl: jest.fn(),
};

describe('ShortUrlController', () => {
  let controller: ShortUrlController;
  let service: ShortUrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShortUrlController],
      providers: [
        {
          provide: ShortUrlService,
          useValue: mockShortUrlService,
        },
      ],
    }).compile();

    controller = module.get<ShortUrlController>(ShortUrlController);
    service = module.get<ShortUrlService>(ShortUrlService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getShortsUrl', () => {
    it('should return an array of short URLs', async () => {
      const result: IShortUrlResponse[] = [
        {
          id: 1,
          originalUrl: 'https://example.com',
          shortUrl: 'short1',
          expiresAt: new Date(),
          alias: 'short1',
          clickCount: 0,
        },
      ];
      mockShortUrlService.getAllShortUrls.mockResolvedValue(result);

      expect(await controller.getShortsUrl()).toBe(result);
    });

    it('should return a single short URL by alias', async () => {
      const result: IShortUrlResponse = {
        id: 1,
        originalUrl: 'https://example.com',
        shortUrl: 'short1',
        expiresAt: new Date(),
        alias: 'short1',
        clickCount: 0,
      };

      mockShortUrlService.getShortUrl.mockResolvedValue(result);

      expect(await controller.getShortsUrl('short1')).toBe(result);
    });

    it('should throw NotFoundException when short URL is not found', async () => {
      mockShortUrlService.getShortUrl.mockResolvedValue(null);

      try {
        await controller.getShortsUrl('nonexistent');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Short URL with alias nonexistent not found');
      }
    });
  });

  // describe('createShortUrl', () => {
  //   it('should create a new short URL', async () => {
  //     const createDto = {
  //       originalUrl: 'https://example.com',
  //       expiresAt: '2025-12-31T23:59:59Z',
  //       alias: 'mycustomalias',
  //     };

  //     const result: IShortUrlResponse = {
  //       id: 1,
  //       originalUrl: 'https://example.com',
  //       shortUrl: 'abcd1234',
  //       expiresAt: new Date(),
  //       alias: 'mycustomalias',
  //       clickCount: 0,
  //     };

  //     mockShortUrlService.createShortUrl.mockResolvedValue(result);

  //     expect(await controller.createShortUrl(createDto)).toBe(result);
  //   });
  // });

  describe('redirectToOriginalUrl', () => {
    it('should return original URL when short URL is valid', async () => {
      const result: IShortUrlResponse = {
        id: 1,
        originalUrl: 'https://example.com',
        shortUrl: 'short1',
        expiresAt: new Date(),
        alias: 'short1',
        clickCount: 0,
      };

      mockShortUrlService.getShortUrl.mockResolvedValue(result);

      const redirectResponse = await controller.redirectToOriginalUrl('short1');
      expect(redirectResponse.url).toBe('https://example.com');
    });

    it('should throw NotFoundException when short URL is expired or not found', async () => {
      mockShortUrlService.getShortUrl.mockResolvedValue(null);

      try {
        await controller.redirectToOriginalUrl('nonexistent');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Short URL with alias nonexistent not found or expired');
      }
    });
  });

  describe('deleteShortUrl', () => {
    it('should delete the short URL and return it', async () => {
      const result: IShortUrlResponse = {
        id: 1,
        originalUrl: 'https://example.com',
        shortUrl: 'short1',
        expiresAt: new Date(),
        alias: 'short1',
        clickCount: 0,
      };

      mockShortUrlService.deleteShortUrl.mockResolvedValue(result);

      expect(await controller.deleteShortUrl('short1')).toBe(result);
    });

    it('should throw NotFoundException when short URL does not exist', async () => {
      mockShortUrlService.deleteShortUrl.mockResolvedValue(null);

      try {
        await controller.deleteShortUrl('nonexistent');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Short URL with alias nonexistent not found');
      }
    });
  });
});
