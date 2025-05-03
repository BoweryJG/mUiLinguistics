-- RepSpheres Supabase Schema
-- This script creates the necessary tables for the RepSpheres application
-- Run this in your Supabase SQL Editor

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- RepSpheres Tables
-- These tables are prefixed with "repspheres_" to avoid conflicts with existing tables

-- Teams Table
CREATE TABLE IF NOT EXISTS repspheres_teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  organization_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a team_members table for team membership (needed for RLS policies)
CREATE TABLE IF NOT EXISTS repspheres_team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID REFERENCES repspheres_teams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member', -- 'admin', 'member', etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(team_id, user_id)
);

-- Conversations Table
CREATE TABLE IF NOT EXISTS repspheres_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  team_id UUID REFERENCES repspheres_teams(id),
  
  -- File metadata
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  duration_seconds INTEGER,
  
  -- Basic metadata
  title TEXT NOT NULL,
  meeting_type TEXT NOT NULL, -- 'discovery', 'demo', 'followup', 'closing', etc.
  approach TEXT NOT NULL, -- 'socratic', 'consultative', 'spin', etc.
  meeting_date TIMESTAMP WITH TIME ZONE,
  
  -- Status tracking
  status TEXT NOT NULL DEFAULT 'analyzing', -- 'analyzing', 'completed', 'error'
  error_message TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Participants Table
CREATE TABLE IF NOT EXISTS repspheres_participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES repspheres_conversations(id) ON DELETE CASCADE,
  
  name TEXT NOT NULL,
  role TEXT NOT NULL, -- 'sales_rep', 'prospect', 'decision_maker', etc.
  email TEXT,
  company TEXT,
  position TEXT,
  
  -- Basic metrics
  speaking_time_seconds INTEGER,
  speaking_percentage SMALLINT,
  interruption_count INTEGER,
  question_count INTEGER,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Behavioral Analysis Table (Consolidated Advanced Analysis)
CREATE TABLE IF NOT EXISTS repspheres_behavioral_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES repspheres_conversations(id) ON DELETE CASCADE,
  
  -- Conversation overview
  conversation_summary TEXT,
  key_points JSONB,
  
  -- Advanced behavioral analysis (FBI-level)
  behavioral_indicators JSONB, -- Consolidated behavioral analysis
  
  -- Psychological profiles
  psychological_profiles JSONB,
  
  -- Strategic advice (Harvey Specter style)
  strategic_advice JSONB,
  
  -- Socratic questioning
  socratic_questions JSONB,
  
  -- Key moments
  key_moments JSONB,
  
  -- Next steps
  next_steps JSONB,
  
  -- Raw data (optional)
  raw_analysis_data JSONB,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_repspheres_conversations_user_id ON repspheres_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_repspheres_conversations_team_id ON repspheres_conversations(team_id);
CREATE INDEX IF NOT EXISTS idx_repspheres_participants_conversation_id ON repspheres_participants(conversation_id);
CREATE INDEX IF NOT EXISTS idx_repspheres_behavioral_analysis_conversation_id ON repspheres_behavioral_analysis(conversation_id);

-- Create GIN indexes for JSONB columns to enable efficient querying
CREATE INDEX IF NOT EXISTS idx_repspheres_behavioral_analysis_indicators ON repspheres_behavioral_analysis USING GIN (behavioral_indicators);
CREATE INDEX IF NOT EXISTS idx_repspheres_behavioral_analysis_profiles ON repspheres_behavioral_analysis USING GIN (psychological_profiles);
CREATE INDEX IF NOT EXISTS idx_repspheres_behavioral_analysis_key_moments ON repspheres_behavioral_analysis USING GIN (key_moments);

-- Enable Row Level Security (RLS)
ALTER TABLE repspheres_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE repspheres_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE repspheres_behavioral_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE repspheres_team_members ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only see their own conversations or their team's conversations
CREATE POLICY "Users can view their own repspheres conversations"
  ON repspheres_conversations
  FOR SELECT
  USING (auth.uid() = user_id OR team_id IN (
    SELECT team_id FROM repspheres_team_members WHERE user_id = auth.uid()
  ));

-- Users can only insert their own conversations
CREATE POLICY "Users can insert their own repspheres conversations"
  ON repspheres_conversations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can only update their own conversations
CREATE POLICY "Users can update their own repspheres conversations"
  ON repspheres_conversations
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Participants inherit the RLS from conversations
CREATE POLICY "Users can view repspheres participants of their conversations"
  ON repspheres_participants
  FOR SELECT
  USING (conversation_id IN (
    SELECT id FROM repspheres_conversations WHERE auth.uid() = user_id OR team_id IN (
      SELECT team_id FROM repspheres_team_members WHERE user_id = auth.uid()
    )
  ));

-- Behavioral analysis inherit the RLS from conversations
CREATE POLICY "Users can view repspheres analysis of their conversations"
  ON repspheres_behavioral_analysis
  FOR SELECT
  USING (conversation_id IN (
    SELECT id FROM repspheres_conversations WHERE auth.uid() = user_id OR team_id IN (
      SELECT team_id FROM repspheres_team_members WHERE user_id = auth.uid()
    )
  ));

-- Create RLS policies for team_members
CREATE POLICY "Users can view their repspheres team memberships"
  ON repspheres_team_members
  FOR SELECT
  USING (auth.uid() = user_id OR team_id IN (
    SELECT team_id FROM repspheres_team_members WHERE user_id = auth.uid() AND role = 'admin'
  ));

-- Example of how to query the JSONB data:
-- 
-- -- Find conversations with high deception likelihood
-- SELECT c.title, c.meeting_type, ba.conversation_summary
-- FROM repspheres_conversations c
-- JOIN repspheres_behavioral_analysis ba ON c.id = ba.conversation_id
-- WHERE (ba.behavioral_indicators->'deception_analysis'->>'overall_deception_likelihood')::int > 70;
-- 
-- -- Find conversations where Harvey Specter advice mentions "closing"
-- SELECT c.title, ba.strategic_advice->>'harvey_specter_advice' as advice
-- FROM repspheres_conversations c
-- JOIN repspheres_behavioral_analysis ba ON c.id = ba.conversation_id
-- WHERE ba.strategic_advice->>'harvey_specter_advice' ILIKE '%closing%';
