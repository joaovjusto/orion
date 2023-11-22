import firebase from 'firebase/compat/app';
// import storage from "firebase/compat/storage";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export class ProposalService {

    #collection = 'proposals'

    async save(proposal) {
        const firestoreApp = firebase.app()
        await firestoreApp.firestore().runTransaction(async (transaction) => {    
            const docRef = firestoreApp.firestore().collection(this.#collection).doc(proposal.id);
            transaction.set(docRef, JSON.parse(JSON.stringify(proposal)))
        })
    }

    async findById(id) {
        const firestoreApp = firebase.app()
        return firestoreApp.firestore().collection(this.#collection).doc(id).get()
            .then(data => {
                return data.data()
            })
            .catch(error => {
                console.error(error)
                throw error
            })
    }

    async findAll() {
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