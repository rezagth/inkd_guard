"use client";
import { useState, FormEvent } from "react";
// Importation de useRouter est commentée car nous utilisons window.location pour la redirection
// import { useRouter } from "next/router";

export default function Login() {
  // État pour gérer les entrées de l'utilisateur et l'état de chargement
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Instance de useRouter est commentée car nous utilisons window.location pour la redirection
  // const router = useRouter();

  // Fonction asynchrone pour gérer la soumission du formulaire de connexion
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
        // Redirection vers la page principale après une connexion réussie
        window.location.href = "/maincourante";
      } else {
        console.log("Aucune donnée reçue");
        setIsLoading(false);
      }
    } else {
      console.log("Erreur de connexion");
      const errorData = await response.text();
      try {
        const errorJson = JSON.parse(errorData);
        alert(errorJson.message); // Affichage de l'erreur à l'utilisateur
      } catch {
        alert(errorData); // Affichage de l'erreur si elle n'est pas en JSON
      }
      setIsLoading(false);
    }
  }

  // Structure JSX du formulaire de connexion
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
