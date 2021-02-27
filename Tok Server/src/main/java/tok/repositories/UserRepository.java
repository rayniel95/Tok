package tok.repositories;

import java.util.List;

import tok.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;


/*
Un repositorio de MongoDB es una especie de interfaz de acceso a la base de
datos. Puede ser visto como una coleccion de documentos o la propia
base de datos. Debe existir un repositorio por cada collecion. Entre las 
tareas del repositorio no solo se encuentran las de realizar consultas, 
sino tambien las de eliminar, anadir, actualizar, etc. Como se puede 
notar una de las cosas mas interesantes de los repositorios de MongoDB en 
Spring Boot es que las queries no requieren implementacion, solo es 
necesario declararlas (Spring intenta utilizar programacion declarativa), 
o sea, no es necesario proveer de ningun codigo que busque en la base de 
datos lo que se desea, sino que solo se debe crear correctamente el nombre 
de la query y los parametros de la misma. En nuestro caso la query findBy* 
es una especie de query base encargada de la busqueda y la misma puede ser 
extendida por cada propiedad del modelo. Notemos como la consulta se crea
como la consulta base findBy agregandole el nombre de la propiedad por la
cual se desea buscar, asi como el valor de la propiedad.
*/
public interface UserRepository extends MongoRepository<User, String> {

  public List<User> findByUserName(String userName);
}