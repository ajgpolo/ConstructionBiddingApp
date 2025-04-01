import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { Project } from '../types/database.types';

// Load environment variables from .env file
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or Key in environment variables');
}

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: Project;
        Insert: Project;
        Update: Partial<Project>;
      };
    };
  };
};

export const supabase = createClient<Database>(supabaseUrl, supabaseKey); 