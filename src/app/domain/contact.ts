export class Contact{
    _id: string;

    isEdditing: boolean;
    isChecked: boolean;

    constructor(public fullName: string, public email: string, id: string = undefined){
        this._id = id;
    }
}