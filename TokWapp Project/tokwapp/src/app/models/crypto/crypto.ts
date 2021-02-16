export class Crypto {
    crypto: number;

    public constructor(crypto: number){
        this.crypto = crypto;
    }

    public getCrypto(): number{
        return this.crypto
    }
}