-- =====================================================
-- MIGRAÇÃO COMPLETA PARA SUPABASE (zznrdgsrfncjxibmuwhh)
-- Cole este SQL inteiro no SQL Editor do Supabase
-- =====================================================

-- 1. CONFIRMAR EMAIL DO ADMIN
UPDATE auth.users 
SET email_confirmed_at = now(), 
    updated_at = now() 
WHERE email = 'contato@primboo.com.br';

-- 2. CRIAR TABELAS

CREATE TABLE IF NOT EXISTS partner_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  file_path text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS advertiser_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  file_path text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS partner_logos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  file_path text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  maps_query text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- 3. HABILITAR RLS

ALTER TABLE partner_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE advertiser_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_logos ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;

-- 4. POLÍTICAS RLS - Leitura pública, escrita autenticada

-- partner_videos
CREATE POLICY "Public can read partner_videos" ON partner_videos FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert partner_videos" ON partner_videos FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update partner_videos" ON partner_videos FOR UPDATE USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can delete partner_videos" ON partner_videos FOR DELETE USING (auth.role() = 'authenticated');

-- advertiser_videos
CREATE POLICY "Public can read advertiser_videos" ON advertiser_videos FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert advertiser_videos" ON advertiser_videos FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update advertiser_videos" ON advertiser_videos FOR UPDATE USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can delete advertiser_videos" ON advertiser_videos FOR DELETE USING (auth.role() = 'authenticated');

-- partner_logos
CREATE POLICY "Public can read partner_logos" ON partner_logos FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert partner_logos" ON partner_logos FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update partner_logos" ON partner_logos FOR UPDATE USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can delete partner_logos" ON partner_logos FOR DELETE USING (auth.role() = 'authenticated');

-- locations
CREATE POLICY "Public can read locations" ON locations FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert locations" ON locations FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update locations" ON locations FOR UPDATE USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can delete locations" ON locations FOR DELETE USING (auth.role() = 'authenticated');

-- 5. CRIAR BUCKET DE STORAGE

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('media', 'media', true, 104857600, ARRAY['video/mp4','video/webm','video/quicktime','image/png','image/jpeg','image/webp','image/svg+xml'])
ON CONFLICT (id) DO NOTHING;

-- Políticas de storage
CREATE POLICY "Public read media" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Authenticated upload media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated update media" ON storage.objects FOR UPDATE USING (bucket_id = 'media' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated delete media" ON storage.objects FOR DELETE USING (bucket_id = 'media' AND auth.role() = 'authenticated');

-- 6. SEED DATA - Vídeos Parceiros

INSERT INTO partner_videos (title, file_path, sort_order, active) VALUES
('Parceiro 2', '/videos/2.mp4', 1, true),
('Parceiro 4', '/videos/4.mp4', 2, true),
('Parceiro 1', '/videos/1.mp4', 3, true),
('Parceiro 3', '/videos/3.mp4', 4, true),
('Parceiro 5', '/videos/5.mp4', 5, true),
('Parceiro 6', '/videos/6.mp4', 6, true),
('Parceiro 7', '/videos/7.mp4', 7, true),
('Parceiro 8', '/videos/8.mp4', 8, true),
('Parceiro 9', '/videos/9.mp4', 9, true);

-- Vídeos Anunciantes

INSERT INTO advertiser_videos (title, file_path, sort_order, active) VALUES
('Itech Story', '/anunciantes/Itech (Story) (3).mp4', 1, true),
('TV Uptime Caxias', '/anunciantes/TV_UPTIME_CAXIAS_V2.mp4', 2, true),
('IMG 7880', '/anunciantes/IMG_7880.MP4', 3, true),
('Trailer 02', '/anunciantes/trailer 02.mp4', 4, true);

-- Logos Parceiros

INSERT INTO partner_logos (name, file_path, sort_order, active) VALUES
('Parceiro 11', '/logos-parceiros/11.png', 1, true),
('Parceiro 1', '/logos-parceiros/1.png', 2, true),
('Parceiro 2', '/logos-parceiros/2.png', 3, true),
('Parceiro 3', '/logos-parceiros/3.png', 4, true),
('Parceiro 4', '/logos-parceiros/4.png', 5, true),
('Parceiro 5', '/logos-parceiros/5.png', 6, true),
('Parceiro 6', '/logos-parceiros/6.png', 7, true),
('Parceiro 7', '/logos-parceiros/7.png', 8, true),
('Parceiro 8', '/logos-parceiros/8.png', 9, true),
('Parceiro 9', '/logos-parceiros/9.png', 10, true),
('Parceiro 10', '/logos-parceiros/10.png', 11, true);

-- Locais

INSERT INTO locations (name, address, maps_query, sort_order, active) VALUES
('Estádio Centenário', 'R. Thomas Beltrão de Queiroz | Mal Floriano', 'Estádio Centenário, Rua Thomas Beltrão de Queiroz, Mal Floriano, Caxias do Sul, RS', 1, true),
('Barbearia El Toro', 'Av. Rio Branco', 'Barbearia El Toro, Av. Rio Branco, Caxias do Sul, RS', 2, true),
('Soul Cachos', 'R. Os Dezoito do Forte', 'Soul Cachos, R. Os Dezoito do Forte, Caxias do Sul, RS', 3, true),
('Estética e Boutique Dhes', 'Av. Rio Branco (Vitrine)', 'Estética e Boutique Dhes, Av. Rio Branco, Caxias do Sul, RS', 4, true),
('Restaurante Vó Mirta', 'R. Pinheiro Machado', 'Restaurante Vó Mirta, R. Pinheiro Machado, Caxias do Sul, RS', 5, true),
('Arena Pio X', 'Pio X', 'Arena Pio X, Caxias do Sul, RS', 6, true),
('JD Studio', 'Bairro Rio Branco', 'JD Studio, Rio Branco, Caxias do Sul, RS', 7, true),
('Adré Society', 'Bairro Santa Catarina', 'Adré Society, Santa Catarina, Caxias do Sul, RS', 8, true),
('Quadra Parque do Sol', 'Bairro Santa Lucia', 'Quadra Parque do Sol, Santa Lucia, Caxias do Sul, RS', 9, true),
('Salão Studio Beauty', 'R. Bento Gonçalves - Centro', 'Salão Studio Beauty, R. Bento Gonçalves, Centro, Caxias do Sul, RS', 10, true),
('Academia Vida Sports', 'R. Pinheiro Machado | Bairro São Pelegrino', 'Academia Vida Sports, Rua Pinheiro Machado, São Pelegrino, Caxias do Sul, RS', 11, true);
