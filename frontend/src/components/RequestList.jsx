export default function RequestList({ requests, onApprove, onReject }) {
  return (
    <>
      {requests.map(req => (
        <div key={req._id}>
          {req.username} | {req.branch} | {req.className}
          <button onClick={() => onApprove(req._id)}>Approve</button>
          <button onClick={() => onReject(req._id)}>Reject</button>
        </div>
      ))}
    </>
  );
}
