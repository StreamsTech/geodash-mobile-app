export class Error {

    constructor(public id: number,
        public msg: string,
        public trace: string,
        public create_datetime: Date) {

    }
}