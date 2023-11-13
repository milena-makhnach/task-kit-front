import { fetchBaseQuery } from '@reduxjs/toolkit/query';

import axios from 'axios';

export const baseQuery = fetchBaseQuery({
	baseUrl: '/api',
});

export const api = axios.create({
	baseURL: '/api/',
});
