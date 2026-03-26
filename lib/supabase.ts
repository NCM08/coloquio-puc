import { createClient } from '@supabase/supabase-js';

// 1. Obtenemos las llaves desde el archivo .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 2. Validación de seguridad para que el sistema no explote si no encuentra las llaves
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltan las llaves de Supabase. Verifica tu archivo .env.local');
}

// 3. Creamos y exportamos la conexión oficial
export const supabase = createClient(supabaseUrl, supabaseAnonKey);