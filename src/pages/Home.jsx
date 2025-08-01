import React, { useEffect, useState } from 'react';
import DoctorCard from '../components/DoctorCard';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/doctors.json')
      .then((res) => res.json())
      .then((data) => setDoctors(data));
  }, []);

  const filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase()) ||
    doc.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Find a Doctor</h1>
      <div className="search">
        <SearchBar search={search} setSearch={setSearch} />
      </div>
      <div className="doctor-grid">
        {filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default Home;
