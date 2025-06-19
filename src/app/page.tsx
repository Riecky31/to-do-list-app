"use client";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Home(): JSX.Element {
  const { push } = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    console.log("matimu");
    console.log(event);
    console.log(form.get("username"));
    console.log(form.get("password"));

    push("/home");
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="form-item">
          <label>UserName</label>
          <input name="username" />
        </div>
        <div className="form-item">
          <label>Password</label>
          <input type="password" name="password" />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}
