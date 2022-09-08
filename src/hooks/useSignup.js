import {useEffect, useState} from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useSignup = () =>{
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()
    const [isCancelled, setIsCancelled]= useState(false)

    const signup = async (email, password, displayName) => {
        setError(null)
        setIsPending(true)

        try{
            const res = await projectAuth.createUserWithEmailAndPassword(email,password)

            if(!res){
                throw new Error("could not complete signup")
            }

            await res.user.updateProfile({displayName })

            dispatch({type: "LOGIN", payload: res.user})

            if(!isCancelled){
                setIsPending(false)
                setError(null)    
            }

 
        }catch(err){
            if(!isCancelled){
                setError(err.message)
                setIsPending(false)
            }

        }
    }

    useEffect(()=>{
        return ()=> setIsCancelled(true)
    },[])

 
    return {error, isPending, signup}
}