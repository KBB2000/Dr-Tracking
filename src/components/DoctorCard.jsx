import React from 'react';
import { Link } from 'react-router-dom';

const DoctorCard = ({ doctor }) => {
  return (
    <div className="doctor-card">
      <img src={doctor.image} alt={doctor.name} />
      <h3>{doctor.name}</h3>
      <p>{doctor.specialization}</p>
      <p className={`availability ${doctor.availability.replace(/\s/g, '').toLowerCase()}`}>
        {doctor.availability}
      </p>
      <Link to={`/doctor/${doctor.id}`}>View Profile</Link>
    </div>
  );
};

export default DoctorCard;
