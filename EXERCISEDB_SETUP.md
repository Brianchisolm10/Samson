# ExerciseDB API Integration Setup

## Overview
The Exercise Library Manager now integrates with ExerciseDB API, which provides 11,000+ exercises with comprehensive data including target muscles, equipment, instructions, tips, and variations.

## Setup Instructions

### 1. Get RapidAPI Key
1. Go to https://rapidapi.com/
2. Sign up for a free account (if you don't have one)
3. Search for "ExerciseDB" in the API marketplace
4. Subscribe to the free plan
5. Copy your API key from the dashboard

### 2. Add API Key to Environment
Create a `.env` file in the `fitness-platform` directory:

```
REACT_APP_EXERCISEDB_API_KEY=your_rapidapi_key_here
```

### 3. Update ExerciseLibraryManager.js
Replace `'YOUR_RAPIDAPI_KEY'` in the fetch headers with:
```javascript
process.env.REACT_APP_EXERCISEDB_API_KEY
```

### 4. Restart Development Server
After adding the environment variable, restart your development server for changes to take effect.

## API Endpoints

**Get All Exercises:**
```
GET https://exercisedb.p.rapidapi.com/exercises?limit=11000
```

**Response Format:**
```json
{
  "id": "exercise_id",
  "name": "Exercise Name",
  "bodyPart": "chest",
  "target": "pectorals",
  "equipment": "barbell",
  "gifUrl": "https://...",
  "instructions": ["Step 1", "Step 2"],
  "exerciseTips": ["Tip 1", "Tip 2"]
}
```

## Fallback Behavior
If the ExerciseDB API fails or is unavailable, the system automatically falls back to the local `db.json` database.

## Rate Limits
- Free plan: 100 requests per day
- For production use, consider upgrading to a paid plan

## Troubleshooting

**"API key not found" error:**
- Ensure `.env` file is created in the correct directory
- Restart the development server after adding the key
- Check that the key is correctly copied from RapidAPI

**"Too many requests" error:**
- You've exceeded the free plan rate limit
- Wait 24 hours or upgrade your RapidAPI plan

**Exercises not loading:**
- Check browser console for error messages
- Verify API key is valid
- Ensure you're subscribed to ExerciseDB on RapidAPI
