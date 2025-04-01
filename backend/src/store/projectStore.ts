import { Project, ProjectInsert } from '../types/database.types';

class ProjectStore {
  private projects: Project[] = [];
  private currentId = 1;

  create(project: ProjectInsert): Project {
    const newProject: Project = {
      ...project,
      id: this.currentId++,
      created_at: new Date().toISOString()
    };
    this.projects.push(newProject);
    return newProject;
  }

  getAll(): Project[] {
    return [...this.projects];
  }

  getById(id: number): Project | undefined {
    return this.projects.find(p => p.id === id);
  }

  update(id: number, project: Partial<ProjectInsert>): Project | undefined {
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) return undefined;

    this.projects[index] = {
      ...this.projects[index],
      ...project
    };
    return this.projects[index];
  }

  delete(id: number): boolean {
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    this.projects.splice(index, 1);
    return true;
  }
}

export const projectStore = new ProjectStore(); 