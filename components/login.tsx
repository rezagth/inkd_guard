"use client";
import { useState, FormEvent } from "react";
// import { useRouter } from "next/router"; // Importez useRouter pour la redirection

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const router = useRouter(); // Utilisez useRouter pour la redirection

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.text();
      if (data) {
        const jsonData = JSON.parse(data);
        console.log("Connexion réussie");
        // router.push("/dashboard"); // Redirigez vers le tableau de bord après la connexion réussie
        window.location.href = "/maincourante"; // Utilisez window.location.href pour la redirection
      } else {
        console.log("Aucune donnée reçue");
        setIsLoading(false);
      }
    } else {
      console.log("Erreur de connexion");
      const errorData = await response.text();
      try {
        const errorJson = JSON.parse(errorData);
        alert(errorJson.message); // Utilisez alert pour afficher l'erreur à l'utilisateur
      } catch {
        alert(errorData); // Affichez l'erreur si elle n'est pas en JSON
      }
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center justify-center p-4 animate-slide-in"
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          padding: "20px",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-2 p-2 border rounded w-full"
          placeholder="Entrez votre email"
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mb-2 p-2 border rounded w-full"
          placeholder="Entrez votre mot de passe"
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        >
          {isLoading ? "Chargement..." : "Se connecter"}
        </button>
      </form>
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
