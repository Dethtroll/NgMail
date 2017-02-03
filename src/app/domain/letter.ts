export class Letter {
    _id: string;

    from: string;
    time: string;
    checked: boolean;

    constructor( 
        public mailbox: string,
        public subject: string,
        public body: string,
        public to: string) {}
}