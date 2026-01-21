import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <nav className="top-nav">
        <h2>Visitor Pass System</h2>
        <Link to="/login" className="primary-btn">Login</Link>
      </nav>

      <div className="hero">
        <h2>Secure. Simple. Smart Attendance.</h2>
        <p>
          A modern QR-based attendance and visitor management system.
          Designed for speed, security and clarity.
        </p>

        <Link to="/signin" className="secondary-btn">
          New Request
        </Link>
      </div>
    </>
  );
}
