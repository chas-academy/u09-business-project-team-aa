import React, { useEffect, useState } from 'react';
import { getExercises } from '../api/wger';

export default function Dashboard() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExercises()
      .then(res => {
        setExercises(res.data.results);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed fetching exercises:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading exercises...</p>;

  return (
    <div>
      <h1>Exercises</h1>
      <ul>
        {exercises.map(ex => (
          <li key={ex.id}>{ex.name}</li>
        ))}
      </ul>
    </div>
  );
}