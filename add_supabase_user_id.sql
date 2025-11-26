-- Migration: Add supabaseUserId column to users table
-- Run this in Supabase SQL Editor or using psql

-- Add the column if it doesn't exist
ALTER TABLE "users"
ADD COLUMN IF NOT EXISTS "supabaseUserId" TEXT;

-- Add unique constraint
CREATE UNIQUE INDEX IF NOT EXISTS "users_supabaseUserId_key" ON "users"("supabaseUserId");

-- Add comment
COMMENT ON COLUMN "users"."supabaseUserId" IS 'للربط مع Supabase Auth';

