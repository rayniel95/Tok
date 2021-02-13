package tok.tests.controllers;

import tok.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import static org.assertj.core.api.Assertions.*;
import org.mindrot.jbcrypt.BCrypt;
import tok.models.User;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.List;
import java.util.Map;
import tok.controllers.CryptoController;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;



@SpringBootTest(webEnvironment=WebEnvironment.RANDOM_PORT)
class CryptoControllerTest {

	@Autowired
	private TestRestTemplate testRestTemplate;

    @Autowired
    CryptoController cryptoController;

    @Autowired
    UserRepository userRepository;

    @Test
    void contextLoad() throws Exception {
        assertThat(cryptoController).isNotNull();
    }

    @Test
    void userIsAuthorizedToVerSaldo() throws Exception {
        createRayPseudoUser();
        Map<String, String> body = Map.ofEntries(
            entry("userName", "ray"),
            entry("password", "pass"),
            entry("crypto", "3")
        );
        
        // header
        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.APPLICATION_JSON);

        // entity with body
        HttpEntity<String> entity = new HttpEntity<String>("cosa", header);

        ResponseEntity<String> response = testRestTemplate.exchange(
            "/verSaldo", HttpMethod.GET, entity, String.class
        );

        assertThat(response.toString()).isEqualTo("-1");
    }

    @Test
    void userIsNotAuthorizedToVerSaldo() throws Exception {

    }

    @Test
    void userIsAuthorizedToAddCrypto() throws Exception {

    }

    @Test
    void userIsNotAuthorizedToAddCrypto() throws Exception {

    }

    @Test
    void badBodySentToAddCrypto() throws Exception {

    }

    @Test
    void badBodySentToVerSaldo() throws Exception {

    }
    void createRayPseudoUser(){
        userRepository.deleteAll();
        userRepository.save(new User("ray", BCrypt.hashpw(
            "pass", BCrypt.gensalt(11))));
    }
}