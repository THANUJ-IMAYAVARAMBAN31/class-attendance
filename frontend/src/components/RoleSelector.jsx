export default function RoleSelector({ role, setRole }) {
  return (
    <select value={role} onChange={(e) => setRole(e.target.value)}>
      <option value="user">User</option>
      <option value="head">Head</option>
      <option value="security">Security</option>
    </select>
  );
}
