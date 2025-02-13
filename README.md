# 🌟 KiteAI Bot - AI Powered Automation 🤖

🚀 **A Node.js bot designed for interacting with the KiteAI testnet platform, featuring an elegant terminal interface and automated AI-powered interactions.**

---

## ✨ Features  

👉 **Supports multiple wallets** 💰  
👉 **Automated AI interactions** (Professor, Crypto Buddy, Sherlock) 🧠  
👉 **Real-time analytics & progress tracking** 📊  
👉 **Built-in rate limiting & error handling** ⚡  
👉 **Groq AI integration** for smart question generation 🔍  

---

## 📌 Prerequisites  

Before installing, ensure you have the following:  

| Requirement  | Description |
|-------------|------------|
| 🔹 **Node.js v16+** | [Download Here](https://nodejs.org/) 🖥️ |
| 🔹 **KiteAI Testnet Account** | [Sign Up](https://testnet.gokite.ai?r=R7H32kqJ) 🔗 |
| 🔹 **Groq API Key** | [Get it Here](https://console.groq.com) 🔑 |

---

## 🛠️ Installation Guide  

### **🔹 For Linux/macOS Users 🐧🍏**  

#### 1️⃣ Clone the repository:  
   ```bash
   git clone https://github.com/rpchubs/KiteAI-BOT.git
   ```

#### 2️⃣ Navigate to the project folder:  
   ```bash
   cd KiteAI-BOT
   ```

#### 3️⃣ Install dependencies:  
   ```bash
   npm install
   ```

#### 4️⃣ Create required configuration files:  
   - **Wallets addresses file:**  
     ```bash
     nano wallets.txt
     ```
   - **Private keys file:**  
     ```bash
     nano priv.txt
     ```
   - **Proxy file:**  
     ```bash
     nano proxies.txt
     ```
     **Format:** `http://user:pass@host:port`     
   - **Create configuration file:**  
     ```bash
     nano config.js
     ```

### **🔹 For Windows Users 🏁**  

#### 1️⃣ Clone the repository:  
- Use Git Bash or **download the ZIP** from the repository page.  

#### 2️⃣ Extract the ZIP file (if downloaded).  

#### 3️⃣ Navigate to the extracted folder and install dependencies:  
- Open **File Explorer**, navigate to `KiteAI-BOT`, and open **Command Prompt** inside the folder.  
- Run:  
  ```powershell
  npm install
  ```

#### 4️⃣ Create required configuration files using relevant software:  

- **Wallet addresses:**  
  - Open **Notepad** and create a new file named `wallets.txt`  
  - Add wallet addresses (one per line) and save the file.  

- **Private keys:**  
  - Open **Notepad** and create `priv.txt`  
  - Add private keys (one per line) and save the file.  

- **Proxy settings (optional):**  
  - Open **Notepad**, create `proxies.txt`, and add proxies in the format:  
    ```
    http://user:pass@host:port
    ```

- **Configuration settings:**  
  - Open **VS Code** or **Notepad++**, create `config.js`, and configure settings.

## ⚙️ Configuration Guide  

### 📂 **Wallet Addresses 💰:**  
- Open `wallets.txt` and add one wallet address per line:  
  ```
  0xwallet1address
  0xwallet2address
  ```

### 🔐 **Private Key 🔑:**  
- Open `priv.txt` and add one private key per line **(Keep it safe!)**  
  ```
  privatekey1
  privatekey2
  ```

### 🔑 **API Key and Referral Code Setup:**  
1️⃣ Open `config.js` in a text editor.  
2️⃣ Locate the following section and update your API key:  
   ```javascript
   export const groqConfig = {
       apiKey: "your-groq-api-key-here",
       model: "mixtral-8x7b-32768",
       temperature: 0.7,
   };
   ```
3️⃣ Locate the referral code section and update it:  
   ```javascript
   export const refCode = {
       code: "your-referral-code-here"
   };
   ```
4️⃣ **Save the file.**  

---

## ▶️ Usage Guide 🚀  

### 📝 **To Register (First-time Users Only) 📜**  

🔹 **Ensure that `priv.txt` contains your private key before running `register.js`.**  

#### **Linux/macOS:**  
```bash
node register.js
```

#### **Windows:**  
1️⃣ Open **Command Prompt** inside the `KiteAI-BOT` folder.  
2️⃣ Run:  
   ```powershell
   node register.js
   ```

### 🚀 **To Start the Bot 🤖**  

🔹 **Ensure `wallets.txt` is set up correctly.**  
🔹 **Wallets must be registered and signed before use.**  

#### **Linux/macOS:**  
```bash
node main.js
```

#### **Windows:**  
1️⃣ Open **Command Prompt** inside the `KiteAI-BOT` folder.  
2️⃣ Run:  
   ```powershell
   node main.js
   ```

---

## 🎯 Dashboard Overview 📊  

| Section | Description |
|---------|------------|
| 📌 **Banner** | Displays project info & links |
| 🤖 **AI Interactions** | Real-time AI conversation logs |
| 📟 **Status** | Wallet, cycle progress, and session time |
| 📈 **Analytics** | Success rates, API requests, and errors |
| ⏳ **Progress Bar** | Visual progress for ongoing tasks |

---

## 🛠️ Troubleshooting 🛑  

| ❌ Issue | ✅ Solution |
|------------------|-------------------------------------------|
| `Command not found` | Ensure Node.js is installed & in PATH |
| `Error: API Key Missing` | Update `config.js` with a valid API key |
| `Permission Denied` | Run `chmod +x` on scripts if needed (Linux/macOS) |

---

## 🤝 Contributing 💡  

1️⃣ **Fork the repo**  
2️⃣ **Create a feature branch**  
3️⃣ **Commit your changes**  
4️⃣ **Push to branch**  
5️⃣ **Open a Pull Request** 🎉  

---

## 🔗 Useful Links 🌍  

- [Github Repository](https://github.com/rpchubs)  
- [KiteAI Testnet](https://testnet.gokite.ai?r=R7H32kqJ)  
- [Groq Console](https://console.groq.com)  

---

🚀 **Happy Botting!** 🎯