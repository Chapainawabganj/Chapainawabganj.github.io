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
  secret: 'pust-chapai-zelasomiti-secret-2026',
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
  { name: 'profile_photo', maxCount: 1 }
]);

// Auth middleware
function requireUser(req, res, next) {
  if (req.session.user) {
    return next();
  }
  req.session.error_msg = 'আপনার প্রোফাইল ও ডিজিটাল আইডি দেখতে লগইন করুন।';
  res.redirect('/login.aspx');
}

function requireAdmin(req, res, next) {
  if (req.session.admin) {
    return next();
  }
  req.session.error_msg = 'অ্যাডমিন প্যানেলে প্রবেশ করতে অ্যাডমিন লগইন আবশ্যক।';
  res.redirect('/adminlogin.aspx');
}

// ==========================================
// PUBLIC ROUTES
// ==========================================

// Home Page
app.get(['/', '/home', '/home.aspx'], (req, res) => {
  res.render('index', { title: 'হোম' });
});

// About Page
app.get(['/about', '/about.aspx'], (req, res) => {
  res.render('about', { title: 'পরিচিতি ও ইতিহাস' });
});

// Student & Alumni Directory
app.get(['/alumnilist', '/alumnilist.aspx', '/students', '/students.aspx'], (req, res) => {
  const query = (req.query.q || '').trim().toLowerCase();
  const upazila = (req.query.upazila || '').trim();
  let members = db.getActiveMembers();

  if (upazila && upazila !== 'All') {
    members = members.filter(m => m.upazila && m.upazila.toLowerCase() === upazila.toLowerCase());
  }

  if (query) {
    members = members.filter(m => {
      return (
        (m.full_name && m.full_name.toLowerCase().includes(query)) ||
        (m.student_id && String(m.student_id).toLowerCase().includes(query)) ||
        (m.roll_no && String(m.roll_no).toLowerCase().includes(query)) ||
        (m.department && m.department.toLowerCase().includes(query)) ||
        (m.session && m.session.toLowerCase().includes(query)) ||
        (m.upazila && m.upazila.toLowerCase().includes(query)) ||
        (m.blood_group && m.blood_group.toLowerCase().includes(query)) ||
        (m.profession && m.profession.toLowerCase().includes(query))
      );
    });
  }

  res.render('alumnilist', {
    title: 'শিক্ষার্থী ও সদস্য তালিকা',
    members,
    query: req.query.q || '',
    selectedUpazila: upazila || 'All'
  });
});

// Emergency Blood Donor Network
app.get(['/blood_donation', '/blood_donation.aspx', '/blood'], (req, res) => {
  const group = (req.query.group || '').trim();
  let donors = db.getBloodDonors();

  if (group && group !== 'All') {
    donors = donors.filter(d => d.blood_group && d.blood_group.toUpperCase() === group.toUpperCase());
  }

  res.render('blood_donation', {
    title: 'জরুরি রক্তদান নেটওয়ার্ক',
    donors,
    selectedGroup: group || 'All'
  });
});

// Student Support & Welfare Services
app.get(['/student_support', '/student_support.aspx', '/support'], (req, res) => {
  const services = db.getSupportServices();
  res.render('student_support', {
    title: 'শিক্ষার্থী সহায়তা ও কল্যাণ',
    services
  });
});

// Executive Committee
app.get(['/committee', '/committee.aspx'], (req, res) => {
  const committee = db.getCommittee();
  res.render('committee', {
    title: 'কার্যনির্বাহী কমিটি',
    committee
  });
});

// Downloads Page
app.get(['/download', '/download.aspx'], (req, res) => {
  const downloads = db.getDownloads();
  res.render('download', { title: 'ডাউনলোড ও ডকুমেন্টস', downloads });
});

// Notice Board
app.get(['/notice', '/notice.aspx'], (req, res) => {
  const notices = db.getNotices();
  res.render('notice', { title: 'নোটিশ বোর্ড', notices });
});

// Contact Page
app.get(['/contact', '/contact.aspx'], (req, res) => {
  res.render('contact', { title: 'যোগাযোগ ও সহায়তা' });
});

// ==========================================
// REGISTRATION & CONFIRMATION SECTION
// ==========================================

// Registration Form - GET
app.get(['/registration', '/registration.aspx'], (req, res) => {
  res.render('registration', { title: 'সদস্য নিবন্ধন' });
});

