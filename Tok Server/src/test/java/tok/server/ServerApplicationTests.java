package tok.tests;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import tok.repositories.UserRepository;
import tok.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import static org.assertj.core.api.Assertions.*;


@SpringBootTest
class ServerApplicationTests {
	@Autowired
	UserRepository repository;

	@Test
	void contextLoads() {
		// repository.deleteAll();
		// User myUser = repository.save(new User("ray", "[ass"));
		// assertThat(myUser.getUserName()).isEqualTo("ray");
	}

}
