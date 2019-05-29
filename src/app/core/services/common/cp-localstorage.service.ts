import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../../../config/storage_keys.config";
import { Token } from "../../interfaces/token";
import { User } from "../../models/user";

//Criar Modulo
@Injectable()
export class CpLocalStorageService {

    setToken(token: Token) {
        if (token == null) {
            localStorage.removeItem(STORAGE_KEYS.TOKEN);
        } else {
            localStorage.setItem(STORAGE_KEYS.TOKEN, JSON.stringify(token));
        }
    }

    getToken(): Token {
        let token = localStorage.getItem(STORAGE_KEYS.TOKEN);
        if (token == null) {
            return null;
        } else {
            return JSON.parse(token);
        }
    }

    getLoggedUser(): User {
        let user: User;
        let token: Token = this.getToken();
        if (token) {
            if (Array.isArray(token))
                user = token[0].user;
            else
                user = token.user;
        }
        return user;
    }

    clearToken() {
        this.setToken(null);
    }

}
