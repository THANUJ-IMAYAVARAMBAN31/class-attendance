import { useState } from 'react';
import apiRequest from '../context/api';

export default function RequestAccess() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [branch, setBranch] = useState('');

  const submitRequest = async () => {
    try {
      await apiRequest('/api/user/request', 'POST', {
        username,
        password,
        branch
      });
      alert('Request sent to Head');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>User Access Request</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <select onChange={e => setBranch(e.target.value)}>
        <option value="">Select Branch</option>
        <option value="CSE">CSE</option>
        <option value="ECE">ECE</option>
      </select>

      <button onClick={submitRequest}>Send Request</button>
    </div>
  );
}
