Terima kasih! Berikut ini adalah versi `README.md` yang sudah **disesuaikan untuk proyek LMS kamu yang menggunakan `shadcn/ui`**:

---

````md
# 📚 LMS App (Learning Management System)

A modern, full-stack LMS (Learning Management System) built with **Next.js App Router**, **Prisma**, **PostgreSQL**, and styled using **shadcn/ui**. The app features authentication with GitHub, file uploads to AWS S3, email sending with Resend, and secure session management via Better Auth.

---

## 🚀 Features

- ✅ **User authentication** with GitHub OAuth
- 🔐 Custom session handling using **Better Auth**
- 🧩 **Modular UI components** via `shadcn/ui`
- ☁️ **File uploads** with AWS S3
- 📬 **Email notifications** with Resend
- 🛡️ **Arcjet** protection for bot/rate limiting
- 🗃️ Database ORM with **Prisma** and **Neon DB**

---

## 🛠️ Tech Stack

- **Next.js 14+** (App Router)
- **shadcn/ui** (Tailwind + Radix UI)
- **Prisma ORM**
- **PostgreSQL** (Neon.tech)
- **GitHub OAuth** (Login)
- **Better Auth** (Session/Auth handler)
- **AWS S3** (for media/file storage)
- **Resend** (for emails)
- **Arcjet** (security layer)

---

## 🧪 Local Development

### 1. Install dependencies

```bash
pnpm install
```
````

### 2. Setup database and Prisma

```bash
pnpm prisma generate
pnpm prisma migrate dev
```

### 3. Start the dev server

```bash
pnpm dev
```

Then visit: [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Environment Variables

Copy `.env.example` ke `.env.local`, lalu sesuaikan nilainya:

```bash
cp .env.example .env.local
```

### Contoh `.env.local`

```env
# PostgreSQL database (Neon)
DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE?sslmode=require&channel_binding=require"

# Better Auth
BETTER_AUTH_SECRET=your_super_secret
BETTER_AUTH_URL=http://localhost:3000

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_SECRET_CLIENT=your_github_secret

# Resend API
RESENT_API_KEY=your_resend_api_key

# Arcjet (optional security layer)
ARCJET_KEY=your_arcjet_key

# AWS S3 configuration
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_ENDPOINT_URL_S3=https://s3.your-provider.com
AWS_ENDPOINT_URL_IAM=https://iam.your-provider.com
AWS_REGION=your_region

# Public S3 Bucket Name
NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES=your_bucket_name
```

> ⚠️ **Jangan pernah commit `.env.local` ke Git.** File ini berisi kredensial penting.

---

## 🎨 UI Components with shadcn/ui

Komponen UI pada aplikasi ini dibangun menggunakan [shadcn/ui](https://ui.shadcn.com), kombinasi Tailwind CSS + Radix UI dengan pendekatan komponen modular:

- Modal, Dialog, Dropdown, Tabs
- Button, Card, Input, Avatar, dll
- Dikustomisasi lewat `tailwind.config.js` dan `components.json`

Untuk menambahkan komponen baru:

```bash
npx shadcn-ui@latest add <component>
```

Contoh:

```bash
npx shadcn-ui@latest add dialog
```

---

## 📁 Project Structure

```
app/
 ├─ (auth)/           # Auth routes
 ├─ dashboard/        # Protected routes
 ├─ api/              # API routes
 └─ components/       # UI components (shadcn/ui)
prisma/
 └─ schema.prisma     # Database schema
lib/                  # Utils, middlewares, db client
```

---

## ✅ License

MIT License © 2025

---
