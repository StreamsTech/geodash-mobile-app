import { Injectable } from "@angular/core";
import { Notification } from "../core/notification";
import { DateTime, Header } from "ionic-angular";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpHelperService } from "./HttpHelperService";
import { TokenAuthenticationService } from "./TokenAuthenticationService";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";


@Injectable()
export class NotificationService{
    private notifications:any[];
    private totalNotification:number;
    
    constructor(private http:HttpClient,
                private httpHelper:HttpHelperService,
                private tokenService:TokenAuthenticationService
            ) {
        this.notifications = [];    
        this.notifications.push(new Notification(1, "Notification title, notification title", new Date(), true));
        this.notifications.push(new Notification(2, "Notification title, notification title", new Date(), true));
        this.notifications.push(new Notification(3, "Notification title, notification title", new Date(), false));
        this.notifications.push(new Notification(4, "Notification title, notification title", new Date(), false));
        this.notifications.push(new Notification(5, "Notification title, notification title", new Date(), true));
    }

    getNotificationCount(){
        return this.totalNotification;
    }

   
    getNotifications(offset:number, limit:number):Promise<any>{
        return new Promise(resolve=>{
            resolve(this.notifications);
            // this.tokenService.getTokens().then((header:any)=>{
            //     this.http.get(this.httpHelper.getAPIRoot()+"api/workspace_map_api/?limit="+limit+"&resource_state=pending_list&user_type=member&offset="+offset,{
            //         headers: {
            //             'Authorization':header
            //         },
            //     })
            //     .subscribe(data=>{
            //         this.totalNotification = JSON.parse(JSON.stringify(data)).meta.total_count;
            //         var result = JSON.parse(JSON.stringify(data)).objects;
            //         if (this.httpHelper.isResultEmpty(result)){
            //             resolve(this.notifications);
            //             return;
            //         }
            //         this.notifications = result;
            //         console.log(this.notifications)
            //         resolve(this.notifications);
            //         return;
            //     }, error=>{
            //         resolve(this.notifications);
            //         return;
            //     })
                
            // })
        })
    }

    denyNotification(item:Notification){
        let bodyData = new FormData();
        this.tokenService.getTokens().then((data:any)=>{
            bodyData.append('comment_subject', 'Oops! Your layer haas been denied to publish on GeoDASH system.');
            bodyData.append('comment', 'Denied from mobile app');

            this.http.post(this.httpHelper.getAPIRoot()+'maps/'+item.id+'/deny', bodyData, 
            {
                headers: {'Authorization':data}
            }).subscribe((data)=>{
            })
        });
    }

    approveNotification(item:Notification){
        var bodyData = new FormData();
        this.tokenService.getTokens().then((authorizationToken:any)=>{
            bodyData.append('view_permission', 'on');
            bodyData.append('download_permission', 'on');
            bodyData.append('comment_subject', 'Congratulations! Your Layer is Approved to Publish on GeoDASH System.');
            
            this.http.post(this.httpHelper.getAPIRoot()+'maps/'+item.id+'/approve',
                bodyData,
                {
                    observe:'response',
                    headers:{
                        'Authorization':authorizationToken
                    }
                }
            ).subscribe(data=>{
                    console.log(data);
                });
        });
    }
}