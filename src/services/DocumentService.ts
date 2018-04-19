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
    public documents: any[];
    public count: number;

    constructor(private http: HttpClient,
        private constantService: ConstantService,
        private tokenService: TokenAuthenticationService,
        private approveDenyAPI: ApproveDenyService
    ) {
        this.documents = [];
    }

    getDocuments(): Promise<any> {
        return new Promise(resolve => {
            if (this.documents.length === 0) {
                this.tokenService.getTokens().then((header: any) => {
                    this.http.get(this.constantService.getAPIRoot() + "workspace_document_api/?limit=25&resource_state=user_approval_request_list&user_type=admin", {
                        headers: {
                            'Authorization': header
                        },
                    })
                        .subscribe(data => {
                            this.count = JSON.parse(JSON.stringify(data)).meta.total_count;
                            var result = JSON.parse(JSON.stringify(data)).objects;
                            if (this.constantService.isResultEmpty(result)) {
                                resolve(this.documents);
                                return;
                            }
                            this.documents = result;
                            resolve(this.documents);
                            return;
                        }, error => {
                            resolve(this.documents);
                            return;
                        })

                })
            }else{
                resolve(this.documents);
                return;
            }

        })
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