import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiRequest from '../context/api';

export default function Login() {
  const [role, setRole] = useState('head');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      let url, payload;

      if (role === 'head') {
        url = '/api/head/login';
        payload = { password };
      } else if (role === 'security') {
        url = '/api/security/login';
        payload = { password };
      } else {
        url = '/api/user/login';
        payload = { username, password };
      }

      const res = await apiRequest(url, 'POST', payload);
      localStorage.setItem('token', res.token);
      localStorage.setItem('role', role);
      if (res.user) localStorage.setItem('user', JSON.stringify(res.user));

      navigate(`/${role}`);
    } catch (err) {
      alert(err.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="head">Head</option>
          <option value="security">Security</option>
          <option value="user">User</option>
        </select>

        {role === 'user' && (
         <input
  className="auth-input"
  placeholder="Username"
  value={username}
  onChange={e => setUsername(e.target.value)}
/>

        )}

        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />

        <button className="primary-btn" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
