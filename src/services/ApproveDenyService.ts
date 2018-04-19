import { Injectable } from "@angular/core";
import { Error } from "../core/error";
import { TokenAuthenticationService } from "./TokenAuthenticationService";
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/map';
import { ConstantService } from "./ConstantService";


@Injectable()
export class ApproveDenyService {
    constructor(private http: HttpClient,
        private constantService: ConstantService,
        private tokenService: TokenAuthenticationService
    ) {
    }

    approve(resource_pk, resource_type): any {
        return this.callAPI(resource_pk, resource_type, "approved");
    }

    deny(resource_pk, resource_type): any {
        return this.callAPI(resource_pk, resource_type, "denied")
    }

    private callAPI(resource_pk, resource_type, action): any {
        var bodyData = this.generateBodyData(resource_type, resource_pk, action);

        this.tokenService.getTokens().then((authorizationToken: any) => {
            this.http.post(this.constantService.getAPIRoot() + 'layer-map-documet-approve-deny/',
                bodyData,
                {
                    observe: 'response',
                    headers: {
                        'Authorization': authorizationToken,
                        'Content-Type': 'application/json', 
                        'Accept': 'application/json'
                    }
                }
            ).subscribe(data => {
                if (data.status === 200) {
                    return true;
                }
                return false;
            });
        }).catch(err=>{
            return false;
        });
    }

    private generateBodyData(resource_type, resource_pk, action) {
        return {
            "resource_type": resource_type,
            "resource_pk": resource_pk,
            "comment": `i approved this ${resource_type}`,
            "comment_subject": "approve comment",
            "action": action,
            "view_permission": "Yes",
            "download_permission": "Yes"
        };
    }
}