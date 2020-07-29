export class LoanError {
    public reason: string;
    public reasonCode: string;

    constructor(reason: string, reasonCode: string) {
        this.reason = reason;
        this.reasonCode = reasonCode;
    }
}
