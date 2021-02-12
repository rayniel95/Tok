package tok.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import tok.repositories.UserRepository;
import tok.models.User;
import tok.models.AuthBody;


@RestController
class LoginController {
    
    @Autowired
    UserRepository userRepository;
    
    @PostMapping("/login")
    String login(@RequestBody AuthBody data){
        List<User> newUser = userRepository.findByUserName(data.getUserName());
        if(newUser.size() > 0 && newUser.get(0).getPassword().equals(data.getPassword())){
            String token = UUID.randomUUID().toString();
            newUser.get(0).setToken(token);
            userRepository.save(newUser.get(0));
            return token;
        }
        return "";
    }
}