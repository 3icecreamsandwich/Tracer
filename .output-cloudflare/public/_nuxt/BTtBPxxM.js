import{t as e}from"./DNESoGCl.js";var t=`profile`;function n(n){return{async get(){let e=(await n.select(`SELECT id, name, email, supabase_user_id, created_at FROM profile WHERE id = ? LIMIT 1;`,[t]))[0];return e?{id:e.id,name:e.name,email:e.email,supabaseUserId:e.supabase_user_id,createdAt:e.created_at}:null},async set(r){await n.execute(`INSERT INTO profile (id, name, email, supabase_user_id, created_at)
         VALUES (?, ?, ?, ?, ${e()})
         ON CONFLICT(id) DO UPDATE SET
           name = excluded.name,
           email = excluded.email,
           supabase_user_id = COALESCE(excluded.supabase_user_id, profile.supabase_user_id);`,[t,r.name,r.email,r.supabaseUserId??null]);let i=await this.get();if(!i)throw Error(`Failed to upsert profile`);return i}}}export{n as t};