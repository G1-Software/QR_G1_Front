import "../styles/App.css";
import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { LogoutButton } from "../components/LogoutButton";

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