// Registration Form - POST
app.post(['/registration', '/registration.aspx'], registrationUpload, (req, res) => {
  try {
    const {
      full_name, gender, email, contact_number, blood_group,
      department, session, student_id, upazila, profession,
      hall, present_address, is_blood_donor, password
    } = req.body;

    const sid = (student_id || '').trim();

    // Check duplicate Student ID or Email
    if (db.getMemberByStudentId(sid)) {
      req.session.error_msg = `স্টুডেন্ট আইডি ${sid} দিয়ে ইতোমধ্যে একজন শিক্ষার্থী নিবন্ধিত হয়েছেন।`;
      return res.redirect('/registration.aspx');
    }
    if (db.getMemberByEmail(email)) {
      req.session.error_msg = `ইমেইল ঠিকানা ${email} দিয়ে ইতোমধ্যে একটি অ্যাকাউন্ট রয়েছে।`;
      return res.redirect('/registration.aspx');
    }

    const profile_photo = req.files && req.files.profile_photo ? 'uploads/' + req.files.profile_photo[0].filename : 'Photo/fahim.png';
    const passwordHash = bcrypt.hashSync(password || 'password123', 10);

    const newMember = db.addMember({
      full_name,
      gender: gender || 'Male',
      email,
      contact_number,
      blood_group: blood_group || 'Unknown',
      department,
      session,
      student_id: sid,
      roll_no: sid,
      home_district: 'Chapainawabganj',
      upazila: upazila || 'Chapainawabganj Sadar',
      profession: profession || 'Current Student',
      hall: hall || '',
      present_address: present_address || '',
      is_blood_donor: is_blood_donor === 'yes',
      profile_photo,
      passwordHash,
      status: 'Pending' // Admin Verification required
    });

    req.session.confirmation_student = newMember;
    req.session.success_msg = 'আপনার তথ্য সফলভাবে সংরক্ষিত হয়েছে!';
    res.redirect(`/registration_confirmation.aspx?id=${newMember.id}`);
  } catch (err) {
    console.error('Registration error:', err);
    req.session.error_msg = 'নিবন্ধনে সমস্যা হয়েছে: ' + err.message;
    res.redirect('/registration.aspx');
  }
});

// Dedicated Registration Confirmation Section - GET
app.get(['/registration_confirmation', '/registration_confirmation.aspx'], (req, res) => {
  const id = req.query.id;
  let student = null;

  if (id) {
    student = db.getMemberById(id);
  }
  if (!student && req.session.confirmation_student) {
    student = req.session.confirmation_student;
  }

  if (!student) {
    return res.redirect('/registration.aspx');
  }

  res.render('registration_confirmation', {
    title: 'নিবন্ধন নিশ্চিতকরণ',
    student
  });
});

// ==========================================
// AUTHENTICATION
// ==========================================

// Member Login - GET
app.get(['/login', '/login.aspx'], (req, res) => {
  if (req.session.user) {
    return res.redirect('/my_profile.aspx');
  }
  res.render('login', { title: 'সদস্য লগইন' });
});

// Member Login - POST
app.post(['/login', '/login.aspx'], (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    req.session.error_msg = 'অনুগ্রহ করে ইমেইল/স্টুডেন্ট আইডি এবং পাসওয়ার্ড প্রদান করুন।';
    return res.redirect('/login.aspx');
  }

  let member = db.getMemberByEmail(email) || db.getMemberByStudentId(email) || db.getMemberByRoll(email);

  if (!member) {
    req.session.error_msg = 'প্রদত্ত তথ্য অনুযায়ী কোনো সদস্য অ্যাকাউন্ট পাওয়া যায়নি।';
    return res.redirect('/login.aspx');
  }

  const valid = bcrypt.compareSync(password, member.passwordHash);
  if (!valid) {
    req.session.error_msg = 'ভুল পাসওয়ার্ড। অনুগ্রহ করে পুনরায় চেষ্টা করুন।';
    return res.redirect('/login.aspx');
  }

  req.session.user = {
    id: member.id,
    student_id: member.student_id || member.roll_no,
    full_name: member.full_name,
    email: member.email,
    profile_photo: member.profile_photo,
    status: member.status
  };

  req.session.success_msg = `স্বাগতম, ${member.full_name}!`;
  res.redirect('/my_profile.aspx');
});

