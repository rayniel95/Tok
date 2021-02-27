package tok.utils;

import tok.repositories.UserRepository;
import tok.models.User;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.mindrot.jbcrypt.BCrypt;


/*
Notar que la clase se decora como servicio, un servicio no es mas que un
objeto que provee la logica del negocio en la aplicacion. Notar que es
un Bean.
*/
@Service
public class Authorizer{
    /*
    Se inyecta el repositorio
    */
    @Autowired
    UserRepository userRepository;
    /* 
    Este sencillo servicio solamente pregunta si el usuario existe en la
    base de datos y su contrasena coincide
    */
    public Boolean isAuthorized(String userName, String password){
        List<User> users = userRepository.findByUserName(userName);
        
        if(users.size() > 0 && BCrypt.checkpw(password, 
            users.get(0).getPassword())){
            
            return true;
        }
        return false;
    }
}