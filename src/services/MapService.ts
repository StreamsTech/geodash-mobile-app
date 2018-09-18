import { ApproveDenyService } from './ApproveDenyService';
import { HttpHelperService } from './HttpHelperService';
import { Injectable } from "@angular/core";
import { DateTime } from "ionic-angular";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TokenAuthenticationService } from "./TokenAuthenticationService";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { ConstantService } from "./ConstantService";


@Injectable()
export class MapService {
    public maps: any = [];
    public count: number;

    constructor(private constantService: ConstantService,
        private httpHelper: HttpHelperService,
        private approveDenyAPI: ApproveDenyService
    ) {
        this.maps = [];
    }

    getMaps(): Promise<any> {
        const url = "workspace_map_api/?limit=25&resource_state=user_approval_request_list&user_type=admin";
        return this.httpHelper.getData(url, "objects", false).then(data => {
            this.maps = data;
        });
    }

    deny(item: any) {
        this.approveDenyAPI.deny(item.id, "map");
        this.maps = this.constantService.removeItemFromList(this.maps, item);
    }

    approve(item: any) {
        this.approveDenyAPI.approve(item.id, "map");
        this.maps = this.constantService.removeItemFromList(this.maps, item);
    }
}