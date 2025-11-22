# Scholarship Application Portal - Setup Guide

₹51,00,000 Scholarship Program with Razorpay Payment & Google Sheets Storage

## 🚀 Quick Setup

### 1. Razorpay Integration

1. Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Get your **Test/Live API Key ID**
3. Open `src/pages/Index.tsx`
4. Replace `rzp_test_YOUR_KEY_HERE` with your actual Razorpay Key ID (line 73)

### 2. Google Sheets Integration

#### Step 1: Create Google Sheet
Create a new Google Sheet with these column headers:
```
Application Number | Full Name | Father Name | Email | Phone | Class | Previous Result Marks | Exam Language | Payment ID | Submission Time | Roll Number | Exam Centre
```

#### Step 2: Create Apps Script
1. In your Google Sheet: **Extensions > Apps Script**
2. Delete existing code and paste:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.applicationNumber,
      data.fullName,
      data.fatherName,
      data.email,
      data.phone,
      data.class,
      data.previousResult,
      data.examLanguage,
      data.paymentId,
      data.submissionTime,
      data.rollNumber || "Pending",
      data.examCentre || "Will be announced soon"
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success"
    })).setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. **Deploy > New deployment > Web app**
4. Execute as: **Me**
5. Who has access: **Anyone**
6. Click **Deploy** and copy the Web App URL

#### Step 3: Connect to App
1. Open `src/pages/Index.tsx`
2. Find `YOUR_GOOGLE_APPS_SCRIPT_URL` (line 96)
3. Replace with your Web App URL

## ✅ Features

- Application form with validation
- Conditional previous class result field
- Razorpay payment gateway (₹299)
- Unique application number (SCH-YYYY-XXXXXX)
- Google Sheets storage
- Application tracking
- Success confirmation
- Government-style UI
- Mobile responsive

## 🧪 Testing

**Razorpay Test Cards:**
- Card: 4111 1111 1111 1111
- CVV: Any 3 digits
- Expiry: Any future date

## 📦 Deployment

```bash
npm run build
```

**Before going live:**
1. Replace test Razorpay key with **Live Key**
2. Verify Google Apps Script permissions
3. Test end-to-end payment flow

---

## Original Project Info

**URL**: https://lovable.dev/projects/bd22be5e-9a95-4208-838d-7fbd41ca5950

## How can I edit this code?

**Use Lovable**: Visit [Lovable Project](https://lovable.dev/projects/bd22be5e-9a95-4208-838d-7fbd41ca5950)

**Use your IDE**: Clone, install dependencies, and run:
```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm i
npm run dev
```

## Technologies Used

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Razorpay
- Google Sheets API

---

Built with ❤️ for scholarship management
