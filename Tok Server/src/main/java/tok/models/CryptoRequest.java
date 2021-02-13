package tok.models;


public class CryptoRequest {
    private String crypto;
    private String userName;
    private String password;

    public CryptoRequest(String userName, String password, 
    String crypto){
        this.crypto = crypto;
        this.userName = userName;
        this.password = password;
    }
    public String getCrypto(){
        return crypto;
    }
    public void setCrypto(String crypto){
        this.crypto = crypto;
    }
    public String getPassword(){
        return password;
    }
    public void setPassword(String password){
        this.password = password;
    }
    public String getUserName(){
        return userName;
    }
    public void setUserName(String userName){
        this.userName = userName;
    }
}