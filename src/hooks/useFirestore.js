import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { db } from '../component/fireBase/config'
export const useFirestore = (collectionData, condition) => {
    const [doccuments, setDoccuments] = useState([])

    useEffect(() => {
        let q = query(collection(db, collectionData), orderBy("createdAt"))

        if (condition) {
            if (!condition.compareValue || !condition.compareValue.length) {
                return;
            }
            q = query(collection(db, collectionData), where(condition.fieldName, condition.operator, condition.compareValue), orderBy("createdAt"))
        }
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            console.log(data)
            setDoccuments(data)
        });
        return unsubscribe;
    }, [collectionData, condition])

    return doccuments

}