# Announcement Management - Security & Permissions Documentation

## Overview
This document outlines all security measures and permissions implemented for the announcement management system in the CHIEF G MEDIA admin panel.

---

## 1. Firestore Security Rules

### Location
Apply these rules in Firebase Console:
- Go to **Firestore Database** → **Rules**
- Replace the default rules with the content in `FIRESTORE_RULES.txt`
- Click **Publish**

### Key Rules

#### Announcements Collection
```
- READ: Public access (anyone can read for carousel display)
- CREATE: Only authenticated users
- UPDATE: Only authenticated users
- DELETE: Only authenticated users

Validation:
- Title: Required, string, 1-100 characters
- Image: Required, valid URL string
- Timestamps: createdAt and updatedAt required
```

#### Updates Collection
```
Similar structure to announcements
Additional validation:
- Description: Required, non-empty string
```

#### Admins Collection
```
- READ: Only the user's own admin document
- CREATE: Only authenticated users for their own UID
- UPDATE: Only the user can update their own document
- DELETE: Blocked (admin users managed by super-admin)
```

---

## 2. Client-Side Validation

### announcementService.js

#### Authentication Validation
```javascript
validateUserAuthenticated()
- Checks if user is logged in via Firebase Auth
- Throws: "You must be logged in to perform this action"
```

#### Image File Validation
```javascript
validateImageFile(file)
- Maximum size: 5MB
- Allowed types: JPG, PNG, GIF, WebP
- Error messages include file size details
```

#### Announcement Data Validation
```javascript
validateAnnouncementData(announcement)
- Title: Required, 1-100 characters, string type
- Image: Required, valid URL string
```

#### Error Handling
```javascript
handleFirebaseError(error)
- Maps Firebase error codes to user-friendly messages
- Handles permission-denied, unauthenticated, network errors
- Provides actionable error messages
```

#### Upload Retry Logic
```javascript
uploadImageToImgbb(file, retries = 3)
- Retries failed uploads up to 3 times
- Handles rate limiting (429 errors) with exponential backoff
- Validates file before upload
- Returns image URL for storage in Firestore
```

---

## 3. Component-Level Validation

### AnnouncementForm.js

#### Pre-Submit Validation
- Title is not empty and ≤ 100 characters
- Image file is selected
- Button is disabled until both fields are valid

#### File Selection Validation
- File type checked before preview (prevents invalid files in preview)
- File size validated with user-friendly error message
- Image preview only shown for valid files

#### Feedback
- Real-time character counter (0-100)
- File size display (in KB)
- Upload progress indicator (0-100%)
- Success/error messages with auto-clear (4 seconds)

### AnnouncementsList.js

#### Delete Confirmation
- Shows announcement title in confirmation dialog
- Requires explicit user confirmation before deletion

#### Error Handling
- Separate error states for fetch and delete operations
- Error messages auto-clear after 3 seconds
- Graceful handling of image load failures (placeholder shown)

#### Date Formatting
- Safely handles Firestore timestamps
- Fallback for invalid or missing dates
- User-friendly date/time format

---

## 4. Firestore Permissions Flow

### Create Announcement
```
1. User clicks "Create Announcement" button
2. Frontend validates: auth, title, image file
3. Image uploaded to imgbb (with retries if needed)
4. Firestore create triggered:
   - Server validates: auth, title format, image URL
   - Creates document with:
     * title, image, createdBy (user ID), timestamps
   - Returns document ID on success
5. UI refreshes announcement list
```

### Read Announcements
```
1. AnnouncementsList component loads
2. getAnnouncements() called
3. Firestore query: READ all announcements (public allowed)
4. Ordered by createdAt (newest first)
5. Announcements rendered in grid
```

### Delete Announcement
```
1. User confirms deletion with announcement title shown
2. Frontend validates: auth, valid announcement ID
3. Firestore delete triggered:
   - Server validates: user is authenticated
   - Deletes document if user has permission
4. UI removes announcement from list
5. Success/error feedback to user
```

