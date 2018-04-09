import { Login } from "../core/login";
import { Storage } from '@ionic/storage';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHelperService } from "./HttpHelperService";

@Injectable()
export class TokenAuthenticationService {

    constructor(private storage: Storage,
        private http: HttpClient,
    ) { }
    public clearToken() {
        this.storage.clear();
    }
    public renewToken(): Promise<any> {
        return new Promise(resolve => {
            this.storage.get("token").then(loginData => {
                console.log("get data from renew() " + JSON.stringify(loginData));

                this.http.get('http://172.16.0.237:8000/api/access-token/',
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
                resolve('Bearer ' + data.token);
            })
        })
    }

    public getToken(resolve: (value?: boolean | PromiseLike<boolean>) => void) {
        this.storage.get("token").then((data) => {
            if (data) {
                resolve(true);
                return;
            }
            resolve(false);
        });
    }
}