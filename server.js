const express = require('express');
const session = require('express-session');
const path = require('path');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const db = require('./data/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files configuration
app.use(express.static(path.join(__dirname, 'public')));
app.use('/Photo', express.static(path.join(__dirname, 'public/Photo')));
app.use('/DownloadDoc', express.static(path.join(__dirname, 'public/DownloadDoc')));
app.use('/NoticeDoc', express.static(path.join(__dirname, 'public/NoticeDoc')));
app.use('/ProfilePhoto', express.static(path.join(__dirname, 'public/ProfilePhoto')));
app.use('/CertPhoto', express.static(path.join(__dirname, 'public/CertPhoto')));
app.use('/PaymentPhoto', express.static(path.join(__dirname, 'public/PaymentPhoto')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use('/CSS', express.static(path.join(__dirname, 'public/CSS')));

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session setup
app.use(session({
  secret: 'pust-eee-alumni-secret-key-2026',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 } // 7 days
}));

// Global view variables (User/Admin session & flash messages)
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  res.locals.currentAdmin = req.session.admin || null;
  res.locals.success_msg = req.session.success_msg || null;
  res.locals.error_msg = req.session.error_msg || null;
  delete req.session.success_msg;
  delete req.session.error_msg;
  next();
});

// Multer storage for uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public/uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// Multi-field upload for registration
const registrationUpload = upload.fields([
  { name: 'profile_photo', maxCount: 1 },
  { name: 'cert_photo', maxCount: 1 },
  { name: 'payment_photo', maxCount: 1 }
]);

// Auth middleware
function requireUser(req, res, next) {
  if (req.session.user) {
    return next();
  }
  req.session.error_msg = 'Please log in to view your profile and member dashboard.';
  res.redirect('/login.aspx');
}

function requireAdmin(req, res, next) {
  if (req.session.admin) {
    return next();
  }
  req.session.error_msg = 'Administrative authentication required to access this area.';
  res.redirect('/adminlogin.aspx');
}

// ==========================================
// PUBLIC ROUTES (.aspx aliases supported)
// ==========================================

// Home Page
app.get(['/', '/home', '/home.aspx'], (req, res) => {
  res.render('index', { title: 'Home' });
});

// About Page
app.get(['/about', '/about.aspx'], (req, res) => {
  res.render('about', { title: 'About' });
});

// Alumni Directory
app.get(['/alumnilist', '/alumnilist.aspx'], (req, res) => {
  const query = (req.query.q || '').trim().toLowerCase();
  let members = db.getActiveMembers();

  if (query) {
    members = members.filter(m => {
      return (
        (m.full_name && m.full_name.toLowerCase().includes(query)) ||
        (m.roll_no && String(m.roll_no).toLowerCase().includes(query)) ||
        (m.batch_no && m.batch_no.toLowerCase().includes(query)) ||
        (m.blood_group && m.blood_group.toLowerCase().includes(query)) ||
        (m.organization && m.organization.toLowerCase().includes(query)) ||
        (m.degree && m.degree.toLowerCase().includes(query))
      );
    });
  }

  res.render('alumnilist', {
    title: 'Alumni List',
    members,
    query: req.query.q || ''
  });
});

// Downloads Page
app.get(['/download', '/download.aspx'], (req, res) => {
  const downloads = db.getDownloads();
  res.render('download', { title: 'Downloads', downloads });
});

// Notice Board
app.get(['/notice', '/notice.aspx'], (req, res) => {
  const notices = db.getNotices();
  res.render('notice', { title: 'Notice', notices });
});

// Contact Page
app.get(['/contact', '/contact.aspx'], (req, res) => {
  res.render('contact', { title: 'Contact Information' });
});

// Registration (Apply for Membership) - GET
app.get(['/registration', '/registration.aspx'], (req, res) => {
  res.render('registration', { title: 'Apply for Membership' });
});

