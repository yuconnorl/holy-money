import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
 
neonConfig.fetchConnectionCache = true;
 
export const sql = neon(process.env.DRIZZLE_DATABASE_URL!);

export const db = drizzle(sql);