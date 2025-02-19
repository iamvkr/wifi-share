import {dirname} from "path"
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
export const rootDir = dirname(__dirname)