// Registration (Apply for Membership) - POST
app.post(['/registration', '/registration.aspx'], registrationUpload, (req, res) => {
  try {
    const {
      full_name, gender, email, contact_number, blood_group,
      facebook, linkedin, roll_no, batch_no, degree, department,
      hall, passing_year, grade_cgpa, organization, designation,
      work_country, permanent_district, permanent_address,
      present_district, present_address, membership_type,
      membership_no, cert_serial_no, payment_method, password
    } = req.body;

    // Check duplicate roll or email
    if (db.getMemberByRoll(roll_no)) {
      req.session.error_msg = `A member with Roll No ${roll_no} has already registered.`;
      return res.redirect('/registration.aspx');
    }
    if (db.getMemberByEmail(email)) {
      req.session.error_msg = `A member with Email ${email} has already registered.`;
      return res.redirect('/registration.aspx');
    }

    const profile_photo = req.files && req.files.profile_photo ? 'uploads/' + req.files.profile_photo[0].filename : 'Photo/fahim.png';
    const cert_photo = req.files && req.files.cert_photo ? 'uploads/' + req.files.cert_photo[0].filename : '';
    const payment_photo = req.files && req.files.payment_photo ? 'uploads/' + req.files.payment_photo[0].filename : '';

    const passwordHash = bcrypt.hashSync(password || 'password123', 10);

    const newMember = db.addMember({
      full_name,
      gender,
      email,
      contact_number,
      blood_group: blood_group || 'Unknown',
      facebook: facebook || '',
      linkedin: linkedin || '',
      roll_no,
      batch_no: batch_no || '1st',
      degree: degree || 'B.Sc in EEE',
      department: department || 'Electrical and Electronic Engineering (EEE)',
      hall: hall || '',
      passing_year: passing_year || '',
      grade_cgpa: grade_cgpa || '',
      organization: organization || '',
      designation: designation || '',
      work_country: work_country || 'Bangladesh',
      permanent_district: permanent_district || '',
      permanent_address: permanent_address || '',
      present_district: present_district || '',
      present_address: present_address || '',
      membership_type: membership_type || 'Member',
      membership_no: membership_no || 'MEM-' + roll_no,
      cert_serial_no: cert_serial_no || '',
      cert_photo,
      profile_photo,
      payment_method: payment_method || 'Online Payment',
      payment_photo,
      passwordHash,
      status: 'Active' // Registered members are active by default for immediate local testing
    });

    req.session.success_msg = 'Your membership registration has been submitted successfully! You can now log in.';
    res.redirect('/login.aspx');
  } catch (err) {
    console.error('Registration error:', err);
    req.session.error_msg = 'Registration error: ' + err.message;
    res.redirect('/registration.aspx');
  }
});

// Member Login - GET
app.get(['/login', '/login.aspx'], (req, res) => {
  if (req.session.user) {
    return res.redirect('/my_profile.aspx');
  }
  res.render('login', { title: 'Member Login' });
});

// Member Login - POST
app.post(['/login', '/login.aspx'], (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    req.session.error_msg = 'Please enter your email/roll and password.';
    return res.redirect('/login.aspx');
  }

  // Find by email or roll
  let member = db.getMemberByEmail(email);
  if (!member) {
    member = db.getMemberByRoll(email);
  }

  if (!member) {
    req.session.error_msg = 'No member account found with this email or roll number.';
    return res.redirect('/login.aspx');
  }

  const valid = bcrypt.compareSync(password, member.passwordHash);
  if (!valid) {
    req.session.error_msg = 'Incorrect password. Please try again.';
    return res.redirect('/login.aspx');
  }

  req.session.user = {
    id: member.id,
    roll_no: member.roll_no,
    full_name: member.full_name,
    email: member.email,
    profile_photo: member.profile_photo,
    status: member.status
  };

  req.session.success_msg = `Welcome back, ${member.full_name}!`;
  res.redirect('/my_profile.aspx');
});

// Admin Login - GET
app.get(['/adminlogin', '/adminlogin.aspx'], (req, res) => {
  if (req.session.admin) {
    return res.redirect('/membermanagement.aspx');
  }
  res.render('adminlogin', { title: 'Admin Login' });
});

// Admin Login - POST
app.post(['/adminlogin', '/adminlogin.aspx'], (req, res) => {
  const { username, password } = req.body;
  const admin = db.getAdminByUsername(username);

  // Accept admin123 or admin for developer convenience
  let valid = false;
  if (admin) {
    valid = bcrypt.compareSync(password, admin.passwordHash) || password === 'admin' || password === 'admin123';
  } else if ((username === 'admin' || username === 'admin@pusteeealumni.org') && (password === 'admin' || password === 'admin123')) {
    valid = true;
  }

  if (!valid) {
    req.session.error_msg = 'Invalid administrator credentials.';
    return res.redirect('/adminlogin.aspx');
  }

  req.session.admin = {
    username: admin ? admin.username : 'admin',
    name: admin ? admin.name : 'System Administrator',
    role: 'admin'
  };

  req.session.success_msg = 'Administrator access granted. Welcome to Member Management!';
  res.redirect('/membermanagement.aspx');
});

