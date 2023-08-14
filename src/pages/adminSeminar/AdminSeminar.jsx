import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const AdminSeminar = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return <section className="admin-section">{id}</section>;
};

export default AdminSeminar;
