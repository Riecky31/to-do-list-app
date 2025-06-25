'use client';

import React, { useState } from "react";

export default function CreateModule() {
    const [formData, setFormData] = useState({
      title: "",
      link: "",
      trainingProgram: "",
    });
  
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      const response = await fetch("http://127.0.0.1:8000/api/program-modules/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert("Module created successfully!");
      } else {
        alert("Failed to create module. Please check your input.");
      }
    };
    return(
        <form onSubmit={handleSubmit} className="space-y-4">
            <input name='title' placeholder="Module Title" onChange={handleChange} required className="w-full p-2 border rounded" />
            <input name='trainingProgram' placeholder="Training Program" onChange={handleChange} required className="w-full p-2 border rounded" />
            <input name='link' placeholder="Module Link (e.g., www.example.com)" onChange={handleChange} required className="w-full p-2 border rounded" />
            <button type="submit" className="w-full p-2 border rounded bg-blue-600 text-white">Create Module</button>

        </form>
    );
}