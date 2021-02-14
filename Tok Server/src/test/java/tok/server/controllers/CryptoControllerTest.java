package tok.tests.controllers;
// TODO - necesito algo para organizar esto
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
import org.springframework.http.RequestEntity;
import tok.models.CryptoRequest;
import org.springframework.http.HttpStatus;




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
        // header
        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.APPLICATION_JSON);
        header.set("userName", "ray");
        header.set("password", "pass");
        // entity without body
        HttpEntity<Void> entity = new HttpEntity<Void>(header);

        ResponseEntity<String> response = testRestTemplate.exchange(
            "/verSaldo", HttpMethod.GET, entity, String.class
        );

        assertThat(response.getBody().toString()).isEqualTo("0");
    }

    @Test
    void userIsNotAuthorizedToVerSaldo() throws Exception {
        createRayPseudoUser();
        // header
        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.APPLICATION_JSON);
        header.set("userName", "ray");
        header.set("password", "passs");
        // entity without body
        HttpEntity<Void> entity = new HttpEntity<Void>(header);

        ResponseEntity<String> response = testRestTemplate.exchange(
            "/verSaldo", HttpMethod.GET, entity, String.class
        );

        assertThat(response.getBody().toString()).isEqualTo("-1");
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
    void badHeadersSentToAddCrypto() throws Exception {

    }

    @Test
    void badHeadersSentToVerSaldo() throws Exception {
        createRayPseudoUser();
        // header
        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.APPLICATION_JSON);
        header.set("userName", "ray");
        // entity without body
        HttpEntity<Void> entity = new HttpEntity<Void>(header);

        ResponseEntity<String> response = testRestTemplate.exchange(
            "/verSaldo", HttpMethod.GET, entity, String.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }
    void createRayPseudoUser(){
        userRepository.deleteAll();
        userRepository.save(new User("ray", BCrypt.hashpw(
            "pass", BCrypt.gensalt(11))));
    }
}