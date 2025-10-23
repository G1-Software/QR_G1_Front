import "../styles/App.css";
import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { LogoutButton } from "../components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";



export function StaffPage() {

  return (
    <div className="container">

      <main>
        <h1> Ingreso de Staff exitoso </h1>
        <LogoutButton />

      </main>

      
    </div>
  );
}
