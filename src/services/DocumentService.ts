import { HttpHelperService } from './HttpHelperService';
import { Injectable } from "@angular/core";
import { DateTime } from "ionic-angular";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TokenAuthenticationService } from "./TokenAuthenticationService";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { ConstantService } from "./ConstantService";
import { ApproveDenyService } from "./ApproveDenyService";


@Injectable()
export class DocumentService {
    public documents: any=[];
    public count: number;

    constructor(private http: HttpClient,
        private constantService: ConstantService,
        private tokenService: TokenAuthenticationService,
        private httpHelper: HttpHelperService,
        private approveDenyAPI: ApproveDenyService
    ) {
        this.documents = [];
    }

    getDocuments(): Promise<any> {
        const url = "workspace_document_api/?limit=25&resource_state=user_approval_request_list&user_type=admin";
        return this.httpHelper.getData(url, "objects", false).then(data => {
            this.documents = data;
        });
    }

    deny(item: any) {
        this.approveDenyAPI.deny(item.id, "document");
        this.documents = this.constantService.removeItemFromList(this.documents, item);
        
    }

    approve(item: any) {
        this.approveDenyAPI.approve(item.id, "document");
        this.documents = this.constantService.removeItemFromList(this.documents, item);
        
    }
}