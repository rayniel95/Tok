/**
 * Modelo utilizado para el envio de la cantidad de monedas en el body del 
 * request, tambien se utiliza para la creacion del formulario de agregar
 * crypto a una wallet.
 */
export class Crypto {
    crypto: number;
    public constructor(crypto: number){
        this.crypto = crypto;
    }

    public getCrypto(): number{
        return this.crypto
    }
}