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


export class Lien { 
    public name: string;
    public creatTime: Date;
    public resourceType: string;
    public resourceValue: number;

    constructor (name: string, creatTime: Date, resourceType: string, resourceValue: number){
        this.name = name;
        this.creatTime = creatTime;
        this.resourceType = resourceType;
        this.resourceValue = resourceValue;
    }
}