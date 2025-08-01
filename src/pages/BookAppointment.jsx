import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(10); // 🔢 Countdown starts at 10 seconds

  useEffect(() => {
    fetch('/doctors.json')
      .then((res) => res.json())
      .then((data) => {
        const doc = data.find((d) => d.id === parseInt(id));
        setDoctor(doc);
      });
  }, [id]);

  // ⏳ Countdown effect
  useEffect(() => {
    if (submitted && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (submitted && countdown === 0) {
      navigate('/');
    }
  }, [submitted, countdown, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, date, time } = formData;
    if (!name || !email || !date || !time) return alert('Please fill in all fields.');

    setSubmitted(true);
  };

  if (!doctor) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Book Appointment with {doctor.name}</h2>
      {submitted ? (
        <p className="success">
          Appointment booked successfully! We'll email you confirmation.
          <br />
          Redirecting to Home in <strong>{countdown}</strong> seconds...
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="booking-form">
          <input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} />
          <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input name="date" type="date" value={formData.date} onChange={handleChange} />
          <select name="time" value={formData.time} onChange={handleChange}>
            <option value="">Select Time</option>
            {doctor.schedule.map((slot, idx) => (
              <option key={idx} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          <button type="submit">Confirm Booking</button>
        </form>
      )}
    </div>
  );
};

export default BookAppointment;
