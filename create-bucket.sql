-- Create a new public bucket named "images"
insert into storage.buckets (id, name, public)
values ('images', 'images', true);

-- Allow public read access to the bucket
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'images' );

-- Allow authenticated or public inserts (for ease of use, you can restrict this later if needed)
-- NOTE: We will be using the server-side API with the service_role key to bypass RLS,
-- so you technically only need the bucket to exist and be public for reading.
create policy "Public Insert"
on storage.objects for insert
with check ( bucket_id = 'images' );

-- Allow public updates/deletes if necessary
create policy "Public Update/Delete"
on storage.objects for update
using ( bucket_id = 'images' );

create policy "Public Delete"
on storage.objects for delete
using ( bucket_id = 'images' );
