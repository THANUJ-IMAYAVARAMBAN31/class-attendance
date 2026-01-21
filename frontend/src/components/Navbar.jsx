import { useNavigate, useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";

export default function Navbar({ title }) {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  if (!token) return null;

  return (
    <nav className="top-nav fade-in-up">
      <h2>{title}</h2>

      <div className="nav-right">
        <button
          className="theme-toggle-btn"
          onClick={() => {
            document.body.classList.toggle("light");
            localStorage.setItem(
              "theme",
              document.body.classList.contains("light") ? "light" : "dark"
            );
          }}
        >
          🌗
        </button>

        <LogoutButton />
      </div>
    </nav>
  );
}
