export interface Patient {
  id: string;
  name: string;
  birth?: string;
  cpf?: string;
  phone?: string;
  email?: string;
  notes?: string;
}

export interface Consultation {
  id: number;
  patientId: string;
  date: string;
  reason: string;
  notes?: string;
}

export const patients: Patient[] = [];

export const consultations: Consultation[] = [];
