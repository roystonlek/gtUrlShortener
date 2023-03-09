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
exports.UrlController = void 0;
const common_1 = require("@nestjs/common");
const CreateUrl_dto_1 = require("./dtos/CreateUrl.dto");
const url_service_1 = require("./url.service");
let UrlController = class UrlController {
    constructor(urlService) {
        this.urlService = urlService;
    }
    async getUrl(shortUrl, res) {
        const longUrl = await this.urlService.getLongUrl(shortUrl);
        res.header('Location', longUrl);
        res.status(301).send();
    }
    createUrl(url) {
        return this.urlService.createUrl(url);
    }
};
__decorate([
    (0, common_1.Get)(':shortUrl'),
    __param(0, (0, common_1.Param)('shortUrl')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "getUrl", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUrl_dto_1.CreateUrlDto]),
    __metadata("design:returntype", void 0)
], UrlController.prototype, "createUrl", null);
UrlController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [url_service_1.UrlService])
], UrlController);
exports.UrlController = UrlController;
//# sourceMappingURL=url.controller.js.map