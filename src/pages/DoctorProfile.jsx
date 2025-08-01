import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const DoctorProfile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    fetch('/doctors.json')
      .then((res) => res.json())
      .then((data) => {
        const doc = data.find((d) => d.id === parseInt(id));
        setDoctor(doc);
      });
  }, [id]);

  if (!doctor) return <p>Loading...</p>;

  return (
    <div className="container">
  <div className="profile-page">
    <h2>{doctor.name}</h2>
    <img src={doctor.image} alt={doctor.name} />
    <p><strong>Specialization:</strong> {doctor.specialization}</p>
    <p><strong>Availability:</strong> {doctor.availability}</p>
    <p><strong>Bio:</strong> {doctor.bio}</p>

    {doctor.schedule.length > 0 && (
      <>
        <h4>Available Slots</h4>
        <ul>
          {doctor.schedule.map((time, idx) => (
            <li key={idx}>{time}</li>
          ))}
        </ul>
      </>
    )}
    <a href={`/book/${doctor.id}`} className="btn">Book Appointment</a>
  </div>
</div>

  );
};

export default DoctorProfile;
