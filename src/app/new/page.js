"use client"
import { useRouter } from "next/navigation"

export default function MyComponent(){
    const {push}=useRouter()
    function logout(){
        push("/")
        
    }
    return(
       <div> <p>hello world</p> 
       <button onClick={()=>logout()}>logout</button>
       
       </div>
        
    )
}