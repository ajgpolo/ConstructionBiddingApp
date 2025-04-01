export interface Project {
  id: number;
  location: string;
  projectType: string;
  projectSize: number;
  cost: number;
  timeDays: number;
  equipment: string;
  materials: string;
  laborHours: number;
  laborType: string;
  contingencyCost: number;
  contingencyTime: number;
  created_at?: string;
}

export type ProjectInsert = Omit<Project, 'id' | 'created_at'>;
export type ProjectUpdate = Partial<ProjectInsert>; 