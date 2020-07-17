export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
    role: string
    
    constructor (id: number, username: string, password: string, firstName: string, lastName: string, token: string, role: string){
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.token = token;
        this.role = role;
    }
}