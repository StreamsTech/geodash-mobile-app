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


    getErrors(offset: number): Promise<any> {
        let limit = 50;
        const url ="error-reporting/logs/?limit=" + limit + "&offset=" + offset;
        return this.httpHelper.getData(url, "results", false);
    }

}