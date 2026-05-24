/**
 * services/api.js — All backend API calls
 */

import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
});

// Attach JWT automatically
http.interceptors.request.use((cfg) => {
  const token = localStorage.getItem('fp_token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

// ─── Auth ───────────────────────────
export const verifyWallet = (wallet_address, role) =>
  http.post('/api/auth/verify-wallet', { wallet_address, role });

// ─── Users ──────────────────────────
export const getUser = (address) =>
  http.get(`/api/users/${address}`);

export const updateUser = (data) =>
  http.post('/api/users', data);

// ─── Trades ─────────────────────────
export const createTrade = (data) =>
  http.post('/api/trades', data);

export const getTrades = (status) =>
  http.get('/api/trades', { params: status ? { status } : {} });

export const getPendingVerification = () =>
  http.get('/api/trades/pending-verification');

export const getTrade = (id) =>
  http.get(`/api/trades/${id}`);

export const getTradeStatus = (id) =>
  http.get(`/api/trades/${id}/status`);

// ─── Contract Lifecycle ─────────────
export const acceptContract = (id) =>
  http.post(`/api/trades/${id}/accept`);

export const buildFundTxn = (id) =>
  http.post(`/api/trades/${id}/fund`);

export const markDelivered = (id, formData) =>
  http.post(`/api/trades/${id}/deliver`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const buildConfirmTxn = (id) =>
  http.post(`/api/trades/${id}/confirm`);

export const verifyContract = (id, approved) =>
  http.post(`/api/trades/${id}/verify`, { approved });

export const withdrawFunds = (id) =>
  http.post(`/api/trades/${id}/withdraw`);

export const buildDisputeTxn = (id) =>
  http.post(`/api/trades/${id}/dispute`);

export const buildRefundTxn = (id) =>
  http.post(`/api/trades/${id}/refund`);

export const submitSignedTxn = (id, signed_txn) =>
  http.post(`/api/trades/${id}/submit-txn`, { signed_txn });

export const voteDispute = (id, vote_for_farmer) =>
  http.post(`/api/trades/${id}/vote-dispute`, { vote_for_farmer });

// ─── Verifiers ──────────────────────
export const getVerifiers = () =>
  http.get('/api/verifiers');

export const addVerifier = (data) =>
  http.post('/api/verifiers', data);

export const removeVerifier = (address) =>
  http.delete(`/api/verifiers/${address}`);

export default http;