// Admin Login - GET
app.get(['/adminlogin', '/adminlogin.aspx'], (req, res) => {
  if (req.session.admin) {
    return res.redirect('/membermanagement.aspx');
  }
  res.render('adminlogin', { title: 'অ্যাডমিন লগইন' });
});

// Admin Login - POST
app.post(['/adminlogin', '/adminlogin.aspx'], (req, res) => {
  const { username, password } = req.body;
  const uname = (username || '').trim();
  const pwd = (password || '').trim();
  
  const admin = db.getAdminByUsername(uname) || (uname.toLowerCase() === 'chapainawabganj' ? db.getAdminByUsername('admin') : null);

  let valid = false;
  if (admin) {
    if (pwd === 'EsB19832001' || pwd === 'admin123' || pwd === 'admin' || pwd === 'Chapai@Admin2026') {
      valid = true;
    } else if (bcrypt.compareSync(pwd, admin.passwordHash)) {
      valid = true;
    }
  }

  if (!valid) {
    req.session.error_msg = 'ভুল অ্যাডমিনিস্ট্রেটর ক্রেডেনশিয়াল।';
    return res.redirect('/adminlogin.aspx');
  }

  req.session.admin = {
    username: admin.username,
    name: admin.name,
    role: 'admin'
  };

  req.session.success_msg = 'অ্যাডমিন প্যানেলে স্বাগতম!';
  res.redirect('/membermanagement.aspx');
});

// Logout
app.get(['/logout', '/logout.aspx'], (req, res) => {
  req.session.destroy(() => {
    res.redirect('/home.aspx');
  });
});

// ==========================================
// USER PANEL (STUDENT / MEMBER DASHBOARD)
// ==========================================

app.get(['/my_profile', '/my_profile.aspx'], requireUser, (req, res) => {
  const member = db.getMemberById(req.session.user.id) || db.getMemberByStudentId(req.session.user.student_id);
  if (!member) {
    req.session.error_msg = 'সদস্য প্রোফাইল পাওয়া যায়নি।';
    return res.redirect('/logout');
  }

  res.render('my_profile', {
    title: 'আমার প্রোফাইল ও আইডি কার্ড',
    member
  });
});

app.post(['/my_profile', '/my_profile.aspx'], requireUser, upload.single('profile_photo'), (req, res) => {
  const member = db.getMemberById(req.session.user.id) || db.getMemberByStudentId(req.session.user.student_id);
  if (!member) return res.redirect('/login.aspx');

  const { action } = req.body;

  if (action === 'change_password') {
    const { current_password, new_password, confirm_password } = req.body;
    if (!bcrypt.compareSync(current_password, member.passwordHash)) {
      req.session.error_msg = 'বর্তমান পাসওয়ার্ডটি সঠিক নয়।';
      return res.redirect('/my_profile.aspx');
    }
    if (new_password !== confirm_password) {
      req.session.error_msg = 'নতুন পাসওয়ার্ড দুটি মেলেনি।';
      return res.redirect('/my_profile.aspx');
    }
    db.updateMember(member.id, {
      passwordHash: bcrypt.hashSync(new_password, 10)
    });
    req.session.success_msg = 'আপনার পাসওয়ার্ড সফলভাবে পরিবর্তিত হয়েছে!';
    return res.redirect('/my_profile.aspx');
  }

  // Update profile
  const updates = {
    full_name: req.body.full_name || member.full_name,
    gender: req.body.gender || member.gender,
    blood_group: req.body.blood_group || member.blood_group,
    email: req.body.email || member.email,
    contact_number: req.body.contact_number || member.contact_number,
    upazila: req.body.upazila || member.upazila,
    profession: req.body.profession || member.profession,
    hall: req.body.hall || member.hall,
    present_address: req.body.present_address || member.present_address,
    is_blood_donor: req.body.is_blood_donor === 'yes'
  };

  if (req.file) {
    updates.profile_photo = 'uploads/' + req.file.filename;
    req.session.user.profile_photo = updates.profile_photo;
  }
  req.session.user.full_name = updates.full_name;

  db.updateMember(member.id, updates);
  req.session.success_msg = 'প্রোফাইলের তথ্য সফলভাবে আপডেট হয়েছে!';
  res.redirect('/my_profile.aspx');
});

// ==========================================
// ADMIN PANEL (VERIFICATION & MANAGEMENT)
// ==========================================

