import { useEffect, useState } from 'react';
import apiRequest from '../context/api';
import Navbar from '../components/Navbar';
import AttendanceTable from '../components/AttendanceTable';

export default function UserDashboard() {
  const [logs, setLogs] = useState([]);
  const [user, setUser] = useState(null);
  const [showQR, setShowQR] = useState(false);

  const fetchAttendance = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const data = await apiRequest('/api/user/attendance', 'GET', null, token);
      setLogs(data);
    } catch {
      alert('Failed to fetch attendance');
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    fetchAttendance();
  }, []);

  return (
  <>
    <Navbar title="User Dashboard" />

    <div className="page-container">
      {user && (
        <div className="user-welcome-card">
          <h3>Welcome back, <span>{user.username}</span></h3>
          <p>Branch: <strong>{user.branch}</strong> | Role: Student</p>

          <button
            className="primary-btn"
            onClick={() => setShowQR(!showQR)}
          >
            {showQR ? 'Hide QR Code' : 'Show My QR Code'}
          </button>

          <div className={`qr-section ${showQR ? 'expanded' : ''}`}>
            <div className="qr-container">
              <div className="qr-code">
                <img src={user.qrCode} alt="User QR Code" />
              </div>
              <p>Scan this QR code for attendance</p>
            </div>
          </div>
        </div>
      )}

      <div className="card">
        <h3>Attendance History</h3>
        <AttendanceTable logs={logs} />
      </div>
    </div>
  </>
);
}
