import { Injectable } from "@angular/core";
import { Error } from "../core/error";
import { TokenAuthenticationService } from "./TokenAuthenticationService";
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/map';
import { ToastController } from "ionic-angular";


@Injectable()
export class ConstantService {

    constructor(private toastCtrl: ToastController) {
    }
    public getAPIRoot() {
        return 'https://geodash.gov.bd/api/';
    }

    removeItemFromList(list: any[], item: any) {
        var index = list.indexOf(item, 0);
        if (index > -1) {
            list.splice(index, 1);
        }
        return list;
    }

    displayToast(message, duration: number = 3000) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: duration
        })
        toast.present();
    }

    public isResultEmpty(result: any[]) {
        return result.length == 0;
    }
}