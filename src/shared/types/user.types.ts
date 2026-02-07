import type { UserRole, RegionCode, TwoFactorMethod } from '../enums';

// ============================================
// User Types — shared across all clients
// ============================================

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
  regionCode: RegionCode;
  avatarUrl?: string;
  isVerified: boolean;
  emailVerifiedAt?: string | null;
  twoFactorEnabled: boolean;
  twoFactorMethod?: TwoFactorMethod | null;
  whatsappOptIn: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user?: UserProfile;
  tokens?: AuthTokens;
  mfaRequired?: boolean;
  mfaToken?: string;
  verificationRequired?: boolean;
}

export interface JwtPayload {
  sub: string; // userId
  email: string;
  role: UserRole;
  regionCode: RegionCode;
  iat?: number;
  exp?: number;
}
