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
    // NOTE - tener presente que crea un contexto para toda la clase
    // el orden de los test importa
    @Test
    void userIsNotAuthorizedToVerSaldo() throws Exception {
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
        // header
        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.APPLICATION_JSON);
        header.set("userName", "ray");
        header.set("password", "pass");
        // entity without body
        HttpEntity<String> entity = new HttpEntity<String>(
            "{\"crypto\":\"4\"}", header
        );

        ResponseEntity<String> responseAddCrypto = testRestTemplate.exchange(
            "/addCrypto", HttpMethod.POST, entity, String.class
        );

        ResponseEntity<String> responseVerSaldo = testRestTemplate.exchange(
            "/verSaldo", HttpMethod.GET, new HttpEntity<Void>(header), 
            String.class
        );

        assertThat(responseAddCrypto.getBody().toString()).isEqualTo("true");
        assertThat(responseVerSaldo.getBody().toString()).isEqualTo("4");
    }

    @Test
    void userIsNotAuthorizedToAddCrypto() throws Exception {
        // header
        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.APPLICATION_JSON);
        header.set("userName", "ray");
        header.set("password", "passs");
        // entity without body
        HttpEntity<String> entity = new HttpEntity<String>(
            "{\"crypto\":\"4\"}", header
        );

        ResponseEntity<String> response = testRestTemplate.exchange(
            "/addCrypto", HttpMethod.POST, entity, String.class
        );

        assertThat(response.getBody().toString()).isEqualTo("false");
    }

    @Test
    void userIsAuthorizedToAddCryptoAddNegativeFounds() throws Exception {
        // header
        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.APPLICATION_JSON);
        header.set("userName", "ray");
        header.set("password", "pass");
        // entity without body
        HttpEntity<String> entity = new HttpEntity<String>(
            "{\"crypto\":\"-5\"}", header
        );

        ResponseEntity<String> response = testRestTemplate.exchange(
            "/addCrypto", HttpMethod.POST, entity, String.class
        );

        assertThat(response.getBody().toString()).isEqualTo("false");
    }

    @Test
    void badBodySentToAddCryptoBadName() throws Exception {
        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.APPLICATION_JSON);
        header.set("userName", "ray");
        header.set("password", "pass");
        // entity without body
        HttpEntity<String> entity = new HttpEntity<String>(
            "{\"cryptum\":\"4\"}", header
        );

        ResponseEntity<String> response = testRestTemplate.exchange(
            "/addCrypto", HttpMethod.POST, entity, String.class
        );

        assertThat(response.getStatusCode())
            .isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    void badBodySentToAddCryptoNoName() throws Exception {
        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.APPLICATION_JSON);
        header.set("userName", "ray");
        header.set("password", "pass");
        // entity without body
        HttpEntity<String> entity = new HttpEntity<String>(
            "{}", header
        );

        ResponseEntity<String> response = testRestTemplate.exchange(
            "/addCrypto", HttpMethod.POST, entity, String.class
        );

        assertThat(response.getStatusCode())
            .isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Test
    void badHeadersSentToAddCrypto() throws Exception {
        createRayPseudoUser();
        // header
        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.APPLICATION_JSON);
        header.set("password", "pass");
        // entity without body
        HttpEntity<String> entity = new HttpEntity<String>(
            "{\"crypto\":\"4\"}", header
        );

        ResponseEntity<String> response = testRestTemplate.exchange(
            "/addCrypto", HttpMethod.POST, entity, String.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    void badHeadersSentToVerSaldo() throws Exception {
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
    
    @Test
    void userIsAuthorizedToAddCryptoAddMoreCrypto() throws Exception {
        // header
        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.APPLICATION_JSON);
        header.set("userName", "ray");
        header.set("password", "pass");
        // entity without body
        HttpEntity<String> entity = new HttpEntity<String>(
            "{\"crypto\":\"20\"}", header
        );

        ResponseEntity<String> responseAddCrypto = testRestTemplate.exchange(
            "/addCrypto", HttpMethod.POST, entity, String.class
        );

        ResponseEntity<String> responseVerSaldo = testRestTemplate.exchange(
            "/verSaldo", HttpMethod.GET, new HttpEntity<Void>(header), 
            String.class
        );

        assertThat(responseAddCrypto.getBody().toString()).isEqualTo("true");
        assertThat(responseVerSaldo.getBody().toString()).isEqualTo("24");
    }

    void createRayPseudoUser(){
        userRepository.deleteAll();
        userRepository.save(new User("ray", BCrypt.hashpw(
            "pass", BCrypt.gensalt(11))));
    }
}