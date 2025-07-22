export interface Camera {
  id: string;
  name: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Incident {
  id: string;
  cameraId: string;
  camera: Camera;
  type: string;
  tsStart: Date;
  tsEnd: Date;
  thumbnailUrl: string;
  resolved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type IncidentType = 
  | 'Unauthorised Access'
  | 'Gun Threat'
  | 'Face Recognised'
  | 'Suspicious Activity'
  | 'Theft Alert'
  | 'Fire Detected';

export const INCIDENT_COLORS: Record<string, string> = {
  'Unauthorised Access': 'bg-red-500',
  'Gun Threat': 'bg-red-700',
  'Face Recognised': 'bg-blue-500',
  'Suspicious Activity': 'bg-yellow-500',
  'Theft Alert': 'bg-orange-500',
  'Fire Detected': 'bg-red-600',
};
