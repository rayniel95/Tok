package tok.utils;

import tok.repositories.UserRepository;
import tok.models.User;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.mindrot.jbcrypt.BCrypt;


@Service
public class Authorizer{

    @Autowired
    UserRepository userRepository;

    public Boolean isAuthorized(String userName, String password){
        List<User> users = userRepository.findByUserName(userName);
        
        if(users.size() > 0 && BCrypt.checkpw(password, 
            users.get(0).getPassword())){
            
            return true;
        }
        return false;
    }
}