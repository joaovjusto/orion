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

            if(!proposal.orderNumber || !proposal.customId) {
                const lastOrder = await firestoreApp.firestore().collection(this.#collection).where("year", "==", new Date().getFullYear()).limitToLast(1).orderBy("createdAtTimestamp", "desc").get()
    
                proposal.orderNumber = proposal.orderNumber ?? (lastOrder.docs[0]?.data()?.orderNumber || 0) + 1
                proposal.customId = proposal.customId ?? this.buildCustomId(proposal.orderNumber)
            }
            
            transaction.set(docRef, JSON.parse(JSON.stringify(proposal)))
        })
    }

    // Creates a custom ID with format VSN240001
    buildCustomId(orderNumber) {
        const date = new Date()
        return `VSN${date.getFullYear().toString().substring(2)}${orderNumber.toString().padStart(4, "0000")}`
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

    async findAllByUser(userEmail) {
        const firestoreApp = firebase.app()

        let collection = firestoreApp.firestore().collection(this.#collection)
        
        if(userEmail) {
            collection = collection.where('user', "==", userEmail).orderBy('createdAtTimestamp', 'desc')
        }

        return collection.get()
            .then(data => {
                return data.docs.map(doc => doc.data())
            })
            .catch(error => {
                console.error(error)
                throw error
            })
    }

}