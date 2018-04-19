import { Injectable } from "@angular/core";
import { Notification } from "../core/notification";
import { DateTime, Header } from "ionic-angular";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpHelperService } from "./HttpHelperService";
import { TokenAuthenticationService } from "./TokenAuthenticationService";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { ConstantService } from "./ConstantService";


@Injectable()
export class NotificationService {
    private notifications: any[];
    private totalNotification: number;

    constructor(private http: HttpClient,
        private httpHelper: HttpHelperService,
        private constantService: ConstantService,
        private tokenService: TokenAuthenticationService
    ) {
        this.notifications = [];
    }

    getNotificationCount() {
        return this.totalNotification;
    }

    getNotifications(offset: number, limit: number): Promise<any> {
        const url ="workspace_map_api/?limit=" + limit + "&resource_state=pending_list&user_type=member&offset=" + offset;
        return this.httpHelper.getData(url, "objects", true);
    }


    
}