import { formatTime } from '../context/formatTime';

export default function AttendanceTable({ logs }) {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Date</th>
          <th>Time In</th>
          <th>Time Out</th>
          <th>Minutes Spent</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {logs.map(log => (
          <tr key={log._id}>
            <td>{log.date}</td>
            <td>{formatTime(log.timeIn)}</td>
            <td>{formatTime(log.timeOut)}</td>
            <td>{log.durationMinutes ?? '-'}</td>
            <td>{log.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
