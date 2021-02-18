package tok;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.CommandLineRunner;
import tok.repositories.UserRepository;
import tok.models.User;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;



@SpringBootApplication
public class ServerApplication {

	@Autowired
	UserRepository userRepository;

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	@Bean
    public CommandLineRunner setup() {
        return (args) -> {
               userRepository.deleteAll();
			   userRepository.save(new User("ray", BCrypt.hashpw("pass",
			   BCrypt.gensalt(11))));
        };
    }
}
