import { Contact } from './../../domain/contact'

export class ContactDto extends Contact {
    newFullName: string;
    newEmail: string;

    constructor(fullName: string, email: string, id: string = undefined) {
        super(fullName, email, id);

        this.newFullName = fullName;
        this.newEmail = email;
    }

    cancelEdit(): void {
        this.newFullName = this.fullName;
        this.newEmail = this.email;
    }
}