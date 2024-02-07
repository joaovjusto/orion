import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export class CostumerService {

    #collection = 'costumers'

    async save(costumer) {
        if(!costumer.id) {
            costumer.id = uuidv4()
        }
        
        const firestoreApp = firebase.app()
        await firestoreApp.firestore().runTransaction(async (transaction) => {    
            const docRef = firestoreApp.firestore().collection(this.#collection).doc(costumer.id);
            transaction.set(docRef, JSON.parse(JSON.stringify(costumer)))
        })
    }

    async delete(id) {
        const firestoreApp = firebase.app()
        await firestoreApp.firestore().runTransaction(async (transaction) => {    
            const docRef = firestoreApp.firestore().collection(this.#collection).doc(id);
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