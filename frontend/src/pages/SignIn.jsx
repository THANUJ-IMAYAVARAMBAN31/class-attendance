import { useState } from 'react';
import apiRequest from '../context/api';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [branch, setBranch] = useState('');

  const submitRequest = async () => {
    if (!username || !password || !branch) {
      alert('All fields are required');
      return;
    }

    try {
      await apiRequest('/api/user/request', 'POST', {
        username,
        password,
        branch
      });

      alert('Request sent to Head for approval');
      setUsername('');
      setPassword('');
      setBranch('');
    } catch (err) {
      alert(err.message || 'Request failed');
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: 'auto' }}>
      <h2>User Access Request</h2>

      <input
        className="auth-input"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />  

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <select value={branch} onChange={e => setBranch(e.target.value)}>
        <option value="">Select Branch</option>
        <option value="CSE">CSE</option>
        <option value="ECE">ECE</option>
      </select>

      <div className="form-actions">
    <button className="primary-btn" onClick={submitRequest}>
       Request Access
     </button>
</div>

    </div>
  );
}
