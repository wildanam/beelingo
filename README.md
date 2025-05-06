<div align="center">
  <br />
  <img src="./public/beelingo-banner.png" alt="project banner" style="width: 100%; background-size: cover;"  />
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="next.js" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="TypeScript" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/Twilio-F22F46?style=for-the-badge&logo=Twilio&logoColor=white" alt="twilio" />
  </div>

  BeeLingo is a WhatsApp bot that helps you translate documents (PDF, DOCX) across languages in just a few seconds. Like a busy bee, it works tirelessly to deliver smooth, accurate translations right to your chat. 🐝🌍
</div>

# 🚀 Overview
This bot: <br>
✅ Receives files (PDF, DOCX) via WhatsApp <br />
✅ Sends the file to DeepL for translation <br />
✅ Replies back to the sender on WhatsApp <br />

# ⚙ Setup
### 1️⃣ Clone the repository & install dependencies
```bash
git clone <repo-link>
cd whatsapp-translator-bot
npm install
```

### 2️⃣ Create ```.env```
Fill it with:
```bash
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_NUMBER=+14155238886
DEEPL_API_KEY=your_deepl_api_key
```

### 3️⃣ Run local development server
```bash
npm run dev
```

### 4️⃣ Expose local server using ngrok
```bash
ngrok http 3000
```
Get the public URL from ngrok, e.g., ```https://abc123.ngrok.io```.

### 5️⃣ Configure Twilio webhook
Go to Twilio Dashboard → WhatsApp Sandbox → Sandbox Configuration
Set:
```bash
WHEN A MESSAGE COMES IN → https://abc123.ngrok.io/api/webhook
```

### 6️⃣ Link your WhatsApp to the sandbox
Follow the instructions in the Twilio sandbox, send:
```bash
join <sandbox-code>
```
to the Twilio number.

# 🧪 Testing
✅ Send a PDF or DOCX file to the WhatsApp sandbox number. <br />
✅ The bot will process the document and send a confirmation message when done. <br />
⚠ Note: Currently, the bot only sends a text confirmation. Sending back the translated file as an attachment requires an additional storage setup (e.g., S3 or ImageKit).