export class Crypto {
    crypto: number;
    wallet: number
    public constructor(wallet: number, crypto: number){
        this.crypto = crypto;
        this.wallet = wallet;
    }

    public getCrypto(): number{
        return this.crypto
    }
    public getWallet(): number{
        return this.wallet;
    }
}