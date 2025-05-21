import axios from 'axios';

const wgerAPI = axios.create({
  baseURL: 'https://wger.de/api/v2/',
});

export function getExercises() {
  return wgerAPI.get('exerciseinfo/', {
    params: {
      language: 2, // English
      status: 2,   // Published
    },
  });
}