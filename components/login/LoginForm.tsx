"use client";
import { useState, FormEvent, useEffect } from "react";
import {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastViewport,
} from "../ui/toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState({
    title: "",
    description: "",
    variant: "default",
  });
  const [showToast, setShowToast] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setShowToast(false); // Hide toast before making the request

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
        setToastMessage({
          title: "Succès",
          description: "Connexion réussie",
          variant: "success",
        });
        // Store user data in session storage
        sessionStorage.setItem("user", JSON.stringify(jsonData));
        window.location.href = "/maincourante";
      } else {
        console.log("Aucune donnée reçue");
        setToastMessage({
          title: "Erreur",
          description: "Aucune donnée reçue",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    } else {
      const errorData = await response.text();
      try {
        const errorJson = JSON.parse(errorData);
        console.error(errorJson.message);
        setToastMessage({
          title: "Erreur",
          description: "Erreur d'identifiant, réessayez à nouveau",
          variant: "destructive",
        });
      } catch {
        console.error("Erreur de connexion");
        setToastMessage({
          title: "Erreur",
          description: "Erreur d'identifiant, réessayez à nouveau",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }

    setShowToast(true); // Show toast after setting the message
  }

  // Vérifier si l'utilisateur est déjà connecté
  const checkLoginStatus = () => {
    const user = sessionStorage.getItem("user");
    if (user) {
      console.log("Utilisateur déjà connecté");
      window.location.href = "/maincourante";
    }
  };

  // Appeler checkLoginStatus au montage du composant
  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <ToastProvider>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center justify-center p-4 animate-slide-in"
          style={{
            maxWidth: "450px",
            width: "90%",
            margin: "0 auto",
            boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
            padding: "30px",
            borderRadius: "10px",
            backgroundColor: "#fff",
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mb-3 p-3 border rounded w-full"
            placeholder="Entrez votre email"
            style={{
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              outlineColor: "#007bff", // change la outline couleur en bleu claire
              outlineWidth: "1px", // change la largeur de la bordure en 1px
            }}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mb-3 p-3 border rounded w-full"
            placeholder="Entrez votre mot de passe"
            style={{
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              outlineColor: "#007bff", // change la outline couleur en bleu claire
              outlineWidth: "1px", // change la largeur de la bordure en 1px
            }}
          />
          <button
            type="submit"
            className="px-5 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              padding: "12px 25px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
          >
            {isLoading ? "Chargement..." : "Se connecter"}
          </button>
        </form>
        {showToast && (
          <Toast
            variant={toastMessage.variant}
            className={
              toastMessage.variant === "success"
                ? "toast-success"
                : toastMessage.variant === "destructive"
                ? "toast-destructive"
                : ""
            }
          >
            <ToastTitle>{toastMessage.title}</ToastTitle>
            <ToastDescription>{toastMessage.description}</ToastDescription>
          </Toast>
        )}
        <ToastViewport />
      </div>
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
        .toast-success {
          background-color: #d4edda;
          color: #155724;
        }
        .toast-destructive {
          background-color: #f8d7da;
          color: #721c24;
        }
      `}</style>
    </ToastProvider>
  );
}
