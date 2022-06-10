import {createClient} from '@supabase/supabase-js';
import CONST from '../CONST';

const supabase = createClient(CONST.SUPABASE_URL, CONST.SUPABASE_PUBLIC_KEY);

export default supabase;
