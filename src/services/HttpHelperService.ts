import { ConstantService } from './ConstantService';
import { Injectable } from "@angular/core";
import { TokenAuthenticationService } from "./TokenAuthenticationService";
import { Headers } from "@angular/http";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Storage } from '@ionic/storage';


@Injectable()
export class HttpHelperService {
    constructor(private tokenService: TokenAuthenticationService,
        private constantService: ConstantService,
        private http: HttpClient) {

    }

    getData(url, objectMapper: string, decorateDate = false) {
        let items = [];
        return new Promise(resolve => {
            this.tokenService.getTokens().then((header: any) => {
                this.http.get(this.constantService.getAPIRoot() + url, {
                    headers: {
                        'Authorization': header
                    },
                })
                    .subscribe(data => {
                        var result = data[objectMapper];
                        let date = new Date().getTime();
                        if (decorateDate) {
                            this.decorateDateObject(result, date);
                        }
                        if (this.constantService.isResultEmpty(result)) {
                            resolve(items);
                            return items;
                        }
                        items = result;
                        resolve(items);
                        return items;
                    }, error => {
                        resolve(items);
                        return items;
                    })

            })
        })
    }

    private decorateDateObject(result: any[], date: number) {
        for (let item of result) {
            let itemDate = new Date(item.date).getTime();
            let timeDiffrence: number = date - itemDate;
            let hours: number = timeDiffrence / (1000 * 60 * 60);
            var days: any = parseInt((hours / 24).toString());
            hours = parseInt((hours % 24).toString());
            if (days > 0) {
                item.date = days + " Days";
            }
            if (hours > 0) {
                item.date += " and " + hours + " Hours";
            }
            item.date += " ago";
        }
    }
}