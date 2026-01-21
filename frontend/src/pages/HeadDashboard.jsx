import { useEffect, useState } from 'react';
import apiRequest from '../context/api';
import Navbar from '../components/Navbar';
import RequestList from '../components/RequestList';

export default function HeadDashboard() {
  const [requests, setRequests] = useState([]);
  const [createBranch, setCreateBranch] = useState('');
  const [filterBranch, setFilterBranch] = useState('');
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [absent, setAbsent] = useState([]);

  const [className, setClassName] = useState('');
  const [date, setDate] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    apiRequest('/api/head/requests', 'GET', null, token)
      .then(setRequests)
      .catch(err => alert(err.message));
  }, [token]);

  const approve = async (id) => {
    await apiRequest(`/api/head/approve/${id}`, 'POST', null, token);
    setRequests(prev => prev.filter(r => r._id !== id));
  };

  const reject = async (id) => {
    await apiRequest(`/api/head/reject/${id}`, 'POST', null, token);
    setRequests(prev => prev.filter(r => r._id !== id));
  };

  const fetchClasses = async () => {
    const data = await apiRequest(
      `/api/head/classes?branch=${filterBranch}`,
      'GET',
      null,
      token
    );
    setClasses(data);
  };

  const fetchAttendance = async (cls) => {
    setSelectedClass(cls);

    const present = await apiRequest(
      `/api/head/attendance?classId=${cls._id}`,
      'GET',
      null,
      token
    );

    const absentStudents = await apiRequest(
      `/api/head/absent?classId=${cls._id}`,
      'GET',
      null,
      token
    );

    setAttendance(present);
    setAbsent(absentStudents);
  };

  const createClass = async () => {
    await apiRequest('/api/head/class', 'POST', {
      branch: createBranch,
      className,
      classDate: date,
      startTime: start,
      endTime: end
    }, token);

    alert('Class created');
    fetchClasses();
  };

  return (
    <>
      <Navbar title="Head Dashboard" />

      <div className="page-container">
        <div className="request-list">
  {requests.map(r => (
  <div key={r._id} className="request-card">
    <div className="request-info">
      <h4>{r.username}</h4>
      <p>{r.branch}</p>
    </div>

    <div className="request-actions">
      <button
        className="approve-btn"
        onClick={() => approve(r._id)}
      >
        Approve
      </button>

      <button
        className="reject-btn"
        onClick={() => reject(r._id)}
      >
        Reject
      </button>
    </div>
  </div>
))}

</div>


        <div className="card">
          <h3>Create Class</h3>

          <div className="form-grid">
            <input className="form-input" placeholder="Class Name" onChange={e => setClassName(e.target.value)} />
            <select className="select-compact" onChange={e => setCreateBranch(e.target.value)}>
              <option value="">Branch</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
            </select>
            <input type="date" onChange={e => setDate(e.target.value)} />
            <input className="auth-input" placeholder="Start Time (10:00)" onChange={e => setStart(e.target.value)} />
            <input className="auth-input" placeholder="End Time (10:50)" onChange={e => setEnd(e.target.value)} />
          </div>

          <button className="primary-btn" onClick={createClass}>
            Create Class
          </button>
        </div>

        <div className="card">
          <h3>Classes</h3>

          <select className="select-compact" onChange={e => setFilterBranch(e.target.value)}>
            <option value="">Select Branch</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
          </select>

          <button className="secondary-btn" onClick={fetchClasses}>
            Load Classes
          </button>

          <div className="class-list">
            {classes.map(cls => (
              <button
                key={cls._id}
                className="class-item"
                onClick={() => fetchAttendance(cls)}
              >
                {cls.className} — {cls.classDate}
              </button>
            ))}
          </div>
        </div>

        {selectedClass && (
          <div className="card split">
            <div>
              <h4>Present Students</h4>
              <ul className="present-list">
                {attendance.map(a => (
                  <li key={a._id}>{a.user.username}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4>Absent Students</h4>
              <ul className="absent-list">
                {absent.map(u => (
                  <li key={u._id}>{u.username}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
