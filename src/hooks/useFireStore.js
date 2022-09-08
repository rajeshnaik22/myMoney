import { useEffect, useReducer, useState } from "react"
import { projectFirestore, timestamp } from "../firebase/config"

let initialState={
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state,action)=>{
    switch(action.type){
        case 'IS_PENDING':
            return {document:null, isPending:true, error:null, success: null}
        case 'ADDED_DOCUMENT':
            return { document: action.payload, isPending: false, error: null, success: true}
        case 'DELETE_DOCUMENT':
            return { document: action.payload, isPending: false, error: null, success: true }
        case 'ERROR':
            return { document: null, isPending: false, error: action.payload, success: false}
        default:
            return state
    }
}

export const useFireStore = (collection) =>{
    const [response,dispatch]=useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled]= useState(false)

    const ref = projectFirestore.collection(collection)

    const dispatchIfNotCancelled = (action) => {
        if(!isCancelled){
            dispatch(action)
        }
    }

    const addDocument = async (doc) => {
        dispatch({type: 'IS_PENDING'})
        try {
            const createdAt = timestamp.fromDate(new Date())
            const addedDocument = await ref.add({...doc, createdAt})
            dispatch({type: 'ADDED_DOCUMENT', payload: addedDocument})
        } catch (err) {
            dispatchIfNotCancelled({type: "ERROR", payload: err.message})
        }

    }

    const deleteDocument = async (id) => {
        dispatch({type: 'IS_PENDING'})
        console.log("asecasdfsecond")
        try {
            const deletedDocument = await ref.doc(id).delete()
            dispatchIfNotCancelled({type: 'DELETE_DOCUMENT', payload: deletedDocument})
            
        } catch (error) {
            dispatchIfNotCancelled({type: "ERROR", payload: "could not delete item"})            
        }

    }

    useEffect(()=>{
        return ()=> setIsCancelled(true)
    },[])

    return {addDocument, deleteDocument, response}

}