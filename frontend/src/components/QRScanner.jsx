import { Scanner } from '@yudiel/react-qr-scanner';
import apiRequest  from '../context/api';

const QRScanner = () => {
  const handleScan = async (result) => {
    if (!result) return;

    try {
      const token = localStorage.getItem('token');

      await apiRequest(
        '/api/security/scan',
        'POST',
        { qrData: result[0].rawValue },
        token
      );

      alert('Attendance recorded');
    } catch (err) {
      alert(err.message);
    }
  };

  return <Scanner onScan={handleScan} />;
};

export default QRScanner;
