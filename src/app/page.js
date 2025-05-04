"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function Home() {
  const {push}=useRouter()
  function handleSubmit(event) {
    
    event.preventDefault();
    console.log("matimu");
    console.log(event);
    var form = new FormData(event.target);
    console.log(form.get("username"));
    console.log(form.get("password"));
    push("/new")
  }
  return (
    <div className="login-container">
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="form-item">
          <label>UserName</label>
          <input name="username"></input>
        </div>
        <div className="form-item">
          <label>Password</label>
          <input type="password" name="password"></input>
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}
