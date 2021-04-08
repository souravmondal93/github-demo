
import axios from 'axios';
import { GITHUB_API_URL, API_TIMEOUT } from '../constants/api';

export const githubInstance = axios.create({
  baseURL: GITHUB_API_URL,
  timeout: API_TIMEOUT,
});