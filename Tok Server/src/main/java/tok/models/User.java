package tok.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection="Users")
public class User {
    @Id String id;

    String userName;
    int balance;
    String password;
  
    public User() {}

    public User(String userName, String password) {
      this.userName = userName;
      this.password = password;
      this.balance = 0;
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
}