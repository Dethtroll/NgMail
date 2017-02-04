export class Letter {
    _id: string;
    mailbox: string;

    get from(): string { return this.to; }
    time: string;
    checked: boolean;

    constructor(
        public subject: string,
        public body: string,
        public to: string,
        mailBox: string = undefined,
        id: string = undefined) {
            this.mailbox = mailBox;
            this._id = id;
        }
}