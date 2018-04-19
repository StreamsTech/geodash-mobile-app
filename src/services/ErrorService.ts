import { HttpHelperService } from './HttpHelperService';
import { Injectable } from "@angular/core";
import { Error } from "../core/error";
import { TokenAuthenticationService } from "./TokenAuthenticationService";
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/map';
import { ConstantService } from "./ConstantService";


@Injectable()
export class ErrorService {
    private errors: Error[];
    private totalErrors: number;

    constructor(private tokenService: TokenAuthenticationService,
        private http: HttpClient,
        private httpHelper: HttpHelperService,
        private constantService: ConstantService) {
        this.errors = [];
    }

    getErrorCount() {
        this.totalErrors = this.errors.length;
        return this.totalErrors;
    }

    getErrors(offset: number): Promise<any> {
        let limit = 50;
        const url ="error-reporting/logs/?limit=" + limit + "&offset=" + offset;
        return this.httpHelper.getData(url, "results", false);
        // return new Promise(resolve => {
        //     this.tokenService.getTokens().then((header: any) => {
        //         this.http.get(this.constantService.getAPIRoot() + "error-reporting/logs/?limit=" + limit + "&offset=" + offset, {
        //             headers: {
        //                 'Authorization': header
        //             },

        //         }).subscribe(data => {
        //             var result = JSON.parse(JSON.stringify(data)).results;
        //             if (this.constantService.isResultEmpty(result)) {
        //                 resolve(null);
        //             }
        //             this.errors.push(result);
        //             resolve(result);
        //         }, error => {
        //             resolve(this.errors)
        //         });
        //     })
        // })
    }

    getError(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve(this.errors.find(e => e.id == id));

        });
    }
}