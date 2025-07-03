# Auto Photo Enhancer Webapp

This folder contains a simple landing page and API server for a micro SaaS that enhances vehicle images using an AI model.

## Features
- Supabase authentication for login / sign up
- Stripe (placeholder) for subscription management
- Upload up to five images for enhancement
- AI image enhancement via OpenAI (example integration)

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables by creating a `.env` file:
   ```bash
   SUPABASE_URL=your-supabase-project-url
   SUPABASE_SERVICE_ROLE_KEY=service-role-key
   OPENAI_API_KEY=your-openai-key
   PROMPT=brighten and enhance the vehicle photo for marketing
   ```
3. Run the server:
   ```bash
   npm start
   ```

The landing page will be available at `http://localhost:3000`.
