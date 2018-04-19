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
        return new Promise(resolve => {
            this.tokenService.getTokens().then((header: any) => {
                this.http.get(this.constantService.getAPIRoot() + "workspace_map_api/?limit=" + limit + "&resource_state=pending_list&user_type=member&offset=" + offset, {
                    headers: {
                        'Authorization': header
                    },
                })
                    .subscribe(data => {
                        this.totalNotification = JSON.parse(JSON.stringify(data)).meta.total_count;
                        var result = JSON.parse(JSON.stringify(data)).objects;
                        let date = new Date().getTime();

                        this.decorateDateObject(result, date);
                        if (this.constantService.isResultEmpty(result)) {
                            resolve(this.notifications);
                            return;
                        }
                        this.notifications = result;
                        resolve(this.notifications);
                        return;
                    }, error => {
                        resolve(this.notifications);
                        return;
                    })

            })
        })
    }


    private decorateDateObject(result: any, date: number) {
        for (let item of result) {
            let itemDate = new Date(item.date).getTime();
            let timeDiffrence: number = date - itemDate;
            let hours: number = timeDiffrence / (1000 * 60 * 60);
            var days: any = parseInt((hours / 24).toString());
            hours = parseInt((hours % 24).toString());
            if (days > 0) {
                item.date = days + " Days";
            }
            if (hours > 0) {
                item.date += " and " + hours + " Hours";
            }
            item.date += " ago";
        }
    }
}