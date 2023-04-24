"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlAuthenticatorStub = void 0;
const authenticationDetailsMock = {
    token: "token",
    refreshToken: "refreshToken",
};
const permissionsMock = {
    admin: true,
    user: true,
};
class ControlAuthenticatorStub {
    constructor() {
        this.getAuthenticationDetails = (_email, _password) => __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(authenticationDetailsMock);
        });
        this.getPermissions = (_email, _password) => __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(permissionsMock);
        });
    }
}
exports.ControlAuthenticatorStub = ControlAuthenticatorStub;
