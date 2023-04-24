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
exports.DashboardApi = void 0;
class DashboardApi {
    constructor(controlAuthenticator, repoQuerier) {
        this.controlAuthenticator = controlAuthenticator;
        this.repoQuerier = repoQuerier;
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const authenticationDetails = yield this.controlAuthenticator.getAuthenticationDetails(email, password);
            const permissions = yield this.controlAuthenticator.getPermissions(email, password);
            const user = yield this.repoQuerier.getUser(email);
            console.log("Login: ", user);
            return Object.assign(Object.assign(Object.assign({}, user), authenticationDetails), permissions);
        });
    }
    register(user, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = yield this.repoQuerier.createUser(user, password);
            const { email } = newUser;
            const authenticationDetails = yield this.controlAuthenticator.getAuthenticationDetails(email, password);
            const permissions = yield this.controlAuthenticator.getPermissions(email, password);
            console.log("REGISTER: ", newUser);
            return Object.assign(Object.assign(Object.assign({}, newUser), authenticationDetails), permissions);
        });
    }
}
exports.DashboardApi = DashboardApi;
