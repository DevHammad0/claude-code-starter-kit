# NearMe: Development Stack & Architecture

**Project Overview:** A campus-focused, hyper-local marketplace restricted by university domain and a 4 km radius.

## Core Tech Stack

### **Frontend**
* **Framework:** **Next.js 16.1.6+** (App Router, Turbopack, React 19).
* **UI/UX:** **shadcn/ui** + **Magic UI** + **Tailwind CSS**.

### **Backend**
* **Language:** **Python 3.14.3** (Latest stable).
* **Framework:** **FastAPI** (Asynchronous API).
* **Package Manager:** **uv** (Dependency & Python version management).
* **Authentication:** **Better Auth** (Google & University email verification).
* **Database Toolkit:** **SQLAlchemy (Async)** + **Pydantic v2**.

### **Infrastructure (Supabase)**
* **Database:** **PostgreSQL** with **PostGIS** (4 km radius filtering).
* **Real-time:** **Supabase Realtime** (Buyer/Seller in-app chat).
* **Storage:** **Supabase Storage** (Item photos).

---

## Containerization & Workflow
* **uv sync:** Automatically manages the Python 3.14 environment.
* **Docker:** Multi-stage builds for the FastAPI and Better Auth services.
* **Hosting:** Vercel (Frontend) and Railway (Backend).