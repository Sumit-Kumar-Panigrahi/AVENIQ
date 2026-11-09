import type { ApiResponse, HealthStatus } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export async function fetchHealth(): Promise<HealthStatus> {
  const response = await fetch(`${API_BASE_URL}/health`);
  if (!response.ok) {
    throw new Error(`Health check failed with status: ${response.status}`);
  }
  const result: ApiResponse<HealthStatus> = await response.json();
  if (result.status !== 'success' || !result.data) {
    throw new Error(result.message || 'Failed to retrieve valid health response');
  }
  return result.data;
}
