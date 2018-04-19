import { ConstantService } from './ConstantService';
import { Injectable } from "@angular/core";
import { TokenAuthenticationService } from "./TokenAuthenticationService";
import { Headers } from "@angular/http";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Storage } from '@ionic/storage';


@Injectable()
export class HttpHelperService {
    constructor(
        private tokenService: TokenAuthenticationService,
        private constantService: ConstantService,
        private localStorageService:Storage,
        private http: HttpClient) {

    }

    createAuthorizationHeader() {
        const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + this.localStorageService.getItem('token')
        });
        return headers;
    }

    getData(url) {
        this.http
            .get(this.constantService.getAPIRoot() + url, {
                headers: this.createAuthorizationHeader()
            }).map(res => res);

    }
    public getAuthenticationHeader(): Promise<any> {
        return new Promise((resolve) => {
            // this.tokenService.getTokens().then((data: any) => {
            //     let header = "";
            //     header = 'Bearer ' + data;

            //     resolve(header);
            //     console.log("header");
            //     console.log(JSON.stringify(header));
            //     return header;
            // })
        })
    }

}