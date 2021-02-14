package tok.tests.utils;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import tok.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import tok.utils.Authorizer;
import static org.assertj.core.api.Assertions.*;
import org.mindrot.jbcrypt.BCrypt;
import tok.models.User;



@SpringBootTest
class AuthorizerTest{
    @Autowired 
    Authorizer authorizer;

    @Autowired
    UserRepository userRepository;

    @Test
    void isNotAuthorizedBecausePass() throws Exception{
        createRayPseudoUser();
        
        assertThat(authorizer.isAuthorized("ray", "passs")).isEqualTo(false);
    }

    @Test
    void isAuthorized() throws Exception{
        assertThat(authorizer.isAuthorized("ray", "pass")).isEqualTo(true);
    }

    @Test
    void isNotAuthorizedBecauseUserName() throws Exception{
        assertThat(authorizer.isAuthorized("roy", "pass")).isEqualTo(false);
    }
    // FIXME - por alguna razon da null pointer si lo muevo a una clase aparte
    // parece algun problema con las inyecciones, no me esta quedando claro
    void createRayPseudoUser(){
        userRepository.deleteAll();
        userRepository.save(new User("ray", BCrypt.hashpw(
            "pass", BCrypt.gensalt(11))));
    }
}