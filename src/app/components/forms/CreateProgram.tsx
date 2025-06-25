"use client";

import { useState } from "react";

export default function CreateProgram() {
  const [formData, setFormDate] = useState({
    program_name: "",
    program_type: "learnership",
    duration: "",
    start_date: "",
    end_date: "",
    status: "not_started",
  });
  const handlechange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormDate({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(
      "http://127.0.0.1:8000/programs/trainingPrograms/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );
    if (response.ok) {
      alert("Training Program created! successful");
    } else {
      alert(
        "failed creating Traing program verify if required data is submited"
      );
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="program_name"
        placeholder="Program Name"
        onChange={handlechange}
        required
        className="w-full p-2 border rounded"
      />
      <select
        name="program_type"
        onChange={handlechange}
        className="w-full p-2 border rounded"
      >
        <option value="learnership">Learnership</option>
        <option value="internship">Internship</option>
        <option value="skills_program">Skills Program</option>
      </select>
      <input
        name="duration"
        type="number"
        placeholder="Duration (months)"
        onChange={handlechange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="start_date"
        type="date"
        onChange={handlechange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="end_date"
        type="date"
        onChange={handlechange}
        required
        className="w-full p-2 border rounded"
      />
      <select
        name="status"
        onChange={handlechange}
        className="w-full p-2 border rounded"
      >
        <option value="not_started">Not Started</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="started">Started</option>
      </select>
      <button type="submit" className="w-full p-2 border rounded">
        Create Program
      </button>
    </form>
  );
}
