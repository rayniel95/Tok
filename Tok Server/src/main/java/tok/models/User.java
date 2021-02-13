package tok.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection="Users")
public class User {
    @Id String id;
    // NOTE - aqi el id puede ser el username
    public String userName;
    public int balance;
    public String password;
    String token;
  
    public User() {}

    public User(String userName, String password) {
      this.userName = userName;
      this.password = password;
    }

    public void setPassword(String password){
        this.password = password;
    }
    public String getPassword(){
        return password;
    }
    public void setUserName(String userName){
        this.userName = userName;
    }
    public String getUserName(){
        return userName;
    }
    public int getBalance(){
        return balance;
    }
    public void addBalance(int cantity){
        this.balance += cantity;
    }
    public void setBalance(int balance){
        this.balance = balance;
    }
    public String getId(){
        return id;
    }
    public String getToken(){
        return token;
    }
    public void setToken(String token){
        this.token = token;
    }
}