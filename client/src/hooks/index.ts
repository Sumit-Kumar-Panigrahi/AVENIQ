import { useState, useEffect } from 'react';
import { fetchHealth } from '../services/api';
import type { HealthStatus } from '../types';

export function useApiHealth() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function checkHealth() {
      try {
        setLoading(true);
        const data = await fetchHealth();
        if (isMounted) {
          setHealth(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unknown error');
          setHealth(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    checkHealth();

    return () => {
      isMounted = false;
    };
  }, []);

  return { health, loading, error };
}
