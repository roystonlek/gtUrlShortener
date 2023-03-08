import { CreateUrlDto } from './dtos/CreateUrl.dto';
import { UrlService } from './url.service';
export declare class UrlController {
    private readonly urlService;
    constructor(urlService: UrlService);
    getUrl(shortUrl: string, res: any): Promise<void>;
    createUrl(url: CreateUrlDto): Promise<import("../typeorm/entities/Url").Url>;
}
