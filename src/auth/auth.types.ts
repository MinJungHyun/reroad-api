export enum RequestTokenValidationStatus {
  VALID = 'VALID',
  INVALID = 'INVALID',
  EXPIRED = 'EXPIRED',
}

export interface RequestTokenValidation {
  status: RequestTokenValidationStatus;
  message: string;
  targetId: number;
  timestamp: number;
  requestName?: string;
}