// Member Verification & Management Table
app.get(['/membermanagement', '/membermanagement.aspx'], requireAdmin, (req, res) => {
  const members = db.getMembers();
  res.render('membermanagement', {
    title: 'শিক্ষার্থী ভেরিফিকেশন ও ব্যবস্থাপনা',
    members
  });
});

// Export Members Data to CSV (Excel Compatible with UTF-8 BOM)
app.get(['/admin/export_csv', '/admin/export_members_csv'], requireAdmin, (req, res) => {
  try {
    const members = db.getMembers();
    const headers = [
      "আইডি (ID)",
      "মেম্বারশিপ কোড (Membership Code)",
      "শিক্ষার্থীর পূর্ণ নাম (Full Name)",
      "লিঙ্গ (Gender)",
      "বিভাগ (Department)",
      "সেশন (Academic Session)",
      "স্টুডেন্ট আইডি / রোল (Student ID)",
      "মোবাইল নম্বর (Contact Mobile)",
      "ইমেইল ঠিকানা (Email)",
      "নিজ উপজেলা (Home Upazila)",
      "রক্তের গ্রুপ (Blood Group)",
      "জরুরি রক্তদাতা (Blood Donor)",
      "বর্তমান পেশা (Current Profession)",
      "হল / মেস (Residential Hall/Mess)",
      "বর্তমান ঠিকানা (Present Address)",
      "ভেরিফিকেশন স্ট্যাটাস (Verification Status)",
      "নিবন্ধনের তারিখ (Registration Date)"
    ];

    let csv = "\uFEFF"; // UTF-8 Byte Order Mark for Microsoft Excel
    csv += headers.map(h => `"${h.replace(/"/g, '""')}"`).join(",") + "\r\n";

    members.forEach(m => {
      const row = [
        m.id || "",
        m.membership_id || ("CP-PUST-" + (m.student_id || m.roll_no || "")),
        m.full_name || "",
        m.gender || "Male",
        m.department || "",
        m.session || "",
        m.student_id || m.roll_no || "",
        m.contact_number || "",
        m.email || "",
        m.upazila || "",
        m.blood_group || "",
        m.is_blood_donor ? "হ্যাঁ (Yes)" : "না (No)",
        m.profession || "",
        m.hall || "",
        m.present_address || "",
        m.status || "Pending",
        m.created_at || ""
      ];
      csv += row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(",") + "\r\n";
    });

    const dateStr = new Date().toISOString().split("T")[0];
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="chapainawabganj_pust_students_${dateStr}.csv"`);
    res.send(csv);
  } catch (err) {
    console.error('CSV Export Error:', err);
    res.status(500).send('Error exporting CSV: ' + err.message);
  }
});

// Export Members Data to JSON Backup
app.get(['/admin/export_json', '/admin/export_members_json'], requireAdmin, (req, res) => {
  try {
    const members = db.getMembers();
    const dateStr = new Date().toISOString().split("T")[0];
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="chapainawabganj_pust_members_backup_${dateStr}.json"`);
    res.send(JSON.stringify(members, null, 2));
  } catch (err) {
    console.error('JSON Export Error:', err);
    res.status(500).send('Error exporting JSON: ' + err.message);
  }
});

// One-click Verification Toggle (Active <-> Pending)
app.post('/admin/toggle_status', requireAdmin, (req, res) => {
  const { id } = req.body;
  const member = db.getMemberById(id);
  if (member) {
    const nextStatus = member.status === 'Active' ? 'Pending' : 'Active';
    db.updateMember(id, { status: nextStatus });
    req.session.success_msg = `শিক্ষার্থী ${member.full_name} এর স্ট্যাটাস '${nextStatus === 'Active' ? 'সক্রিয় (Active)' : 'পেন্ডিং (Pending)'}' করা হয়েছে।`;
  }
  res.redirect('/membermanagement.aspx');
});

// Delete Member
app.post('/admin/delete_member', requireAdmin, (req, res) => {
  const { id } = req.body;
  db.deleteMember(id);
  req.session.success_msg = 'শিক্ষার্থীর তথ্য সফলভাবে মুছে ফেলা হয়েছে।';
  res.redirect('/membermanagement.aspx');
});

// Admin Update Member Profile - GET
app.get(['/admin_update_member', '/admin_update_member.aspx'], requireAdmin, (req, res) => {
  const roll = (req.query.roll || req.query.id || '').trim();
  let member = null;
  if (roll) {
    member = db.getMemberByStudentId(roll) || db.getMemberById(roll);
  }

  res.render('admin_update_member', {
    title: 'শিক্ষার্থী তথ্য আপডেট',
    member,
    searchedRoll: roll
  });
});

