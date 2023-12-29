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
    resume
    documents

    constructor() {
        this.id = uuidv4()
        this.createdAt = new Date().toISOString()
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