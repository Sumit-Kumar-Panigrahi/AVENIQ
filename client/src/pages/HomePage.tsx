import React from 'react';
import {
  Server,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Cpu,
  Database,
  Network,
} from 'lucide-react';
import { useApiHealth } from '../hooks';
import { Badge } from '../components';

export const HomePage: React.FC = () => {
  const { health, loading, error } = useApiHealth();

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="border border-slate-800 bg-slate-900/40 rounded-xl p-8 backdrop-blur">
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
          System Foundation Initialized
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          Aveniq Phase 1 core architecture and monorepo structure are fully established. This
          minimal verification view confirms frontend routing, styling, component hierarchy, and
          backend API health connectivity.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Badge variant="info">Modular Monolith</Badge>
          <Badge variant="info">React 18 + TypeScript</Badge>
          <Badge variant="info">Vite + Tailwind CSS</Badge>
          <Badge variant="info">Node.js + Express</Badge>
          <Badge variant="info">Prisma ORM</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Frontend Architecture Card */}
        <div className="border border-slate-800 bg-slate-900/30 rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-500/20">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">Frontend Core</h2>
              <p className="text-xs text-slate-400">Vite + React Router + Tailwind</p>
            </div>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Strict TypeScript compilation</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Declarative routing via React Router</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Tailwind CSS utility styling</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>ESLint flat config code standards</span>
            </li>
          </ul>
        </div>

        {/* Backend & API Health Card */}
        <div className="border border-slate-800 bg-slate-900/30 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
                <Server className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-white">API Health Probe</h2>
                <p className="text-xs text-slate-400">GET /api/v1/health</p>
              </div>
            </div>
            {loading ? (
              <RefreshCw className="h-4 w-4 text-slate-400 animate-spin" />
            ) : health ? (
              <Badge variant="success">Online</Badge>
            ) : (
              <Badge variant="warning">Offline</Badge>
            )}
          </div>

          {loading && (
            <p className="text-xs text-slate-400 italic">Querying backend health endpoint...</p>
          )}

          {error && (
            <div className="p-3 bg-amber-950/40 border border-amber-900/60 rounded text-xs text-amber-300 flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Backend Not Connected</p>
                <p className="text-amber-400/80 mt-0.5">{error}</p>
              </div>
            </div>
          )}

          {health && (
            <div className="p-3 bg-slate-950 border border-slate-800 rounded font-mono text-xs text-slate-300 space-y-1">
              <div>
                <span className="text-slate-500">Service:</span> {health.service}
              </div>
              <div>
                <span className="text-slate-500">Version:</span> {health.version}
              </div>
              <div>
                <span className="text-slate-500">Environment:</span> {health.environment}
              </div>
              <div>
                <span className="text-slate-500">Status:</span>{' '}
                <span className="text-emerald-400">{health.status}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Planned Future Architecture Notice */}
      <div className="border border-slate-800/80 bg-slate-900/20 rounded-lg p-6 text-xs text-slate-400 space-y-3">
        <div className="flex items-center gap-2 text-slate-300 font-medium">
          <Database className="h-4 w-4 text-indigo-400" />
          <span>Database & Future Capabilities</span>
        </div>
        <p>
          PostgreSQL database schema definition and business entities (Tickets, Incidents, SLAs,
          Real-time WebSockets, AI Assistants) will be introduced in subsequent phases following
          modular boundaries.
        </p>
        <div className="flex items-center gap-4 text-slate-500 pt-2 border-t border-slate-800/60">
          <span className="flex items-center gap-1.5">
            <Network className="h-3.5 w-3.5" /> REST API v1
          </span>
          <span>&bull;</span>
          <span>Strict Validation via Zod</span>
          <span>&bull;</span>
          <span>Prisma ORM Prepared</span>
        </div>
      </div>
    </div>
  );
};
