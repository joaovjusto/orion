import { v4 as uuidv4 } from 'uuid';

export class VehicleTemplate {
    id
    description
    manufacturer
    color
    model
    year
    currency
    createdAt
    images
    videos
    version

    constructor() {
        this.id = uuidv4()
        this.createdAt = new Date().toISOString()
        this.version = 1
    }
}