/**
 * @type {import("next").NextPage}
 * @returns {JSX.Element}
 * @param {import("react").ReactNode} children
 * @param {string} email
 * @param {string} password
 * @param {boolean} isLoading
 * @param {function} setEmail
 * @param {function} setPassword
 * @param {function} setIsLoading
 * @param {function} handleLogin
 * @param {import("react").ReactNode} children
 */
import React from "react";
import Login from "@/components/login/LoginForm";
export default function LoginPage() {
  return (
    <div>
      <Login />
    </div>
  );
}
