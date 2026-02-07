'use client';

import { api } from '@/lib/api-client';

export type LabDifficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export type LabStep = {
  id: string;
  title: string;
  objective: string;
  expectedOutcome: string;
};

export type Lab = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  difficulty: LabDifficulty;
  tags: string[];
  estimatedMinutes: number;
  enrollmentCount: number;
  steps: LabStep[];
  createdAt: string;
  updatedAt: string;
};

type AnyApiResponse<T> = {
  success?: boolean;
  data?: T;
};

function isApiResponse<T>(value: unknown): value is AnyApiResponse<T> {
  return typeof value === 'object' && value !== null;
}

export async function fetchLabs(options?: { token?: string; regionCode?: string }): Promise<Lab[]> {
  try {
    const res = await api.get<AnyApiResponse<Lab[]>>('/labs', {
      token: options?.token,
      regionCode: options?.regionCode,
    });

    if (isApiResponse<Lab[]>(res) && Array.isArray(res.data)) return res.data;
    if (Array.isArray(res as unknown)) return res as unknown as Lab[];

    return mockLabs;
  } catch {
    return mockLabs;
  }
}

export async function fetchLabBySlug(
  slug: string,
  options?: { token?: string; regionCode?: string },
): Promise<Lab | null> {
  try {
    const res = await api.get<AnyApiResponse<Lab>>(`/labs/${encodeURIComponent(slug)}`, {
      token: options?.token,
      regionCode: options?.regionCode,
    });

    if (isApiResponse<Lab>(res) && res.data) return res.data;

    return mockLabs.find((l) => l.slug === slug) ?? null;
  } catch {
    return mockLabs.find((l) => l.slug === slug) ?? null;
  }
}

const now = new Date().toISOString();

export const mockLabs: Lab[] = [
  {
    id: 'lab-phishing-triage',
    title: 'Phishing Triage (Email Header Analysis)',
    slug: 'phishing-triage-email-headers',
    shortDescription: 'Analyze email headers and identify malicious indicators like spoofing and suspicious hops.',
    description:
      'You’ll learn to read message headers, spot sender spoofing, validate SPF/DKIM/DMARC signals, and decide the correct response. This lab is designed for global SOC workflows and enterprise readiness.',
    difficulty: 'BEGINNER',
    tags: ['blue-team', 'phishing', 'soc'],
    estimatedMinutes: 25,
    enrollmentCount: 3820,
    steps: [
      {
        id: 's1',
        title: 'Collect indicators',
        objective: 'Extract sender, reply-to, and domain indicators from the sample email.',
        expectedOutcome: 'You identify the suspicious sender domain and mismatched reply-to.',
      },
      {
        id: 's2',
        title: 'Validate authentication',
        objective: 'Assess SPF/DKIM/DMARC outcomes and interpret what they mean.',
        expectedOutcome: 'You explain why a “pass” can still be malicious and flag anomalies.',
      },
      {
        id: 's3',
        title: 'Decision + response',
        objective: 'Decide if this is phishing and outline a response playbook.',
        expectedOutcome: 'You recommend quarantine/reporting and a user notification workflow.',
      },
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'lab-web-logs',
    title: 'Web Attack Detection (Log Hunting)',
    slug: 'web-attack-detection-log-hunting',
    shortDescription: 'Hunt suspicious web traffic patterns and detect common attack signatures.',
    description:
      'Practice identifying brute force patterns, path traversal, SQL injection attempts, and exploit scanning in web logs. Learn how to separate signal from noise for production environments.',
    difficulty: 'INTERMEDIATE',
    tags: ['logs', 'detection', 'web-security'],
    estimatedMinutes: 35,
    enrollmentCount: 2410,
    steps: [
      {
        id: 's1',
        title: 'Baseline normal traffic',
        objective: 'Identify normal endpoints and expected status code distributions.',
        expectedOutcome: 'You can explain what “normal” looks like for this app.',
      },
      {
        id: 's2',
        title: 'Detect suspicious patterns',
        objective: 'Find repeated failed logins and scanning patterns.',
        expectedOutcome: 'You find at least two malicious IPs and their behavior.',
      },
      {
        id: 's3',
        title: 'Write a detection rule',
        objective: 'Define a simple detection logic for alerting.',
        expectedOutcome: 'You produce a clear rule definition and false positive notes.',
      },
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'lab-incident-comms',
    title: 'Incident Response Communications (Exec Summary)',
    slug: 'incident-response-exec-summary',
    shortDescription: 'Write a clear executive summary and stakeholder update during an incident.',
    description:
      'Learn how to communicate risk, impact, and actions clearly to leadership. This lab is designed to match real-world global teams and investor-grade reporting standards.',
    difficulty: 'ADVANCED',
    tags: ['incident-response', 'comms', 'leadership'],
    estimatedMinutes: 30,
    enrollmentCount: 1180,
    steps: [
      {
        id: 's1',
        title: 'Identify audience and facts',
        objective: 'Choose the audience and list the non-negotiable facts to report.',
        expectedOutcome: 'You produce a fact list and stakeholder mapping.',
      },
      {
        id: 's2',
        title: 'Draft executive summary',
        objective: 'Write a concise summary in plain language.',
        expectedOutcome: 'You write a summary with scope, impact, and confidence levels.',
      },
      {
        id: 's3',
        title: 'Action plan + next update',
        objective: 'Define next steps and update cadence.',
        expectedOutcome: 'You propose owners, timelines, and the next update time.',
      },
    ],
    createdAt: now,
    updatedAt: now,
  },
];
