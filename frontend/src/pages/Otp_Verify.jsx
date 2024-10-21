import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const activationToken = localStorage.getItem('activationToken');
    try {
      const response = await axios.post('http://localhost:1000/api/auth/verify-otp', { otp, acitavtionToken: activationToken });
      alert(response.data.message);
      if (response.status === 200) {
        navigate('/'); // Redirect to login or home after success
      }
    } catch (error) {
      console.error(error.response?.data?.message);
      console.log(error)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>OTP Verification</h1>
      <input
        type="text"
        name="otp"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
      />
      <button type="submit">Verify OTP</button>
    </form>
  );
};

export default OtpVerification;
