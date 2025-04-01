import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { ProjectInsert } from '../types/database.types';
import { projectStore } from '../store/projectStore';

const importHistoricalProjects = async (csvFilePath: string) => {
  try {
    // Read CSV file
    const csvFile = fs.readFileSync(csvFilePath, 'utf-8');
    
    // Parse CSV
    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const projects = results.data as ProjectInsert[];
        let insertedCount = 0;

        // Insert each project
        projects.forEach((project) => {
          // Convert string numbers to actual numbers
          const formattedProject: ProjectInsert = {
            ...project,
            projectSize: Number(project.projectSize),
            cost: Number(project.cost),
            timeDays: Number(project.timeDays),
            laborHours: Number(project.laborHours),
            contingencyCost: Number(project.contingencyCost),
            contingencyTime: Number(project.contingencyTime)
          };

          try {
            projectStore.create(formattedProject);
            insertedCount++;
          } catch (error: unknown) {
            console.error(`Failed to insert project:`, project);
            if (error instanceof Error) {
              console.error(error.message);
            } else {
              console.error(error);
            }
          }
        });

        console.log(`Successfully imported ${insertedCount} projects`);
        console.log(`Failed to import ${projects.length - insertedCount} projects`);
      },
      error: (error: Error) => {
        console.error('Error parsing CSV:', error);
      }
    });
  } catch (error: unknown) {
    console.error('Error reading CSV file:', error instanceof Error ? error.message : error);
  }
};

// Run the import if this file is run directly
if (require.main === module) {
  const csvFilePath = path.join(__dirname, '../../data/historical_projects.csv');
  importHistoricalProjects(csvFilePath);
}

export default importHistoricalProjects; 