// package tok.services;

// import java.util.ArrayList;
// import java.util.Arrays;
// import java.util.HashSet;
// import java.util.List;
// import java.util.Set;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import tok.models.User;
// import tok.repositories.UserRepository;


// @Service
// public class UserService {

//     @Autowired
//     private UserRepository userRepository;

//     public User findUserByUserName(String userName) {
//         return userRepository.findByUserName(userName);
//     }

//     public void saveUser(User user) {
//         userRepository.save(user);
//     }
// }