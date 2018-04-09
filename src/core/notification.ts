import { DateTime } from "ionic-angular";

export class Notification {
    meta: any;
    objects: any[];
    constructor(public id: number, public abstract: string, public date_created: Date, public hasAction?: boolean) {
    }
}