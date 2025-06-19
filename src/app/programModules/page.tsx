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
    <div className="p-6">
  <h2 className="text-2xl font-bold mb-4">Training Programs</h2>
  <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
    <table className="min-w-full bg-white text-sm text-left">
      <thead className="bg-gray-100 text-gray-700 uppercase tracking-wider">
        <tr>
          <th className="px-4 py-3">Program Name</th>
          <th className="px-4 py-3">Title</th>
          <th className="px-4 py-3">Link</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {programModules.map((program) => (
          <tr key={program.id} className="hover:bg-gray-50">
            <td className="px-4 py-2">{program.program_name}</td>
            <td className="px-4 py-2">{program.title}</td>
            <td className="px-4 py-2">{program.link}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  );
}
