# Motivato Environment Variables

This document describes the environment variables required for the Everythin.ir application.

## Authentication Variables

- `AUTH_SECRET`: Secret key used by Auth.js for encryption and session management
- `AUTH_DISCORD_ID`: Discord OAuth application ID for authentication
- `AUTH_DISCORD_SECRET`: Discord OAuth secret for authentication
- `AUTH_GOOGLE_ID`: Google OAuth client ID for authentication
- `AUTH_GOOGLE_SECRET`: Google OAuth client secret for authentication

## API Keys

- `OPENAI_API_KEY`: OpenAI API key for AI functionality
- `CRON_API_KEY`: API key for scheduled tasks and cron jobs

## Web Push Notification Variables

- `NEXT_PUBLIC_VAPID_PUBLIC_KEY`: Public VAPID key for web push notifications
- `VAPID_PRIVATE_KEY`: Private VAPID key for web push notifications
- `VAPID_EMAIL`: Contact email for VAPID web push notifications

## Database Configuration

- `SUPABASE_PASSWORD`: Password for Supabase database access
- `DATABASE_URL`: Connection string for PostgreSQL database via connection pooling
- `DIRECT_URL`: Direct connection string to PostgreSQL database (used for migrations)
