import axios from 'axios';

const wgerAPI = axios.create({
  baseURL: 'https://wger.de/api/v2/',
  // No Authorization header needed for public GET requests here
});

export function getExercises() {
  // Get only approved English exercises
  return wgerAPI.get('exerciseinfo/?language=2');
}