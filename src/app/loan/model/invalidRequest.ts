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


/**
 * Created response. The status shall always be 'Rejected'
 */
export interface InvalidRequest { 
    status: string;
    /**
     * Human readable reason of the rejection
     */
    reason: string;
    /**
     * reason code
     */
    reasonCode: string;
}
