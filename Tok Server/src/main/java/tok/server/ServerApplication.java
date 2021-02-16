package tok;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
public class ServerApplication {
	// TODO - falta inicializar la bd, tener cuidado que no entre en conflicto
	// con los test
	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}
}
