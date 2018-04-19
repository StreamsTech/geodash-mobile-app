import { Login } from "../core/login";
import { Storage } from '@ionic/storage';
import { Injectable } from "@angular/core";
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenAuthenticationService } from "./TokenAuthenticationService";
import { ConstantService } from "./ConstantService";

@Injectable()
export class LoginService {
    constructor(private storage: Storage,
        private http: HttpClient,
        private constantService: ConstantService,
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
        let headers = {
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        };
        let body = {
            'user': login.username, 'password': login.password
        };
        return new Promise((resolve, reject) => {
            this.http.post(this.constantService.getAPIRoot() + 'access-token/', body, headers).subscribe(data => {
                this.userAuthentication(data, resolve, login);
            }, error => {
                resolve(false);
            });
        })
    }

    private userAuthentication(data: any, resolve: (value?: boolean | PromiseLike<boolean>) => void, login: Login) {
        var result: any[];
        
        if (data === null) {
            resolve(false);
            return;
        }
        login.token = data.token;
        this.authenticationService.setToken(login, resolve)
    }

}