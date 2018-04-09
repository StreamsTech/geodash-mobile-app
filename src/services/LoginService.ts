import { Login } from "../core/login";
import { Storage } from '@ionic/storage';
import { Injectable } from "@angular/core";
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TokenAuthenticationService } from "./TokenAuthenticationService";
import { HttpHelperService } from "./HttpHelperService";

@Injectable()
export class LoginService {
    constructor(private storage: Storage,
        private http: HttpClient,
        private httpHelper: HttpHelperService,
        private authenticationService: TokenAuthenticationService) {
    }

    IsAuthenticate(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.authenticationService.getToken(resolve);
        });
    }

    Login(login: Login): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.checkUserIdentity(login).then((data) => {
                if (data) {
                    resolve(true);
                    return;
                }
                resolve(false);
            }).catch(data => {
                resolve(false);
            })
        });
    }

    checkUserIdentity(login: Login): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.http.get(this.httpHelper.getAPIRoot() + 'api/access-token/',
                {
                    headers: { 'user': login.username, 'password': login.password }
                })
                .subscribe(data => {
                    this.userAuthentication(data, resolve, login);
                }, error => {
                    resolve(false);
                });
        })
    }

    private userAuthentication(data: Object, resolve: (value?: boolean | PromiseLike<boolean>) => void, login: Login) {
        var result: any[];
        result = JSON.parse(JSON.stringify(data)).objects;
        if (this.isResultEmpty(result)) {
            resolve(false);
            return;
        }
        login.token = result[0].token;
        this.authenticationService.setToken(login, resolve)
    }

    private isResultEmpty(result: any[]) {
        return result.length == 0;
    }
}