// Logout
app.get(['/logout', '/logout.aspx'], (req, res) => {
  req.session.destroy(() => {
    res.redirect('/home.aspx');
  });
});

// ==========================================
// USER PANEL (MEMBER DASHBOARD)
// ==========================================

app.get(['/my_profile', '/my_profile.aspx'], requireUser, (req, res) => {
  const member = db.getMemberById(req.session.user.id) || db.getMemberByRoll(req.session.user.roll_no);
  if (!member) {
    req.session.error_msg = 'Member profile not found.';
    return res.redirect('/logout');
  }

  res.render('my_profile', {
    title: 'My Profile',
    member
  });
});

app.post(['/my_profile', '/my_profile.aspx'], requireUser, upload.single('profile_photo'), (req, res) => {
  const member = db.getMemberById(req.session.user.id) || db.getMemberByRoll(req.session.user.roll_no);
  if (!member) return res.redirect('/login.aspx');

  const { action } = req.body;

  if (action === 'change_password') {
    const { current_password, new_password, confirm_password } = req.body;
    if (!bcrypt.compareSync(current_password, member.passwordHash)) {
      req.session.error_msg = 'Current password is not correct.';
      return res.redirect('/my_profile.aspx');
    }
    if (new_password !== confirm_password) {
      req.session.error_msg = 'New passwords do not match.';
      return res.redirect('/my_profile.aspx');
    }
    db.updateMember(member.id, {
      passwordHash: bcrypt.hashSync(new_password, 10)
    });
    req.session.success_msg = 'Your password has been changed successfully!';
    return res.redirect('/my_profile.aspx');
  }

  // Update profile info
  const updates = {
    full_name: req.body.full_name || member.full_name,
    gender: req.body.gender || member.gender,
    blood_group: req.body.blood_group || member.blood_group,
    email: req.body.email || member.email,
    contact_number: req.body.contact_number || member.contact_number,
    facebook: req.body.facebook || member.facebook,
    linkedin: req.body.linkedin || member.linkedin,
    hall: req.body.hall || member.hall,
    organization: req.body.organization || member.organization,
    designation: req.body.designation || member.designation,
    present_district: req.body.present_district || member.present_district,
    present_address: req.body.present_address || member.present_address,
    permanent_district: req.body.permanent_district || member.permanent_district,
    permanent_address: req.body.permanent_address || member.permanent_address
  };

  if (req.file) {
    updates.profile_photo = 'uploads/' + req.file.filename;
    req.session.user.profile_photo = updates.profile_photo;
  }
  req.session.user.full_name = updates.full_name;

  db.updateMember(member.id, updates);
  req.session.success_msg = 'Profile information updated successfully!';
  res.redirect('/my_profile.aspx');
});

// ==========================================
// ADMIN PANEL (MEMBER MANAGEMENT & UPDATES)
// ==========================================

// Member Management Page
app.get(['/membermanagement', '/membermanagement.aspx'], requireAdmin, (req, res) => {
  const members = db.getMembers();
  const notCount = db.getNotices().length + db.getDownloads().length;
  res.render('membermanagement', {
    title: 'Member Management',
    members,
    notCount
  });
});

// Toggle Active/Pending status
app.post('/admin/toggle_status', requireAdmin, (req, res) => {
  const { id } = req.body;
  const member = db.getMemberById(id);
  if (member) {
    const nextStatus = member.status === 'Active' ? 'Pending' : 'Active';
    db.updateMember(id, { status: nextStatus });
    req.session.success_msg = `Member ${member.full_name} status updated to ${nextStatus}.`;
  }
  res.redirect('/membermanagement.aspx');
});

// Delete Member
app.post('/admin/delete_member', requireAdmin, (req, res) => {
  const { id } = req.body;
  db.deleteMember(id);
  req.session.success_msg = 'Member record deleted successfully.';
  res.redirect('/membermanagement.aspx');
});

// Admin Update Member Profile - GET
app.get(['/admin_update_member', '/admin_update_member.aspx'], requireAdmin, (req, res) => {
  const roll = (req.query.roll || '').trim();
  let member = null;
  if (roll) {
    member = db.getMemberByRoll(roll);
  }

  res.render('admin_update_member', {
    title: 'Update Member Profile',
    member,
    searchedRoll: roll
  });
});

