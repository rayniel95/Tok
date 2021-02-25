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


/*
El modelo decalrativo de Spring permite etiquetar una clase como la aplicacion
en este caso la clase ServerApplication es la clase encargada de ejecutar toda
la aplicacion con la api rest.
*/
@SpringBootApplication
public class ServerApplication {
	/*
	Notemos el poderoso modelo declarativo de Spring el cual permite realizar
	"inyecciones" de codigo, esto no es mas que crear una especie de objeto
	el cual sera bindeado (enlazado) a la propiedad en cuestion, en este caso
	sin necesidad de crear un objeto UserRepository (que recordemos es una
	interfaz) se permite tener una instancia del mismo en la propiedad.
	*/
	@Autowired
	UserRepository userRepository;

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}
	/*
	Un Bean no es mas que otra forma de patron declarativo, en este caso es un
	objeto que se crea al inicio de la aplicacion y permanece en una especie de
	contenedor esperando a ser inyectado y utilizado por alguna parte de la 
	aplicacion. En este caso se usa un truco simple para inicializar la base de
	datos, al ejecutarse el Bean al inicio lo que se esta realizando es la 
	ejecucion del metodo el cual devuelve un objeto CommandLineRunner, este
	objeto debe vivir en su propio contenedor esperando a ser llamado por
	alguna parte de la aplicacion, sin embargo, los CommandLineRunner deben
	ejecutarse por la aplicacion, es codigo que debe ejecutarse. Notar
	la diferencia, un Bean es un objeto que se crea al inicio de la aplicacion, 
	no ejecuta nada hasta no se haya llamado, y un CommandLineRunner es un 
	codigo que ha de ejecutarse, por tanto, al ser el Bean un codigo que ha de
	ejecutarse este se ejecuta al inicio, inicializando la base de datos. Se
	"limpia" la base de datos y se crea un nuevo usuario para almacenar. Notar
	el uso de BCrypt, esta libreria permite el hasheo de la contrasena, de esta
	forma se guarda el hash de la contrasena en vez de la contrasena en si. 
	NOTE - En lo personal pienso que lo mejor que se podria hacer es usar 
	cifrado asimetrico.
	*/
	@Bean
    public CommandLineRunner setup() {
        return (args) -> {
               userRepository.deleteAll();
			   userRepository.save(new User("ray", BCrypt.hashpw("pass",
			   BCrypt.gensalt(11))));
        };
    }
}
