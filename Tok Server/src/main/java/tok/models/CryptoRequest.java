package tok.models;


public class CryptoRequest {
    int crypto;
    int wallet;

    public int getCrypto(){
        return crypto;
    }
    public int getWallet(){
        return wallet;
    }
    public void setWallet(int wallet){
        wallet = wallet;
    }
    public void setCrypto(int crypto){
        this.crypto=crypto;
    }
}