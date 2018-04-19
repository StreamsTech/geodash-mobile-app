import { Injectable } from "@angular/core";
import { DateTime } from "ionic-angular";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TokenAuthenticationService } from "./TokenAuthenticationService";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { ConstantService } from "./ConstantService";


@Injectable()
export class MapService {
    public maps: any[] = [];
    public count: number;

    constructor(private http: HttpClient,
        private constantService: ConstantService,
        private tokenService: TokenAuthenticationService
    ) {
        this.maps = [];
    }

    getMaps(): Promise<any> {
        return new Promise(resolve => {
            if (this.maps.length === 0) {
                this.tokenService.getTokens().then((header: any) => {
                    this.http.get(this.constantService.getAPIRoot() + "workspace_map_api/?limit=25&resource_state=user_approval_request_list&user_type=admin", {
                        headers: {
                            'Authorization': header
                        },
                    })
                        .subscribe(data => {
                            this.count = JSON.parse(JSON.stringify(data)).meta.total_count;
                            var result = JSON.parse(JSON.stringify(data)).objects;
                            if (this.constantService.isResultEmpty(result)) {
                                resolve(this.maps);
                                return;
                            }
                            this.maps = result;
                            console.log(this.maps)
                            resolve(this.maps);
                            return;
                        }, error => {
                            resolve(this.maps);
                            return;
                        })

                })
            } else {
                resolve(this.maps);
                return;
            }

        })
    }

    denyNotification(item: any) {
        let bodyData = new FormData();
        this.tokenService.getTokens().then((data: any) => {
            bodyData.append('comment_subject', 'Oops! Your layer haas been denied to publish on GeoDASH system.');
            bodyData.append('comment', 'Denied from mobile app');

            this.http.post(this.constantService.getAPIRoot() + 'maps/' + item.id + '/deny', bodyData,
                {
                    headers: { 'Authorization': data }
                }).subscribe((data) => {
                })
        });
    }

    approveMap(item: any) {
        var bodyData = new FormData();
        this.tokenService.getTokens().then((authorizationToken: any) => {
            bodyData.append('resource_type', "map");
            bodyData.append('view_permission', "Yes");
            bodyData.append('resource_pk ', item.id);
            bodyData.append('download_permission', 'Yes');
            bodyData.append('action', 'approve');
            bodyData.append('comment_subject', 'Congratulations! Your Layer is Approved to Publish on GeoDASH System.');
            bodyData.append('comment', 'Congratulations! Your Layer is Approved to Publish on GeoDASH System.');

            this.http.post(this.constantService.getAPIRoot() + 'maps/' + item.id + '/approve',
                bodyData,
                {
                    observe: 'response',
                    headers: {
                        'Authorization': authorizationToken
                    }
                }
            ).subscribe(data => {
                console.log(data);
            });
        });
    }
}