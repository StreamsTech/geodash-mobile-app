import { Injectable } from "@angular/core";
import { TokenAuthenticationService } from "./TokenAuthenticationService";
import { Headers } from "@angular/http";
import { HttpHeaders } from "@angular/common/http";

@Injectable()
export class HttpHelperService {
    constructor(private tokenService: TokenAuthenticationService) {

    }
    public getAPIRoot() {
        return 'http://nsdi.streamstech.com/';
    }

    public getAuthenticationHeader(): Promise<any> {
        return new Promise((resolve) => {
            this.tokenService.getTokens().then((data: any) => {
                let header = "";
                header = 'Bearer ' + data;

                resolve(header);
                console.log("header");
                console.log(JSON.stringify(header));
                return header;
            })
        })
    }

    public isResultEmpty(result: any[]) {
        return result.length == 0;
    }
}