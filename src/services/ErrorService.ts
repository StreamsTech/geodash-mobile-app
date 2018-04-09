import { Injectable } from "@angular/core";
import { Error } from "../core/error";
import { TokenAuthenticationService } from "./TokenAuthenticationService";
import { HttpClient } from "@angular/common/http";
import { HttpHelperService } from "./HttpHelperService";
import 'rxjs/add/operator/map';


@Injectable()
export class ErrorService {
    private errors: Error[];
    private totalErrors: number;

    constructor(private tokenService: TokenAuthenticationService,
        private http: HttpClient,
        private httpHelper: HttpHelperService) {
        this.errors = [];
        this.errors.push(new Error(1, "error message 1", "error details message and items. error details message and items. error details message and items. error details message and items. error details message and items, error details message and items. error details message and items. error details message and items. error details message and items. error details message and items", new Date()));
        this.errors.push(new Error(2, "error message 1", "error details message and items. error details message and items. error details message and items. error details message and items. error details message and items, error details message and items. error details message and items. error details message and items. error details message and items. error details message and items", new Date()));
        this.errors.push(new Error(3, "error message 1", "error details message and items. error details message and items. error details message and items. error details message and items. error details message and itemss, error details message and items. error details message and items. error details message and items. error details message and items. error details message and items", new Date()));
        this.errors.push(new Error(4, "error message 4", "error details message and items. error details message and items. error details message and items. error details message and items. error details message and items, error details message and items. error details message and items. error details message and items. error details message and items. error details message and items", new Date()));
         
    }
    getErrorCount() {
        this.totalErrors = this.errors.length;
        return this.totalErrors;
    }

    getErrors(offset: number): Promise<any> {
        let limit = 50;

        return new Promise(resolve => {
            resolve(this.errors);
            // this.tokenService.getTokens().then((header: any) => {
            //     this.http.get(this.httpHelper.getAPIRoot() + "api/error-reporting/logs/?limit=" + limit + "&offset=" + offset, {
            //         headers: {
            //             'Authorization': header
            //         },

            //     }).subscribe(data => {
            //         var result = JSON.parse(JSON.stringify(data)).results;
            //         if (this.httpHelper.isResultEmpty(result)) {
            //             resolve(null);
            //         }
            //         this.errors.push(result);
            //         resolve(result);
            //     }, error => {
            //         resolve(this.errors)
            //     });
            // })
        })
    }

    getError(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve(this.errors.find(e => e.id == id));

        });
    }
}