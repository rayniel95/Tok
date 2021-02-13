package tok.repositories;

import java.util.List;

import tok.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface UserRepository extends MongoRepository<User, String> {

  public List<User> findByUserName(String userName);
}