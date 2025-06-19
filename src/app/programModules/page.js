'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProgramModules() {
  const { push } = useRouter();
  const [programModules, setProgramModules] = useState([]);

  useEffect(() => {
    async function getAllProgramModules() {
      try {
        const res = await fetch('http://127.0.0.1:8000/programModules/', {
          method: 'GET',
        });
        if (!res.ok) {
          throw new Error('Failed to fetch program modules');
        }
        const data = await res.json();
        setProgramModules(data);
      } catch (error) {
        console.error('Error fetching program modules:', error);
      }
    }

    getAllProgramModules();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Program Modules</h1>
      <table className="border border-collapse w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Module Name</th>
            <th className="border px-4 py-2">Link</th>
            <th className="border px-4 py-2">Training Program</th>
          </tr>
        </thead>
        <tbody>
          {programModules.map((module, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{module.title}</td>
              <td className="border px-4 py-2">
                <a href={module.link} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                  {module.link}
                </a>
              </td>
              <td className="border px-4 py-2">{module.program_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
