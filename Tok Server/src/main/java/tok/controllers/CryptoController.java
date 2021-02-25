package tok.controllers;

import java.util.List;
import java.util.UUID;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import tok.repositories.UserRepository;
import tok.models.User;
import tok.models.CryptoRequest;
import tok.utils.Authorizer;

// NOTE - una idea interesante es dejar la logica de los controladores a los
// servicios, quedando un patron mas bonito
// TODO - un servicio encargado de trabajar sobre el repositorio
@RestController
@CrossOrigin(origins="*")
public class CryptoController {
    // se inyecta el servicio de autorizacion
    @Autowired
    Authorizer authorizer;
    // se inyecta el repositorio
    @Autowired
    UserRepository userRepository;
    /**
     * El decorador Value permite acceder a las propiedades de la aplicacion
     * que se encuentran en resource/application.properties, en este archivo
     * se pueden almacenar valores de configuracion, entre otros relacionados
     * con la aplicacion, en este caso la propiedad 
     * custom.properties.maxwalletscantity tiene por valor 5 y es el valor
     * relacionado a la cantidad maxima de wallets por cada usuario
     */
    @Value("${custom.properties.maxwalletscantity}")
    int maxWallets;
    /**
     * Para agregar crypto a una de las billeteras solamente es necesario hacer
     * un put (update) al identificador de la misma, por supuesto es necesario
     * dar el nombre del usuario y la contrasena para autenticarse, en todos
     * los casos, tanto el nombre de usuario como la contrasena viajan en los
     * headers del request, en este caso son enviados sin encriptar, en una
     * aplicacion en produccion seria necesario utilizar TLS y como humilde 
     * sugerencia, cifrado asimetrico para garantizar la autenticacion. Notemos
     * que en el controlador como parametros esta walletId, el identificador
     * (numero) de la wallet, el cual es enviado como argumento de la query
     * en la URL, ademas se encuentran los dos headers de usario y contrasena
     * y el body del request que no es mas que un objeto (json) con una
     * propiedad crypto que es transformado en un objeto CryptoRequest. Se 
     * verifica que el usario este en la base de datos y se procede a 
     * actualizar la wallet.
     */
    @PutMapping("/wallets")
    Boolean addCrypto(
        @RequestParam(name="walletId", required=true) int walletId,
        @RequestHeader(name="userName", required=true) String userName,
        @RequestHeader(name="password", required=true) String password,
        @RequestBody CryptoRequest crypto
    ){
        int money = crypto.crypto;
        if(
            authorizer.isAuthorized(userName, password) && money > 0 
            && walletId < userRepository.findByUserName(userName)
            .get(0).getWalletSize()
        ){
            List<User> users = userRepository.findByUserName(userName);
            users.get(0).addBalance(walletId, money);
            userRepository.save(users.get(0));
            return true;
        } // TODO - lanzar una excepcion de no autorizado o algo similar
        // customizar esto para que los mensajes no sean tipo rpc
        return false;
    }
    // TODO - crear en este metodo las dos consultas, la de ver el saldo
    // y la de obtener la cantidad de wallets
    /**
     * En caso de hacerse un get a la URL enviando como argumento de la query
     * el id de la wallet se obtiene la cantidad de monedas en la misma.
     */
    @GetMapping("/wallets")
    Integer verSaldo(
        @RequestParam(name="walletId", required=true) int walletId,
        @RequestHeader(name="userName", required=true) String userName,
        @RequestHeader(name="password", required=true) String password
    ){ 
        if(authorizer.isAuthorized(userName, password) 
            && walletId < userRepository.findByUserName(userName)
            .get(0).getWalletSize()
        ){
            return userRepository
            .findByUserName(userName)
            .get(0).getBalanceWallet(walletId);
        }
        return -1;
    }
    // TODO - creo que es mejor usar path variables en vez de queries
    // queda mas organizado la parte de las urls y mas bonito
    /**
     * En caso de hacerse un post a la URL se crea una nueva wallet para
     * el usuario cuyos datos se envian (de estar en la base de datos).
     * Notar que el cuerpo del request es desechado y no se tiene en cuenta. 
     * De encontrarse el usario en la base de datos se verifica que al agregar
     * la nueva wallet no sobrepase el numero maximo de wallets permitidas y
     * de cumplirse se crea una nueva wallet que aun no tiene monedas.
     */
    @PostMapping("/wallets")
    Boolean createWallet(
        @RequestHeader(name="userName", required=true) String userName,
        @RequestHeader(name="password", required=true) String password
    ){
        if(
            authorizer.isAuthorized(userName, password)
            && userRepository.findByUserName(userName)
            .get(0).getWalletSize() + 1 <= maxWallets
        ){ 
            List<User> users = userRepository.findByUserName(userName);
            users.get(0).createWallet();
            userRepository.save(users.get(0));
            return true;
        } // TODO - lanzar una excepcion de no autorizado o algo similar
        // customizar esto para que los mensajes no sean tipo rpc
        return false;
    }
    /**
     * Para obtener el numero de wallets para el usuario solamente es 
     * necesario hacer un get a la URL numberOfWallet.
     */
    @GetMapping("/numberOfWallets")
    Integer numberOfWallets(
        @RequestHeader(name="userName", required=true) String userName,
        @RequestHeader(name="password", required=true) String password
    ){
        if(authorizer.isAuthorized(userName, password)){
            return userRepository
            .findByUserName(userName)
            .get(0).getWalletSize();
        }
        return -1;
    }
}