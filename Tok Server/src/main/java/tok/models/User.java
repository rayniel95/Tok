package tok.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.lang.IndexOutOfBoundsException;
import java.util.List;
import java.util.ArrayList;



@Document(collection="Users")
public class User {
    @Id String id;

    String userName;
    String password;
    List<Integer> wallets;
    
    public User() {}

    public User(String userName, String password) {
      this.userName = userName;
      this.password = password;
      this.wallets = new ArrayList<Integer>();
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
    public int getBalanceWallet(int wallet){
        if(wallet < getWalletSize()){
            return this.wallets.get(wallet);
        }
        throw new IndexOutOfBoundsException();
    }
    public void addBalance(int wallet, int cantity){
        if(wallet < getWalletSize()){
            this.wallets.set(wallet, this.wallets.get(wallet) + cantity);
            return;
        }
        throw new IndexOutOfBoundsException();
    }
    public void setBalance(int wallet, int balance){
        if(wallet < getWalletSize()){
            this.wallets.set(wallet, balance);
            return;
        }
        throw new IndexOutOfBoundsException();
    }
    public int getWalletSize() {
        return this.wallets.size();
    }
    public void createWallet(){
        wallets.add(0);
    }
    public String getId(){
        return id;
    }
}