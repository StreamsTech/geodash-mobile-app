import { HttpHelperService } from './HttpHelperService';
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
    public layers: any=[];
    public count: number;

    constructor(private http: HttpClient,
        private constantService: ConstantService,
        private tokenService: TokenAuthenticationService,
        private httpHelper: HttpHelperService,
        private approveDenyAPI: ApproveDenyService
    ) {
        this.layers = [];
    }

    getLayers(): Promise<any> {
        const url ="workspace_layer_api/?user_type=admin&resource_state=user_approval_request_list";
        return this.httpHelper.getData(url, "objects", false).then(data=>{
            this.layers=data;
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