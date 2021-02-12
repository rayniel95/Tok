package tok.controllers;

import java.util.List;

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


@RestController
class MockController {
    
    @Autowired
    UserRepository userRepository;
    
    @GetMapping("/user")
    User getUser(){
        userRepository.save(new User("ray", "pass"));
        return new User("ray", "pass");
    }
}