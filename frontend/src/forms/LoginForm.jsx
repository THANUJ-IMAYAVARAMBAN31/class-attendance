export default function LoginForm({ username, setUsername, password, setPassword }) {
  return (
    <>
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
    </>
  );
}
