const QRCode = require('qrcode');

const generateQR = async (data) => {
  try {
    const qrCode = await QRCode.toDataURL(data);
    return qrCode;
  } catch (error) {
    throw new Error('QR generation failed');
  }
};

module.exports = generateQR;
