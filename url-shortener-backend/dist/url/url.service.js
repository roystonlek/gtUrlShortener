"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Url_1 = require("../typeorm/entities/Url");
const short_unique_id_1 = require("short-unique-id");
const _BASE_URL = 'https://gt-url-shortener-hkz5.vercel.app/';
function isValidUrl(url) {
    try {
        return Boolean(new URL(url));
    }
    catch (e) {
        return false;
    }
}
let UrlService = class UrlService {
    constructor(urlRepository) {
        this.urlRepository = urlRepository;
    }
    async createUrl(urlDetails) {
        if (urlDetails.longUrl.length == 0) {
            throw new common_1.BadRequestException('Please Enter a Url ');
        }
        else if (!isValidUrl(urlDetails.longUrl)) {
            throw new common_1.BadRequestException('Please Enter a Valid Url ');
        }
        const uid = new short_unique_id_1.default({ length: 6 });
        let shortUrl = uid();
        let fullUrl = _BASE_URL + shortUrl;
        let check = await this.urlRepository.findOneBy({ shortUrl: fullUrl });
        while (check) {
            shortUrl = uid();
            fullUrl = _BASE_URL + shortUrl;
            check = await this.urlRepository.findOneBy({ shortUrl: fullUrl });
        }
        const newUrl = this.urlRepository.create(Object.assign(Object.assign({}, urlDetails), { shortUrl: fullUrl }));
        return this.urlRepository.save(newUrl);
    }
    async getLongUrl(shortUrl) {
        const fullUrl = _BASE_URL + shortUrl;
        const url = await this.urlRepository.findOneBy({ shortUrl: fullUrl });
        if (!url) {
            throw new common_1.NotFoundException('Url Does Not Exist');
        }
        return url.longUrl;
    }
};
UrlService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Url_1.Url)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UrlService);
exports.UrlService = UrlService;
//# sourceMappingURL=url.service.js.map