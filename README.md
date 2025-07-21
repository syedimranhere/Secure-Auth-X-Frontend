# 🔐 SecureAuthX – React Frontend for Secure Authentication

SecureAuthX is a modern authentication frontend built with **React**, designed for secure, scalable user login, access control, and session management. Perfect for startups or enterprise-grade platforms that demand strong security and clean UX.

---

 Features

- 🔒 JWT-based Auth (Access + Refresh tokens)
- 👤 Login with Email/Username
-  Protected Routes & Role-Based Access
- ⚠ Auto Session Expiry + Re-auth Prompt
-  Axios Interceptors for Token Refresh
-  Clean State Management with React Context
-  REST API Ready
- ⚙ Built with Vite for Lightning Fast Dev Experience

---

  Tech Stack

| Tech       | Usage                  |
|------------|------------------------|
| React      | Frontend Library       |
| Vite       | Build Tool             |
| Axios      | API Communication      |
| React Router | Routing & Protection |
| Lucide-React | Icons                |
| Tailwind CSS | UI Styling           |

---

 Working

1. **User Login**: With email or username.
2. **Token Storage**: Access token in HTTP-only secure cookie.
3. **Route Protection**: Auto-redirect unauthorized users.
4. **Auto Refresh**: Axios interceptors keep tokens fresh.
5. **Logout**: Clears context + cookies, redirects safely.

---

## 🛠 Getting Started
Check package.json so that the proceess is smoother
```bash
git clone https://github.com/yourusername/secureauthx-frontend.git
cd secureauthx-frontend
npm install
npm run dev