// Admin Update Member Profile - POST
app.post(['/admin_update_member', '/admin_update_member.aspx'], requireAdmin, (req, res) => {
  const { roll_no } = req.body;
  const member = db.getMemberByRoll(roll_no);
  if (!member) {
    req.session.error_msg = 'Member record not found for Roll: ' + roll_no;
    return res.redirect('/admin_update_member.aspx');
  }

  const updates = {
    full_name: req.body.full_name || member.full_name,
    gender: req.body.gender || member.gender,
    blood_group: req.body.blood_group || member.blood_group,
    email: req.body.email || member.email,
    contact_number: req.body.contact_number || member.contact_number,
    facebook: req.body.facebook || member.facebook,
    linkedin: req.body.linkedin || member.linkedin,
    degree: req.body.degree || member.degree,
    department: req.body.department || member.department,
    batch_no: req.body.batch_no || member.batch_no,
    passing_year: req.body.passing_year || member.passing_year,
    grade_cgpa: req.body.grade_cgpa || member.grade_cgpa,
    membership_type: req.body.membership_type || member.membership_type,
    membership_no: req.body.membership_no || member.membership_no,
    organization: req.body.organization || member.organization,
    designation: req.body.designation || member.designation,
    permanent_district: req.body.permanent_district || member.permanent_district,
    permanent_address: req.body.permanent_address || member.permanent_address,
    present_district: req.body.present_district || member.present_district,
    present_address: req.body.present_address || member.present_address,
    status: req.body.status || member.status
  };

  if (req.body.new_password && req.body.new_password.trim().length > 0) {
    updates.passwordHash = bcrypt.hashSync(req.body.new_password.trim(), 10);
  }

  db.updateMemberByRoll(roll_no, updates);
  req.session.success_msg = `Profile for Roll ${roll_no} (${updates.full_name}) has been updated successfully!`;
  res.redirect(`/admin_update_member.aspx?roll=${roll_no}`);
});

// Admin Notices & Downloads Manager - GET
app.get(['/admin_content', '/admin_content.aspx'], requireAdmin, (req, res) => {
  const notices = db.getNotices();
  const downloads = db.getDownloads();
  res.render('admin_content', {
    title: 'Manage Notices & Downloads',
    notices,
    downloads
  });
});

// Add Notice
app.post('/admin/add_notice', requireAdmin, upload.single('notice_file'), (req, res) => {
  const { title } = req.body;
  if (!req.file || !title) {
    req.session.error_msg = 'Please specify notice title and attach a document.';
    return res.redirect('/admin_content.aspx');
  }
  db.addNotice({
    title,
    file_url: 'uploads/' + req.file.filename
  });
  req.session.success_msg = 'New notice published successfully!';
  res.redirect('/admin_content.aspx');
});

// Delete Notice
app.post('/admin/delete_notice', requireAdmin, (req, res) => {
  const { id } = req.body;
  db.deleteNotice(id);
  req.session.success_msg = 'Notice deleted.';
  res.redirect('/admin_content.aspx');
});

// Add Download
app.post('/admin/add_download', requireAdmin, upload.single('download_file'), (req, res) => {
  const { title } = req.body;
  if (!req.file || !title) {
    req.session.error_msg = 'Please specify download title and attach a document.';
    return res.redirect('/admin_content.aspx');
  }
  db.addDownload({
    title,
    file_url: 'uploads/' + req.file.filename
  });
  req.session.success_msg = 'New download resource added successfully!';
  res.redirect('/admin_content.aspx');
});

// Delete Download
app.post('/admin/delete_download', requireAdmin, (req, res) => {
  const { id } = req.body;
  db.deleteDownload(id);
  req.session.success_msg = 'Download resource deleted.';
  res.redirect('/admin_content.aspx');
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('about', {
    title: 'Page Not Found',
    error_msg: 'The requested page was not found. Redirecting you to the home page...'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`PUST EEE ALUMNI FULL-STACK WEB APPLICATION RUNNING`);
  console.log(`Local URL : http://localhost:${PORT}`);
  console.log(`Admin Portal: http://localhost:${PORT}/adminlogin.aspx`);
  console.log(`Admin User  : admin`);
  console.log(`Admin Pass  : admin123 (or admin)`);
  console.log(`Demo Member : amirul.090201@s.pust.ac.bd / password123`);
  console.log(`====================================================`);
});
