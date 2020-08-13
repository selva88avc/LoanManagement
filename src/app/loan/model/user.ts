import { Address } from "./address";

export class User {
    userId: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    address: Address;

    constructor(userId: number, username: string, password: string, firstName: string, lastName: string, role: string, email: string, address: Address) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.email = email;
        this.address = address;
    }
}
