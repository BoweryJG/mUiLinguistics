# RepSpheres - Linguistics Analysis Application

RepSpheres is a web application that analyzes sales conversations to provide insights, behavioral analysis, and strategic advice to sales representatives.

## Supabase Integration

This application uses Supabase for:
1. File storage (audio files)
2. Database (conversation analysis, participants, etc.)
3. Authentication (optional)

## Setup Instructions

### 1. Supabase Setup

1. Create a Supabase account at [supabase.com](https://supabase.com) if you don't have one already
2. Create a new project
3. Get your Supabase URL and anon key from the project settings
4. Update the `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_KEY=your_supabase_key
   ```

### 2. Database Schema Setup

1. Navigate to the SQL Editor in your Supabase dashboard
2. Copy the contents of the `supabase_schema.sql` file
3. Paste it into the SQL Editor and run the queries to create the necessary tables

### 3. Storage Setup

The application will automatically create a storage bucket called `audio-files` when the first file is uploaded. However, you can also create it manually:

1. Go to the Storage section in your Supabase dashboard
2. Create a new bucket called `audio-files`
3. Set the bucket to public (or configure RLS policies as needed)

## Database Schema

The application uses the following tables:

### `conversations`
Stores metadata about each conversation analysis:
- Basic file information (name, URL, size)
- Meeting metadata (type, approach, date)
- Status tracking

### `participants`
Stores information about the participants in each conversation:
- Names and roles
- Speaking metrics (time, percentage, interruptions)

### `behavioral_analysis`
Stores the detailed analysis of each conversation:
- Conversation summary and key points
- Advanced behavioral indicators (deception, stress, power dynamics)
- Psychological profiles of participants
- Strategic advice (Harvey Specter style)
- Socratic questions for follow-up
- Key moments and next steps

### `teams` and `team_members`
Support for team-based access control and analytics.

## Advanced Behavioral Analysis

The application provides sophisticated behavioral analysis including:

1. **Deception Detection**: Identifies inconsistencies and potential deception in the conversation
2. **Stress Analysis**: Detects moments of high stress and tracks stress levels throughout the conversation
3. **Power Dynamics**: Analyzes who controls the conversation and when power shifts occur
4. **Psychological Profiling**: Creates detailed profiles of each participant's communication style
5. **Strategic Advice**: Provides Harvey Specter-style advice on missed opportunities and power moves
6. **Socratic Questioning**: Suggests powerful questions to move the prospect forward

## API Integration

The `api.js` file provides functions for interacting with the Supabase database:

- `createConversation`: Creates a new conversation record
- `updateConversationStatus`: Updates a conversation's status
- `storeBehavioralAnalysis`: Stores analysis results
- `storeParticipant`: Stores participant information
- `getConversationWithAnalysis`: Retrieves a conversation with its analysis and participants
- `getUserConversations`: Gets all conversations for the current user

## Development

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Build for production:
   ```
   npm run build
   ```
