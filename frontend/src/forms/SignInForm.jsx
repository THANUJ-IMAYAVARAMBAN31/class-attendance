export default function SignInForm({ form, setForm }) {
  return (
    <>
      <input placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <input placeholder="Branch" onChange={e => setForm({ ...form, branch: e.target.value })} />
      <input placeholder="Class" onChange={e => setForm({ ...form, className: e.target.value })} />
    </>
  );
}
