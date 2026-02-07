import type { EventStatus, EventType, LiveProvider, LiveSessionStatus } from '../enums';

// ============================================
// Events & Live Sessions Types
// ============================================

export interface Event {
  id: string;
  title: string;
  description?: string;
  type: EventType;
  status: EventStatus;
  timezone: string;
  startsAt?: string;
  endsAt?: string;
  regionCode?: string;
  createdById?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LiveSession {
  id: string;
  eventId: string;
  provider: LiveProvider;
  status: LiveSessionStatus;
  meetingId?: string;
  joinUrl?: string;
  startUrl?: string;
  hostEmail?: string;
  passcode?: string;
  scheduledStart?: string;
  scheduledEnd?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}
