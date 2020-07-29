import { Address } from "./address";

export class User {
    userId: number;
    userName: string;
    passWord: string;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    address: Address;

    constructor(userId: number, userName: string, passWord: string, firstName: string, lastName: string, role: string, email: string, address: Address) {
        this.userId = userId;
        this.userName = userName;
        this.passWord = passWord;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.email = email;
        this.address = address;
    }
}
