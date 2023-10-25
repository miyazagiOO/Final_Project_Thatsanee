"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function SignupPage() {
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
    name: "",
  });
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValue),
    });

    if (response.ok) {
      console.log("User created successfully");
      setSignupSuccess(true);
    } else {
      const data = await response.json();
      if (data.error === "Username is already in use") {
        console.error("Username is already in use");
      } else {
        console.error("User creation failed");
      }
    }
  } catch (error) {
    console.error("Error during user creation:", error);
  }
};


  return (
    <>
      <h1>This is Signup Page</h1>
      {signupSuccess ? (
        <p>Signup successful! You can now sign in.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={formValue.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formValue.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={formValue.name}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Sign Up
          </button>
          <Link href="/signin">
            <button className="btn btn-primary">Sign In</button>
          </Link>
        </form>
      )}
    </>
  );
}