---

## 5. Security Best Practices

### What is Protected
✅ Anonymous users cannot modify announcements
✅ Only authenticated users can create/edit/delete
✅ File uploads validated for type and size
✅ Image hosting delegated to imgbb (no server-side storage)
✅ Firestore enforces data structure via security rules
✅ User ID tracked (createdBy field) for audit trail

### What is Public
✅ Announcements can be read by anyone (for carousel)
✅ Updates can be read by anyone (for updates section)
✅ Images stored on imgbb CDN (fast access)

### Rate Limiting
✅ imgbb upload retries with exponential backoff
✅ Firebase enforces per-user write limits
✅ No client-side request throttling needed (Firestore handles)

### Error Messages
✅ Never reveal internal system details
✅ User-friendly error messages provided
✅ Console logs for debugging (not visible to users)
✅ Sensitive errors handled gracefully

---

## 6. To Enable Super-Admin Features (Optional)

For a production system with role-based access:

### Step 1: Set Custom Claims in Firebase
```bash
# Use Firebase Admin SDK (Node.js)
admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => console.log('Custom claims set'));
```

### Step 2: Update Firestore Rules
Replace the `isAdmin()` function in FIRESTORE_RULES.txt:
```
function isAdmin() {
  return request.auth.token.admin == true;
}
```

### Step 3: Restrict Operations
Change rules from `isAuthenticated()` to `isAdmin()`:
```
allow create: if isAdmin();
allow update: if isAdmin();
allow delete: if isAdmin();
```

---

## 7. Testing the Security

### Test Case 1: Unauthenticated Access
- Open app without logging in
- Try to access /admin/announcements → Redirected to login ✓

### Test Case 2: Invalid File Upload
- Try uploading file >5MB → Error message shown ✓
- Try uploading non-image file → Error message shown ✓

### Test Case 3: Create Announcement
- Log in as admin
- Fill form with valid data
- Submit → Success message, announcement appears in list ✓

### Test Case 4: Delete Announcement
- Click delete on any announcement
- Confirm in dialog
- Announcement removed from list ✓

### Test Case 5: Network Error Handling
- Turn off WiFi, try creating announcement
- Error message shown, form remains intact ✓
- Re-enable WiFi, try again → Works ✓

---

## 8. Error Messages Reference

| Error | Cause | Solution |
|-------|-------|----------|
| "You must be logged in..." | User not authenticated | Log in to admin panel |
| "Title is required..." | Empty title field | Enter announcement title |
| "Title must be 100 characters..." | Title too long | Shorten title (current: X/100) |
| "Image size must be less than 5MB..." | File too large | Choose smaller image |
| "Invalid image type..." | Wrong file format | Use JPG, PNG, GIF, or WebP |
| "Failed to upload image..." | imgbb API error | Check internet, try again |
| "Permission denied..." | User not authorized | Contact admin |
| "Service temporarily unavailable..." | Firebase down | Try again later |

---

## 9. Summary of Implemented Permissions

✅ Authentication validation (required login)
✅ File type validation (JPG, PNG, GIF, WebP only)
✅ File size validation (max 5MB)
✅ Data format validation (title 1-100 chars, valid URLs)
✅ Firestore security rules (READ public, WRITE authenticated only)
✅ Error handling with user-friendly messages
✅ Image upload retry logic with exponential backoff
✅ Delete confirmation dialog
✅ Audit trail (createdBy, createdAt, updatedBy, updatedAt fields)
✅ Network error resilience
✅ Rate limiting support (Firebase + imgbb)

---

## 10. Next Steps

1. **Deploy Firestore Rules**: Copy rules from FIRESTORE_RULES.txt to Firebase Console
2. **Test Permissions**: Follow test cases in Section 7
3. **Monitor Errors**: Check browser console and Firebase logs for issues
4. **Set Up Admin Users**: Add authenticated users to /admins collection
5. **Enable Custom Claims** (optional): For role-based access control
