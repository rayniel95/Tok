package tok.models;

/*
Esta clase es la que provee el modelo del body de las request http. O sea, 
proporciona un modelo para que la informacion del body sea transformada al
mismo. Notese que a diferencia del modelo User esta clase no cuenta con los
decoradores tipicos, precisamente porque no es un modelo de la base de datos.
Notese que no posee ni contructores ni metodos, esto debido a que se exige
por parte del parser encargado de crear el objeto. En caso de crearse 
costructores el parser no tendria forma de saber con que informacion deben
ser llamados, en el caso de los metodos aun no me queda claro la dificultad
existente para el parser, todo parece indicar que los desarrolladores del
mismo lo hicieron asi por simplicidad. Notese que la propiedad ha de ser
publica para poder acceder a la misma.
*/
public class CryptoRequest {
    public int crypto;
}