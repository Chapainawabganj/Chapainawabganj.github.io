# PUST EEE Alumni Association - Full-Stack Web Platform

A production-ready, full-stack alumni web platform replicating and enhancing [https://pusteeealumni.org/](https://pusteeealumni.org/) (Pabna University of Science & Technology - Electrical & Electronic Engineering Alumni Association).

Built with **Node.js**, **Express**, **EJS**, **Bootstrap 4**, **DataTables**, and a cross-platform database store with zero external native compilation requirements. Runs seamlessly on Windows, Linux, and macOS, and is ready for one-click deployment to GitHub and cloud providers (Render, Railway, Fly.io, Vercel, VPS).

---

## 🌟 Key Features

### 1. 🌐 Public Pages (1:1 Exact Design & Assets)
- **Home (`/` or `/home.aspx`)**: Hero banner, Welcome Section, 3 Primary Features (Foster Networking, Support Professional Development, Give Back & Enhance Engagement), and 3-Step Process (Apply for Membership, Search Member, Visit Us) with genuine PUST campus photography.
- **About (`/about.aspx`)**: Comprehensive history, mission, networking benefits, alumni directory overview, and community goals.
- **Alumni Directory (`/alumnilist.aspx`)**: Searchable and filterable table of registered graduates with live DataTables search, batch filtering, roll numbers, blood groups, organizations, and quick profile modal previews.
- **Downloads (`/download.aspx`)**: Downloadable official PDF and images (Approved Convener Committee document, instructions, committee photo).
- **Notice Board (`/notice.aspx`)**: Official notice board with document attachments and instructions.
- **Contact (`/contact.aspx`)**: Batch representatives' direct phone numbers and emails (1st Batch, 2nd Batch, 6th Batch).

### 2. 📝 Membership Registration (`/registration.aspx`)
- Comprehensive application form covering:
  - **Personal Details**: Full Name, Gender, Blood Group, Email, Contact Phone, Facebook, LinkedIn.
  - **Academic Details**: Roll No, Batch No, Degree, Department, Residential Hall, Passing Year, Grade/CGPA, Certificate Serial No.
  - **Professional & Address**: Organization, Designation, Office Address, Permanent District/Address, Present District/Address.
  - **Documents & Verification**: Profile Photo (with live JavaScript preview), Degree Certificate scan, Payment Method (Online Payment / Bank Receipt), and Payment Slip upload.
  - **Account Security**: Password selection and agreement to terms.

### 3. 👤 Member User Panel (`/my_profile.aspx`)
- **Member Dashboard**: Profile summary, membership status (`Active` / `Pending`), Membership ID (e.g. `MEM-090201`), Batch, Roll.
- **Digital Alumni ID Card**: Formatted digital alumni membership card with official PUST crest, photo, blood group, roll, batch, and print/save capability (`window.print()`).
- **Profile Management**: Update contact information, employment details, address, and profile photo.
- **Uploaded Documents**: View submitted certificate and payment documents.
- **Security**: Self-service password change.

### 4. 🛡️ Administration Panel (`/membermanagement.aspx`)
Full administrative access out of the box:
- **Member Management**:
  - Live statistics: Total Members, Active Members, Pending Applications, Notices & Downloads.
  - Interactive table of all members with search, pagination, and status badges.
  - Quick action buttons to **Approve/Activate** pending members or set active members to pending.
  - Direct links to inspect uploaded profile photos, degree certificates, and payment slips.
  - One-click deletion of member records.
- **Update Member Profile (`/admin_update_member.aspx`)**:
  - Search any graduate by **Roll No**.
  - Modify any field (personal, academic, professional, address, membership tier, active/pending status).
  - Admin password override/reset for members who forgot their credentials.
- **Notice & Download Manager (`/admin_content.aspx`)**:
  - Publish new notices with title and file attachments (PDF/images).
  - Upload downloadable resources and forms.
  - Delete expired or obsolete notices/downloads.

---

## 🚀 Quick Start (Running Locally)

### Prerequisites
- [Node.js](https://nodejs.org/) (v16, v18, v20, v22, or v26)
- npm (comes with Node.js)

### Installation & Run

1. Open a terminal in this project folder:
   ```bash
   cd "d:\Emran\pust.chapai website"
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm start
   ```

4. Open your web browser:
   - **Website & Home Page**: [http://localhost:3000](http://localhost:3000)
   - **Member Login**: [http://localhost:3000/login.aspx](http://localhost:3000/login.aspx)
   - **Admin Portal**: [http://localhost:3000/adminlogin.aspx](http://localhost:3000/adminlogin.aspx)

---

## 🔑 Login Credentials

### 🛡️ Full Administration Access
- **URL**: [http://localhost:3000/adminlogin.aspx](http://localhost:3000/adminlogin.aspx)
- **Username**: `admin`
- **Password**: `admin123` *(also accepts `admin`)*

### 👤 Demo Alumni Account
- **URL**: [http://localhost:3000/login.aspx](http://localhost:3000/login.aspx)
- **Email / Roll**: `amirul.090201@s.pust.ac.bd` *(or roll: `090201`)*
- **Password**: `password123`

---

## 📁 Project Structure

```
pust.chapai website/
├── data/
│   ├── db.js              # Database access layer and query functions
│   └── db.json            # JSON database with seeded members, notices, and downloads
├── public/
│   ├── CSS/
│   │   └── customstylesheet.css  # Original PUST EEE color scheme (#762b00, #531f00)
│   ├── DownloadDoc/       # Official downloadable PDFs and pictures
│   ├── NoticeDoc/         # Official notice documents
│   ├── Photo/             # Campus banners, logos, crests, and gallery pictures
│   ├── ProfilePhoto/      # Seed member profile pictures
│   ├── CertPhoto/         # Certificate storage
│   ├── PaymentPhoto/      # Payment slip storage
│   └── uploads/           # User & Admin dynamic file uploads
├── views/
│   ├── partials/
│   │   ├── header.ejs     # Responsive navbar with user/admin session states
│   │   └── footer.ejs     # Footer with brown bands and admin login link
│   ├── index.ejs          # Home page
│   ├── about.ejs          # About page
│   ├── registration.ejs   # Apply for membership
│   ├── alumnilist.ejs     # Searchable directory with DataTables
│   ├── download.ejs       # Downloads page
│   ├── notice.ejs         # Notice board
│   ├── contact.ejs        # Contact information
│   ├── login.ejs          # Member login
│   ├── adminlogin.ejs     # Admin login
│   ├── my_profile.ejs     # User Panel & Digital Alumni ID Card
│   ├── membermanagement.ejs     # Admin Member Management
│   ├── admin_update_member.ejs  # Admin Member Profile Editor
│   └── admin_content.ejs        # Admin Notice & Download Manager
├── server.js              # Express server and application routes
├── package.json           # Dependencies and scripts
└── README.md              # Documentation
```

---

## 📤 Deploying to a GitHub Repository

When you are ready to publish this project to GitHub, run the following commands in your project directory:

```bash
# 1. Initialize Git repository
git init

# 2. Add all files
git add .

# 3. Create your first commit
git commit -m "Initial commit - PUST EEE Alumni full-stack website with Admin & User panels"

# 4. Set main branch
git branch -M main

# 5. Link your GitHub remote repository (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git

# 6. Push to GitHub
git push -u origin main
```

---

## 📄 License
This project is open-source and free to customize for university alumni associations.
