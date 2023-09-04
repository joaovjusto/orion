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

    constructor() {
        this.id = uuidv4()
        this.createdAt = new Date().toISOString()
    }
}