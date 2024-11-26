import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const createSupabaseServerComponentClient = () => 
  createServerComponentClient({ cookies });

export const createSupabaseRouteHandlerClient = () => 
  createRouteHandlerClient({ cookies });
