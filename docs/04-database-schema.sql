-- =============================================================
-- Akintom Global Resources — Database Schema (PostgreSQL)
-- Leads, consultations, universities, testimonials, news/events
-- =============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ---------- Enquiries / Leads ----------
CREATE TYPE lead_status AS ENUM ('new','contacted','consultation_booked','applying','offer','visa','enrolled','closed_lost');
CREATE TYPE lead_source AS ENUM ('contact_form','whatsapp','phone','event','referral','walk_in');

CREATE TABLE leads (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name          VARCHAR(120)  NOT NULL,
  email              VARCHAR(255)  NOT NULL,
  phone              VARCHAR(32)   NOT NULL,
  preferred_course   VARCHAR(160),
  desired_university VARCHAR(160),
  message            TEXT,
  source             lead_source   NOT NULL DEFAULT 'contact_form',
  status             lead_status   NOT NULL DEFAULT 'new',
  assigned_advisor   UUID REFERENCES advisors(id),
  utm_source         VARCHAR(80),
  utm_medium         VARCHAR(80),
  utm_campaign       VARCHAR(120),
  consent_marketing  BOOLEAN       NOT NULL DEFAULT FALSE,
  created_at         TIMESTAMPTZ   NOT NULL DEFAULT now(),
  updated_at         TIMESTAMPTZ   NOT NULL DEFAULT now()
);
CREATE INDEX idx_leads_status     ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_email      ON leads(email);

CREATE TABLE advisors (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name  VARCHAR(120) NOT NULL,
  email      VARCHAR(255) NOT NULL UNIQUE,
  phone      VARCHAR(32),
  role_title VARCHAR(120),
  is_active  BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE consultations (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id      UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  advisor_id   UUID REFERENCES advisors(id),
  scheduled_at TIMESTAMPTZ NOT NULL,
  channel      VARCHAR(24) NOT NULL DEFAULT 'office', -- office | whatsapp | zoom | phone
  notes        TEXT,
  outcome      VARCHAR(40),                            -- attended | no_show | rescheduled
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_consultations_scheduled ON consultations(scheduled_at);

-- ---------- Universities ----------
CREATE TABLE universities (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          VARCHAR(120) NOT NULL UNIQUE,
  name          VARCHAR(160) NOT NULL,
  city          VARCHAR(80)  NOT NULL,
  region        VARCHAR(80),
  ranking_label VARCHAR(120),          -- e.g. "QS World Top 40"
  is_partner    BOOLEAN NOT NULL DEFAULT TRUE,
  image_url     TEXT,
  description   TEXT,
  sort_order    INT NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE university_programs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  university_id UUID NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
  name          VARCHAR(160) NOT NULL,
  level         VARCHAR(24)  NOT NULL  -- foundation | undergraduate | postgraduate | phd
);
CREATE INDEX idx_programs_university ON university_programs(university_id);

-- ---------- Testimonials ----------
CREATE TABLE testimonials (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name  VARCHAR(120) NOT NULL,
  course        VARCHAR(160),
  university_id UUID REFERENCES universities(id),
  category      VARCHAR(40) NOT NULL DEFAULT 'postgraduate', -- undergraduate | postgraduate | scholarship | visa
  rating        SMALLINT NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  quote         TEXT NOT NULL,
  story         TEXT,
  photo_url     TEXT,
  video_url     TEXT,
  is_featured   BOOLEAN NOT NULL DEFAULT FALSE,
  is_published  BOOLEAN NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_testimonials_published ON testimonials(is_published, is_featured);

-- ---------- News, Events & Blog ----------
CREATE TYPE post_category AS ENUM ('study-abroad-tips','scholarships','uk-universities','visa-updates','events');

CREATE TABLE posts (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug             VARCHAR(180) NOT NULL UNIQUE,
  title            VARCHAR(200) NOT NULL,
  excerpt          VARCHAR(320),
  body             TEXT,
  category         post_category NOT NULL,
  cover_image_url  TEXT,
  meta_title       VARCHAR(70),
  meta_description VARCHAR(160),
  author_id        UUID REFERENCES advisors(id),
  published_at     TIMESTAMPTZ,
  is_published     BOOLEAN NOT NULL DEFAULT FALSE,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_posts_published ON posts(is_published, published_at DESC);
CREATE INDEX idx_posts_category  ON posts(category);

CREATE TABLE events (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id      UUID REFERENCES posts(id) ON DELETE SET NULL,
  title        VARCHAR(200) NOT NULL,
  starts_at    TIMESTAMPTZ NOT NULL,
  ends_at      TIMESTAMPTZ,
  venue        VARCHAR(200),
  city         VARCHAR(80),
  rsvp_url     TEXT,
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_events_starts ON events(starts_at);

-- ---------- Newsletter ----------
CREATE TABLE newsletter_subscribers (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email        VARCHAR(255) NOT NULL UNIQUE,
  confirmed_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
