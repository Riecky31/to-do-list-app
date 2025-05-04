"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Programs() {
  const {push}=useRouter()
const [programs,setPrograms] = useState([])

  async function getAllPrograms(){
    const res=await getprograms()
    console.log(res)
    setPrograms(res)
  }
  useEffect(()=>{
    getAllPrograms()
   
  },[]) 
  return (
    <div>
     
      <table>
  <tr>
    <th>PROGRAM NAME</th>
    <th>PROGRAM TYPE</th>
    <th>STATUS</th>
  </tr>
  {programs.map(function item(program){
    return (<tr>
        <td>{program.program_name}</td>
        <td>{program.program_type}</td>
        <td>{program.status}</td>
    </tr>)

  })}
  
</table>
    </div>
  );
}
async function getprograms(){
    const res=await fetch("http://127.0.0.1:8000/programs/trainingPrograms/",{
        method: "GET"
    })
    if(res.ok){
        return await res.json()
    }
}

