"use client";
import { useRouter } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import CreateInternForm from "../components/forms/CreateInternForm";

// Define a TypeScript interface for an Intern
interface TrainingProgram {
  id: number;
  program_name: string;
  program_type: string;
  status: string;
}

interface Intern {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  date_of_birth: string;
  gender: string;
  start_date: string;
  training_program: TrainingProgram | null;  
}

export default function Interns(): JSX.Element {
  const { push } = useRouter();
  const [interns, setInterns] = useState<Intern[]>([]);
  const [showForm, setShowForm] = useState(false);

  async function getAllInterns(): Promise<void> {
    try {
      const res = await fetch("http://127.0.0.1:8000/intern/", {
        method: "GET",
      });

      if (res.ok) {
        const data: Intern[] = await res.json();
        setInterns(data);
      } 
    } catch (error) {
      console.error("Error fetching interns:", error);
    }
  }

  useEffect(() => {
    getAllInterns();
  }, []);

  return (
    <div  className="p-6">
      <h2 className="text-2xl font-bold mb-4">Intern List</h2>
      <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
      <table className="min-w-full bg-white text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase tracking-wider">
          <tr>
          <th className="px-4 py-3">First Name</th>
              <th className="px-4 py-3">Last Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Address</th>
              <th className="px-4 py-3">Date of Birth</th>
              <th className="px-4 py-3">Gender</th>
              <th className="px-4 py-3">Start Date</th>
              <th className="px-4 py-3">Training Program</th>

          </tr>
        </thead>
          <tbody className="divide-y divide-gray-200">
            {interns.map((intern) => (
              <tr key={intern.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{intern.first_name}</td>
                <td className="px-4 py-2">{intern.last_name}</td>
                <td className="px-4 py-2">{intern.email}</td>
                <td className="px-4 py-2">{intern.phone}</td>
                <td className="px-4 py-2">{intern.address}</td>
                <td className="px-4 py-2">{intern.date_of_birth}</td>
                <td className="px-4 py-2 capitalize">{intern.gender}</td>
                <td className="px-4 py-2">{intern.start_date}</td>
                <td className="px-4 py-2">{intern.training_program ? intern.training_program.program_name : '—'} </td>

              </tr>
          ))}
        </tbody>
      </table>
      </div>
      
            <div className="max-w-xl mx-auto p-4">
              <h1 className="text-2xl font-bold mb-4">Training Programs</h1>
      
              <button
                onClick={() => setShowForm((prev) => !prev)}
                className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {showForm ? "Close Form" : "Create Intern"}
              </button>
      
              {showForm && (
                <div className="border rounded shadow p-6 bg-white">
                  <CreateInternForm />
                </div>
              )}
            </div>
    </div>
  );
}
