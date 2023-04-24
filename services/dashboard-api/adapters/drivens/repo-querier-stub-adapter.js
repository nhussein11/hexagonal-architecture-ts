"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepoQuerierStub = void 0;
const userMock = {
    id: "1",
    name: "John Doe",
    email: "johndoe@email.com",
};
class RepoQuerierStub {
    getUser(_email) {
        return Promise.resolve(userMock);
    }
    //TODO: type _user
    createUser(_user, _password) {
        return Promise.resolve(userMock);
    }
}
exports.RepoQuerierStub = RepoQuerierStub;
