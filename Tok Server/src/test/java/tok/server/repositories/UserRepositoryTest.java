package tok.tests.repositories;

import tok.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import static org.assertj.core.api.Assertions.*;
import org.mindrot.jbcrypt.BCrypt;
import tok.models.User;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.List;


/**
 * La siguiente clase es un conjunto de test para el repositorio.
 */
@SpringBootTest
class UserRepositoryTest {
    
    @Autowired
    UserRepository userRepository;

    @Test
    void saveOneUser() throws Exception {
        userRepository.deleteAll();
        User ray = userRepository.save(new User("ray", BCrypt.hashpw("pass",
            BCrypt.gensalt(11))));

        assertThat(BCrypt.checkpw("pass", ray.getPassword())).isEqualTo(true);
        assertThat(userRepository.findByUserName("ray")).hasSize(1);
    }

    void saveThreeUsersWithSameName() throws Exception {
        userRepository.deleteAll();

        String pass1 = BCrypt.hashpw("pass1", BCrypt.gensalt(11));
        User user1 = new User("user", pass1);

        String pass2 = BCrypt.hashpw("pass2", BCrypt.gensalt(11));
        User user2 = new User("user", pass2);

        String pass3 = BCrypt.hashpw("pass3", BCrypt.gensalt(11));
        User user3 = new User("user", pass3);

        userRepository.save(user1);
        userRepository.save(user2);
        userRepository.save(user3);

        List<User> users = userRepository.findByUserName("user");

        assertThat(users).hasSize(3);
        assertThat(users).allSatisfy(
            user -> {
                assertThat(user.getUserName()).isEqualTo("user");
                assertThat(user.getPassword()).isIn(pass1, pass2, pass3);
            }
        );
    }
}
