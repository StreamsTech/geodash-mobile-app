import { StatusBar } from '@ionic-native/status-bar';
import { Injectable } from "@angular/core";
import { Notification } from "../core/notification";
import { DateTime, Header } from "ionic-angular";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TokenAuthenticationService } from "./TokenAuthenticationService";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { ConstantService } from "./ConstantService";
import { ApproveDenyService } from "./ApproveDenyService";


@Injectable()
export class LayersService {
    public layers: any[]=[];
    public count: number;

    constructor(private http: HttpClient,
        private constantService: ConstantService,
        private tokenService: TokenAuthenticationService,
        private approveDenyAPI: ApproveDenyService
    ) {
        this.layers = [];
    }

    getLayers(): Promise<any> {
        return new Promise(resolve => {
            if (this.layers.length === 0) {
                this.tokenService.getTokens().then((header: any) => {
                    this.http.get(this.constantService.getAPIRoot() + "workspace_layer_api/?user_type=admin&resource_state=user_approval_request_list", {
                        headers: {
                            'Authorization': header
                        },
                    })
                        .subscribe(data => {
                            this.count = JSON.parse(JSON.stringify(data)).meta.total_count;
                            var result = JSON.parse(JSON.stringify(data)).objects;
                            if (this.constantService.isResultEmpty(result)) {
                                resolve(this.layers);
                                return;
                            }
                            this.layers = result;
                            resolve(this.layers);
                            return;
                        }, error => {
                            resolve(this.layers);
                            return;
                        })

                })
            } else {
                resolve(this.layers);
                return;
            }
        })

    }

    deny(item: any) {
        this.approveDenyAPI.deny(item.id, "layer");
        this.layers = this.constantService.removeItemFromList(this.layers, item);
        
    }

    approve(item: any) {
        this.approveDenyAPI.approve(item.id, "layer");
        this.layers = this.constantService.removeItemFromList(this.layers, item);
    }
}