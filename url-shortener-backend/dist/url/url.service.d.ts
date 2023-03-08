import { CreateUrlParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import { Url } from '../typeorm/entities/Url';
export declare class UrlService {
    private urlRepository;
    constructor(urlRepository: Repository<Url>);
    createUrl(urlDetails: CreateUrlParams): Promise<Url>;
    getLongUrl(shortUrl: string): Promise<string>;
}
