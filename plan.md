# Technical Manifest for AfriTranslate App

## 1. Project Overview

AfriTranslate is a mobile-first web application designed to provide real-time video translation for African languages as a priority. It aims to offer a seamless and culturally relevant subtitle experience for users engaging with video content on platforms like TikTok, YouTube, Instagram, and Facebook.

## 2. Core Features

*   **Real-time Subtitling**: Listen to video audio, detect language, translate, and display subtitles in real-time (updating every 2-3 seconds).
*   **Multi-Platform Support**: Works with videos from TikTok, YouTube, Instagram, Facebook.
*   **Language Support**:
    *   **African Languages (Priority)**: Twi, Yoruba, Hausa, Igbo, Zulu, Swahili, Amharic, Wolof.
    *   **Global Languages**: English, French, Spanish, Turkish, Korean, Arabic.
*   **User Interface**:
    *   **Home/Onboarding**: Simple, one-tap language selection.
    *   **Active Translation View**: Floating, movable, and hideable subtitle bar.
    *   **Settings**: Language selection, font size, subtitle opacity control.
    *   **Upgrade Page**: Free tier (30 min/day), Pro tier ($4/month).
*   **Design**: Dark theme, gold and green accents, African cultural aesthetic, clean, bold, fast, mobile-first, responsive.

## 3. Technology Stack & Integrations

*   **Frontend**: (Framework to be decided by Frontend Engineer, e.g., React, Vue, Svelte) - Mobile-first responsive design.
*   **Audio-to-Text (ASR)**: OpenAI Whisper API.
*   **Translation**: DeepL API or Google Translate API.
*   **Backend & Database**: Firebase (for User Authentication, Real-time Database/Firestore for usage tracking). Note: The available `supabase_engineer` agent is noted, but the requirement specifies Firebase. Backend setup will be handled accordingly.
*   **Payments**: Stripe API for Pro subscription management.

## 4. Schema Design (Firebase Firestore/Realtime DB)

*   **`users` collection/table**:
    *   `userId` (string, primary key)
    *   `email` (string)
    *   `createdAt` (timestamp)
    *   `preferredLanguage` (string, e.g., 'en', 'twi')
    *   `fontSize` (integer, default 16)
    *   `subtitleOpacity` (float, default 0.8)
    *   `subscriptionTier` (string, e.g., 'free', 'pro')
    *   `subscriptionEndDate` (timestamp, nullable)
    *   `dailyUsageMinutes` (integer, reset daily)

*   **`videos` collection/table** (Potentially for metadata or if saving history, TBD by backend logic):
    *   `videoId` (string, primary key)
    *   `platform` (string)
    *   `url` (string)
    *   `processedAt` (timestamp)

## 5. Agent Assignments & Workflow

1.  **Architect (Current Agent)**:
    *   Initiate project planning and task orchestration.
    *   Call `create_plan` to establish this manifest.
    *   Orchestrate subsequent agent actions.

2.  **Frontend Engineer**:
    *   Responsible for all client-side development.
    *   Implement UI/UX for all core screens based on design requirements.
    *   Set up the project structure and initial boilerplate.
    *   Integrate frontend components with backend services and APIs (Whisper, Translation, Firebase Auth, Stripe).
    *   Ensure mobile-first and responsive design principles are followed.
    *   **Crucially**: Must run `generate_images_bulk` FIRST before writing any files.
    *   Develop the floating subtitle bar functionality.

3.  **Supabase Engineer**: (Note: User specified Firebase. This agent will be leveraged for backend tasks if Firebase setup involves Supabase-compatible operations or if Supabase is a viable alternative for backend/DB needs.)
    *   Responsible for setting up backend services, including Firebase project configuration:
        *   User Authentication.
        *   Database (Firestore/Realtime DB) for `users` collection (storing preferences, subscription status, usage data).
        *   Potentially Cloud Functions/Edge Functions if complex backend logic is needed beyond direct API calls (e.g., server-side usage aggregation, webhook handling for Stripe).
    *   Integrate Stripe Webhooks for subscription status updates.
    *   Ensure secure data handling and access control.

## 6. Development Phases

*   **Phase 1: Setup & Planning**
    *   Call `create_plan` to create this manifest.
    *   Frontend Engineer sets up the project environment.
*   **Phase 2: Core UI Development (Frontend Engineer)**
    *   Implement Home/Onboarding, Settings, Upgrade Page UIs.
    *   Implement the core structure for the Active Translation View.
    *   Design assets generation (`generate_images_bulk`).
*   **Phase 3: Backend Integration (Supabase Engineer & Frontend Engineer)**
    *   Set up Firebase Authentication.
    *   Implement user data storage and retrieval (preferences, usage).
    *   Integrate Stripe for payments.
    *   Frontend Engineer integrates these backend services into the UI.
*   **Phase 4: API Integrations (Frontend Engineer)**
    *   Integrate OpenAI Whisper API for ASR.
    *   Integrate Translation API.
    *   Implement real-time subtitle display logic.
*   **Phase 5: Refinement & Testing**
    *   Implement language detection logic.
    *   Refine UI/UX based on mobile-first principles.
    *   Thorough testing across different devices and browsers.
    *   Implement usage tracking and limits.
*   **Phase 6: Deployment & Validation**
    *   Deploy the application.
    *   Call `validate_build` to confirm functionality.

## 7. Next Steps

The `frontend_engineer` agent will be dispatched to begin Phase 2 after this plan is created.
