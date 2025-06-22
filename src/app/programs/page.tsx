"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CreateProgram from "../components/forms/CreateProgram";

export default function Programs() {
  const { push } = useRouter();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortKey, setSortKey] = useState("program_name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getAllPrograms();
  }, []);

  async function getAllPrograms() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/programs/trainingPrograms/"
      );
      if (res.ok) {
        const data = await res.json();
        setPrograms(data || []);
      } else {
        setError("Failed to fetch programs");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  }

  function handleSort(key) {
    if (key === sortKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  }

  const sortedPrograms = [...programs].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortDirection === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
    }
    return 0;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6 text-center">Programs List</h2>

      {loading ? (
        <div className="text-center text-gray-500">Loading programs...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : programs.length === 0 ? (
        <div className="text-center text-gray-500">No programs found.</div>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
          <table className="min-w-full text-sm text-left text-gray-700 bg-white">
            <thead className="bg-gray-100 text-xs uppercase font-semibold text-gray-600">
              <tr>
                {["program_name", "program_type", "status"].map((key) => (
                  <th
                    key={key}
                    scope="col"
                    className="px-6 py-3 cursor-pointer hover:text-blue-600"
                    onClick={() => handleSort(key)}
                  >
                    {key.replace("_", " ").toUpperCase()}{" "}
                    {sortKey === key && (sortDirection === "asc" ? "▲" : "▼")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedPrograms.map((program) => (
                <tr key={program.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">{program.program_name}</td>
                  <td className="px-6 py-4">{program.program_type}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        program.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {program.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Training Programs</h1>

        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {showForm ? "Close Form" : "Create Program"}
        </button>

        {showForm && (
          <div className="border rounded shadow p-6 bg-white">
            <CreateProgram />
          </div>
        )}
      </div>
    </div>
  );
}
