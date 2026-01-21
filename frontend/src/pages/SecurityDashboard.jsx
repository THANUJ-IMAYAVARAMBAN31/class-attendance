import QRScanner from '../components/QRScanner';
import Navbar from '../components/Navbar';

export default function SecurityDashboard() {
  return (
    <>
      <Navbar title="Security Dashboard" />

      <div className="page-container center">
        <div className="card scanner-card">
          <h3>Scan QR Code</h3>
          <QRScanner />
        </div>
      </div>
    </>
  );
}