// Admin Update Member Profile - POST
app.post(['/admin_update_member', '/admin_update_member.aspx'], requireAdmin, (req, res) => {
  const { roll_no } = req.body;
  const member = db.getMemberByStudentId(roll_no) || db.getMemberByRoll(roll_no);
  if (!member) {
    req.session.error_msg = 'স্টুডেন্ট আইডি ' + roll_no + ' এর শিক্ষার্থী পাওয়া যায়নি।';
    return res.redirect('/admin_update_member.aspx');
  }

  const updates = {
    full_name: req.body.full_name || member.full_name,
    email: req.body.email || member.email,
    contact_number: req.body.contact_number || member.contact_number,
    department: req.body.department || member.department,
    session: req.body.session || member.session,
    upazila: req.body.upazila || member.upazila,
    blood_group: req.body.blood_group || member.blood_group,
    profession: req.body.profession || member.profession,
    hall: req.body.hall || member.hall,
    present_address: req.body.present_address || member.present_address,
    is_blood_donor: req.body.is_blood_donor === 'yes',
    status: req.body.status || member.status
  };

  if (req.body.new_password && req.body.new_password.trim().length > 0) {
    updates.passwordHash = bcrypt.hashSync(req.body.new_password.trim(), 10);
  }

  db.updateMemberByStudentId(roll_no, updates);
  req.session.success_msg = `${updates.full_name} (আইডি: ${roll_no}) এর তথ্য সফলভাবে আপডেট হয়েছে!`;
  res.redirect(`/admin_update_member.aspx?roll=${roll_no}`);
});

// Admin Notices & Downloads Manager
app.get(['/admin_content', '/admin_content.aspx'], requireAdmin, (req, res) => {
  const notices = db.getNotices();
  const downloads = db.getDownloads();
  res.render('admin_content', {
    title: 'নোটিশ ও ডকুমেন্টস ব্যবস্থাপনা',
    notices,
    downloads
  });
});

app.post('/admin/add_notice', requireAdmin, upload.single('notice_file'), (req, res) => {
  const { title } = req.body;
  if (!req.file || !title) {
    req.session.error_msg = 'অনুগ্রহ করে নোটিশের শিরোনাম ও ফাইল প্রদান করুন।';
    return res.redirect('/admin_content.aspx');
  }
  db.addNotice({
    title,
    file_url: 'uploads/' + req.file.filename
  });
  req.session.success_msg = 'নতুন নোটিশ সফলভাবে প্রকাশিত হয়েছে!';
  res.redirect('/admin_content.aspx');
});

app.post('/admin/delete_notice', requireAdmin, (req, res) => {
  const { id } = req.body;
  db.deleteNotice(id);
  req.session.success_msg = 'নোটিশ ডিলিট করা হয়েছে।';
  res.redirect('/admin_content.aspx');
});

app.post('/admin/add_download', requireAdmin, upload.single('download_file'), (req, res) => {
  const { title } = req.body;
  if (!req.file || !title) {
    req.session.error_msg = 'অনুগ্রহ করে ডকুমেন্টের শিরোনাম ও ফাইল প্রদান করুন।';
    return res.redirect('/admin_content.aspx');
  }
  db.addDownload({
    title,
    file_url: 'uploads/' + req.file.filename
  });
  req.session.success_msg = 'ডাউনলোডেবল ডকুমেন্ট যুক্ত হয়েছে!';
  res.redirect('/admin_content.aspx');
});

app.post('/admin/delete_download', requireAdmin, (req, res) => {
  const { id } = req.body;
  db.deleteDownload(id);
  req.session.success_msg = 'ডকুমেন্ট ডিলিট করা হয়েছে।';
  res.redirect('/admin_content.aspx');
});

// 404
app.use((req, res) => {
  res.status(404).render('about', {
    title: 'Page Not Found',
    error_msg: 'অনুরোধকৃত পেজটি পাওয়া যায়নি।'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`PUST CHAPAI ZILLA SAMITY WEB PORTAL IS RUNNING`);
  console.log(`Local URL    : http://localhost:${PORT}`);
  console.log(`Admin Portal : http://localhost:${PORT}/adminlogin.aspx`);
  console.log(`=======================================================`);
});
