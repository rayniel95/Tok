package tok.controllers;

import java.util.List;
import java.util.UUID;
// TODO - sobran algunos imports
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import tok.repositories.UserRepository;
import tok.models.User;
import tok.models.CryptoRequest;
import tok.utils.Authorizer;


@RestController
@CrossOrigin(origins="*")
public class CryptoController {
    
    @Autowired
    Authorizer authorizer;

    @Autowired
    UserRepository userRepository;

    @Value("${custom.properties.maxwalletscantity}")
    int maxWallets;
 
    @PostMapping("/addCrypto")
    Boolean addCrypto(
        @RequestHeader(name="userName", required=true) String userName,
        @RequestHeader(name="password", required=true) String password,
        @RequestBody CryptoRequest crypto
    ){
        int money = crypto.crypto;
        int wallet = crypto.wallet;
        if(
            authorizer.isAuthorized(userName, password) && money > 0 
            && wallet < userRepository.findByUserName(userName)
            .get(0).getWalletSize()
        ){
            List<User> users = userRepository.findByUserName(userName);
            users.get(0).addBalance(wallet, money);
            userRepository.save(users.get(0));
            return true;
        } // TODO - lanzar una excepcion de no autorizado o algo similar
        // customizar esto para que los mensajes no sean tipo rpc
        return false;
    }

    @GetMapping("/verSaldo")
    Integer verSaldo(
        @RequestHeader(name="userName", required=true) String userName,
        @RequestHeader(name="password", required=true) String password,
        @RequestBody CryptoRequest crypto
    ){ // TODO - solve this
        System.out.println(crypto.wallet);
        System.out.println(userRepository.findByUserName(userName)
        .get(0).getWalletSize());
        int money = crypto.crypto;
        int wallet = crypto.wallet;
        if(authorizer.isAuthorized(userName, password) 
            && wallet < userRepository.findByUserName(userName)
            .get(0).getWalletSize()
        ){
            return userRepository
            .findByUserName(userName)
            .get(0).getBalanceWallet(wallet);
        }
        return -1;
    }

    @PostMapping("/createWallet")
    Boolean createWallet(
        @RequestHeader(name="userName", required=true) String userName,
        @RequestHeader(name="password", required=true) String password
    ){
        if(
            authorizer.isAuthorized(userName, password)
            && userRepository.findByUserName(userName)
            .get(0).getWalletSize() + 1 <= maxWallets
        ){ 
            List<User> users = userRepository.findByUserName(userName);
            users.get(0).createWallet();
            userRepository.save(users.get(0));
            return true;
        } // TODO - lanzar una excepcion de no autorizado o algo similar
        // customizar esto para que los mensajes no sean tipo rpc
        return false;
    }
    
    @GetMapping("/numberOfWallets")
    Integer numberOfWallets(
        @RequestHeader(name="userName", required=true) String userName,
        @RequestHeader(name="password", required=true) String password
    ){
        if(authorizer.isAuthorized(userName, password)){
            return userRepository
            .findByUserName(userName)
            .get(0).getWalletSize();
        }
        return -1;
    }
}