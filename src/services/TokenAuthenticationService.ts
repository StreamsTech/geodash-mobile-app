import { Login } from "../core/login";
import { Storage } from '@ionic/storage';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHelperService } from "./HttpHelperService";
import { ConstantService } from "./ConstantService";

@Injectable()
export class TokenAuthenticationService {

    constructor(private storage: Storage,
        private http: HttpClient,
        private constantService: ConstantService
    ) { }
    public clearToken() {
        this.storage.clear();
    }
    public renewToken(): Promise<any> {
        return new Promise(resolve => {
            this.storage.get("token").then(loginData => {
                console.log("get data from renew() " + JSON.stringify(loginData));

                this.http.get(this.constantService.getAPIRoot() + 'api/access-token/',
                    {
                        headers: { 'user': loginData.username, 'password': loginData.password }
                    })
                    .subscribe((data: any) => {
                        loginData.token = data.objects[0].token;
                        this.storage.set("token", loginData).then(() => {
                            resolve(true);
                        });

                    });
            }).catch(data => {
                resolve(false);
            })

        })
    }

    public setToken(login: Login, resolve: (value?: boolean | PromiseLike<boolean>) => void) {
        this.storage.set("token", login).then(() => {
            console.log("set toekn:" + JSON.stringify(login));
            resolve(true);
        });
    }

    public getTokens() {
        return new Promise((resolve) => {
            this.storage.get("token").then(data => {
                if (data) {
                    resolve('Bearer ' + data.token);
                } else {
                    resolve(false);
                }
            })
        })
    }

    public getToken(resolve: (value?: boolean | PromiseLike<boolean>) => void) {
        this.storage.get("token").then((data) => {
            if (data) {
                resolve(true);
                return;
            }else{
                resolve(false);
                return;
            }
        });
    }

    public getAuthenticationHeader(): Promise<any> {
        return new Promise((resolve) => {
            this.getTokens().then((data: any) => {
                let header = "";
                header = 'Bearer ' + data;

                resolve(header);
                console.log("header");
                console.log(JSON.stringify(header));
                return header;
            })
        })
    }
}