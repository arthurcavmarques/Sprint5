export interface Patient {
  id: number;
  name: string;
  age: number;
  phone: string;
  address: string;
  notes?: string;
}

export interface Consultation {
  id: number;
  patientId: number;
  date: string;
  reason: string;
  notes?: string;
}

export const patients: Patient[] = [];

export const consultations: Consultation[] = [];
