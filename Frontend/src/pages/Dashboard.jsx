import React, { useEffect, useState } from 'react';
import { getExercises } from '../api/wger';

export default function Dashboard() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExercises()
      .then(res => {
        // API returns data inside res.data.results
        setExercises(res.data.results);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed fetching exercises:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading exercises...</p>;

  if (exercises.length === 0) return <p>No exercises found.</p>;

  return (
    <div>
      <h1>Exercises</h1>
      <ul>
        {exercises.map(ex => (
          <li key={ex.id}>{ex.name || 'Unnamed Exercise'}</li>
        ))}
      </ul>
    </div>
  );
}