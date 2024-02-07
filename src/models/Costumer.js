import { v4 as uuidv4 } from 'uuid';

export class Costumer {
    id
    createdAt
    name
    rg
    cpf
    civilState
    occupation
    address
    complement

    contractTemplate

    constructor(id) {
        this.id = id ? id : uuidv4()
        this.createdAt = new Date().toISOString()
    }
}