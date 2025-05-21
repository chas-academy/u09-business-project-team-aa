import axios from 'axios';

const API_KEY = '21f26919e4b830d9a3af346ec21c3e571cb01525';

// Setup axios instance with base URL and auth header
const wgerAPI = axios.create({
  baseURL: 'https://wger.de/api/v2/',
  headers: {
    Authorization: `Token ${API_KEY}`,
  },
});

// Function to get exercises list
export function getExercises() {
  return wgerAPI.get('exercise/');
}