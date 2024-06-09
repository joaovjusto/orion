import { v4 as uuidv4 } from 'uuid';

export class Proposal {
    id
    user
    cost
    currency
    import
    tribute
    vehicle
    createdAt
    createdAtTimestamp
    year
    resume
    documents
    costumer

    // ID customizável. Exemplo (VSN240001) Sendo o orçamento 01 de 2024.
    customId

    //Sequencial número referente aos orçamentos gerados no ano
    orderNumber

    constructor() {
        this.id = uuidv4()
        const date = new Date()
        this.createdAt = date.toISOString()
        this.createdAtTimestamp = date.getTime()
        this.year = date.getFullYear()
    }
}

export class Document {
    id
    proposalId
    createdAt
    name

    constructor(id, proposalId, name) {
        this.id = id ? id : uuidv4()
        this.createdAt = new Date().toISOString()
        this.proposalId = proposalId
        this.name = name
    }
}