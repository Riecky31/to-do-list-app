'use client';

import { useState, useEffect } from "react";

export default function CreateInternForm(){
    const [formData, setFormData] = useState({
        id_number: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        date_of_birth: '',
        gender: 'M',
        start_date: '',
        user: '',
        training_program: '',
        
    });
    const [programs, setPrograms] = useState([]);

    useEffect(()=> {
        fetch('http://127.0.0.1:8000/programs/trainingPrograms/')
        .then(res => res.json())
        .then(setPrograms);
    }, []);

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e: any) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:8000/intern/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          alert('Intern created!');
        } else {
          alert('Failed to create intern.');
        }
      };
    return(
        <form onSubmit={handleSubmit} className="space-y-4">
            <input name="id_number" placeholder="ID Number" onChange={handleChange} className="w-full p-2 border rounded" required />
            <input name="first_name" placeholder="First Name" onChange={handleChange} className="w-full p-2 border rounded" required />
            <input name="last_name" placeholder="Last Name" onChange={handleChange} className="w-full p-2 border rounded"required />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded"required />
            <input name="phone" placeholder="Phone" onChange={handleChange} className="w-full p-2 border rounded"/>
            <input name="address" placeholder="Address" onChange={handleChange} className="w-full p-2 border rounded"/>
            <input name="date_of_birth" type="date" onChange={handleChange} className="w-full p-2 border rounded"required />
            <select name="gender" onChange={handleChange} className="w-full p-2 border rounded">
                <option value="M">Male</option>
                <option value="M">Female</option>
                <option value="M">Other</option>
            </select>
            <input name="start_date" type="date" onChange={handleChange} className="w-full p-2 border rounded" required />
            <select name="training_program" onChange={handleChange} className="w-full p-2 border rounded">
                <option value="">-- Select Program --</option>
                {programs.map((p:any) =>(
                    <option key ={p.id} value={p.id}>{p.program_name}</option>
                ))}
            </select>
            <button type="submit" className="w-full p-2 border rounded">Add Intern</button>
        </form>
    );
}