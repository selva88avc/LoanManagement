/**
 * Simple Loan API
 * This is a loan API
 *
 * OpenAPI spec version: 1.0.0
 * Contact: you@your-company.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


export class Address { 
    public addressLine1: string;
    public addressLine2: string;
    public addressline3?: string;
    
    constructor(addressLine1: string, addressLine2: string, addressLine3?: string){
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.addressline3 = addressLine3;
    }
}