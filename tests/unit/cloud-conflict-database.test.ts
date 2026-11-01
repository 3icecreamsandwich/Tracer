import {PGlite} from '@electric-sql/pglite'
import {it,expect} from 'vitest'
import {readFileSync} from 'node:fs'
it('returns a non-retryable HTTP conflict and preserves the newer library row',async()=>{
 const db=new PGlite()
 try {
 await db.exec("create schema auth; create table auth.users(id uuid primary key); create function auth.uid() returns uuid language sql as $$select '00000000-0000-4000-8000-000000000001'::uuid$$; create role anon;create role authenticated;insert into auth.users values(auth.uid());")
 const base=readFileSync(new URL('../../supabase/migrations/20261018232117_cloud_authoritative_library.sql',import.meta.url),'utf8')
 await db.exec(base.slice(0,base.indexOf('create function public.save_cloud_library_item')))
 await db.exec(readFileSync(new URL('../../supabase/migrations/20261101044158_cloud_conflict_status.sql',import.meta.url),'utf8'))
 await db.query("select public.save_cloud_library_item('preferences','app','{}',0)")
 await expect(db.query("select public.save_cloud_library_item('preferences','app','{}',0)")).rejects.toMatchObject({code:'PT409'})
 expect((await db.query('select revision from public.cloud_library_items')).rows).toEqual([{revision:1}])
 }finally{await db.close()}
},30000)
