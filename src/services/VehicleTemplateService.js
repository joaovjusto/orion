import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { v4 as uuidv4 } from 'uuid';

export class VehicleTemplateService {

    #collection = 'vehicle-templates'

    async save(vehicleTemplate) {
        if(!vehicleTemplate.id) {
            vehicleTemplate.id = uuidv4()
        }
        
        const firestoreApp = firebase.app()
        await firestoreApp.firestore().runTransaction(async (transaction) => {    
            const docRef = firestoreApp.firestore().collection(this.#collection).doc(vehicleTemplate.id);
            transaction.set(docRef, JSON.parse(JSON.stringify(vehicleTemplate)))
        })
    }

    async delete(id) {
        const firestoreApp = firebase.app()
        await firestoreApp.firestore().runTransaction(async (transaction) => {    
            console.log(id)
            const docRef = firestoreApp.firestore().collection(this.#collection).doc(id);
            console.log(docRef, id)
            transaction.delete(docRef)
        })
    }

    async getAll() {
        const firestoreApp = firebase.app()
        return firestoreApp.firestore().collection(this.#collection).get()
            .then(data => {
                return data.docs.map(doc => doc.data())
            })
            .catch(error => {
                console.error(error)
                throw error
            })
    }

}