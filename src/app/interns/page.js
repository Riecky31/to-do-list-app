"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Interns() {
  const { push } = useRouter();
  const [interns, setInterns] = useState([]);

  async function getAllInterns() {
    try {
      const res = await fetch("http://127.0.0.1:8000/intern/", {
        method: "GET",
      });

      if (res.ok) {
        const data = await res.json();
        setInterns(data); // Update state with response data
      } 
    } catch (error) {
      console.error("Error fetching interns:", error);
    }
  }

  useEffect(() => {
    getAllInterns();
  }, []);

  return (
    <div>
      <h2>Intern List</h2>
      <table>
        <thead>
          <tr>
            <th>FIRST NAME</th>
            <th>LAST NAME</th>
            <th>ID NUMBER</th>
            <th>Email</th>
            <th>PHONE</th>
            <th>ADDRESS</th>
            <th>DATE OF BIRTH</th>
            <th>GENDER</th>
            <th>STARTDATE</th>
          </tr>
        </thead>
        <tbody>
          {interns.map((intern, index) => (
            <tr key={intern.id || index}>
              <td>{intern.first_name}</td>
              <td>{intern.last_name}</td>
              <td>{intern.email}</td>
              <td>{intern.phone}</td>
              <td>{intern.address}</td>
              <td>{intern.date_of_birth}</td>
              <td>{intern.gender}</td>
              <td>{intern.start_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
