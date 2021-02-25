package tok.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.lang.IndexOutOfBoundsException;
import java.util.List;
import java.util.ArrayList;


/*
    Modelo usuario, esta es la informacion del usuario que sera almacenada
    en la base de datos, notar que se utiliza como identificador un string id
    sin embargo es perfectamente valido usar el username si se asume que
    todos son distintos. Notar tambien que se usa el decorador Document, el
    cual tiene entre sus objetivos dar un nombre personalizado a la coleccion
    de usuarios. Notese que un usuario tiene varias wallets a cuya informacion
    se puede acceder a traves de los distintos metodos creados.
*/
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
    /*
    Se obtiene el balance (cantidad de fondos) de una wallet, para ello
    se verifica primero que la wallet que se intenta acceder exista
    */
    public int getBalanceWallet(int wallet){
        if(wallet < getWalletSize()){
            return this.wallets.get(wallet);
        }
        throw new IndexOutOfBoundsException();
    }
    /*
    Se anade a una wallet (la cual debe existir) una cantidad de fondos 
    determinada
    */
    public void addBalance(int wallet, int cantity){
        if(wallet < getWalletSize()){
            this.wallets.set(wallet, this.wallets.get(wallet) + cantity);
            return;
        }
        throw new IndexOutOfBoundsException();
    }
    /*
    Se fija la cantidad de fondos en una wallet
    */
    public void setBalance(int wallet, int balance){
        if(wallet < getWalletSize()){
            this.wallets.set(wallet, balance);
            return;
        }
        throw new IndexOutOfBoundsException();
    }
    /*
    Se obtiene la cantidad de wallets
    */
    public int getWalletSize() {
        return this.wallets.size();
    }
    /*
    Se crea una nueva wallet
    */
    public void createWallet(){
        wallets.add(0);
    }
    public String getId(){
        return id;
    }
}