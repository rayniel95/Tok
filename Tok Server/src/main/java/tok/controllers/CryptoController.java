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
import org.springframework.beans.factory.annotation.Autowired;
import tok.repositories.UserRepository;
import tok.models.User;
import tok.models.CryptoRequest;
import tok.utils.Authorizer;


@RestController
public class CryptoController {
    
    @Autowired
    Authorizer authorizer;

    @Autowired
    UserRepository userRepository;
    // TODO - seria buena idea meter el username y la pass en los headers???
    // y asi separar la crypto en el body????
    @PostMapping("/addCrypto")
    Boolean addCrypto(@RequestBody CryptoRequest data){
        if(authorizer.isAuthorized(data.getUserName(), data.getPassword())){
            List<User> users = userRepository.findByUserName(data.getUserName());
            users.get(0).addBalance(Integer.parseInt(data.getCrypto()));
            userRepository.save(users.get(0));
            return true;
        } // TODO - lanzar una excepcion de no autorizado o algo similar
        return false;
    }

    @GetMapping("/verSaldo")
    Integer verSaldo(
        @RequestHeader(name="userName", required=true) String userName,
        @RequestHeader(name="password", required=true) String password
    ){
        if(authorizer.isAuthorized(userName, password)){
            return userRepository
            .findByUserName(userName)
            .get(0).getBalance();
        }
        return -1;
    }
}