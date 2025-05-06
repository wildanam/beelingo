# 🚀 Overview
This bot: <br>
✅ Receives files (PDF, DOCX) via WhatsApp <br>
✅ Sends the file to DeepL for translation <br>
✅ Replies back to the sender on WhatsApp <br>

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
✅ Send a PDF or DOCX file to the WhatsApp sandbox number. <br>
✅ The bot will process the document and send a confirmation message when done. <br>
⚠ Note: Currently, the bot only sends a text confirmation. Sending back the translated file as an attachment requires an additional storage setup (e.g., S3 or ImageKit).