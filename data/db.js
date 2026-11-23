const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_PATH = path.join(__dirname, 'db.json');

const defaultData = {
  admins: [
    {
      id: 1,
      username: 'admin',
      email: 'admin@pust.chapai.org',
      passwordHash: bcrypt.hashSync('admin123', 10),
      name: 'Central Administrator',
      role: 'admin'
    }
  ],
  members: [
    {
      id: 'std_1',
      full_name: 'Md. Al-Emran',
      profile_photo: 'Photo/fahim.png',
      department: 'Computer Science and Engineering (CSE)',
      session: '2020-21',
      student_id: '200101',
      roll_no: '200101',
      contact_number: '+8801712345678',
      email: 'emran.cse@s.pust.ac.bd',
      home_district: 'Chapainawabganj',
      upazila: 'Shibganj',
      profession: 'Current Student',
      present_address: 'Bangabandhu Sheikh Mujibur Rahman Hall, Room 412, PUST',
      hall: 'Bangabandhu Sheikh Mujibur Rahman Hall',
      blood_group: 'B+',
      is_blood_donor: true,
      membership_id: 'CP-PUST-200101',
      status: 'Active',
      passwordHash: bcrypt.hashSync('password123', 10),
      created_at: '2024-01-15T10:00:00.000Z'
    },
    {
      id: 'std_2',
      full_name: 'Tanzim Ahmed Shiblu',
      profile_photo: 'ProfilePhoto/Navil090205.png',
      department: 'Electrical and Electronic Engineering (EEE)',
      session: '2019-20',
      student_id: '190215',
      roll_no: '190215',
      contact_number: '+8801723456789',
      email: 'tanzim.eee@s.pust.ac.bd',
      home_district: 'Chapainawabganj',
      upazila: 'Chapainawabganj Sadar',
      profession: 'Current Student',
      present_address: 'Sheikh Rasel Hall, Room 205, PUST',
      hall: 'Sheikh Rasel Hall',
      blood_group: 'O+',
      is_blood_donor: true,
      membership_id: 'CP-PUST-190215',
      status: 'Active',
      passwordHash: bcrypt.hashSync('password123', 10),
      created_at: '2024-01-16T11:30:00.000Z'
    },
    {
      id: 'std_3',
      full_name: 'Nusrat Jahan Mim',
      profile_photo: 'Photo/fahim.png',
      department: 'Pharmacy',
      session: '2021-22',
      student_id: '210512',
      roll_no: '210512',
      contact_number: '+8801734567890',
      email: 'mim.pharmacy@s.pust.ac.bd',
      home_district: 'Chapainawabganj',
      upazila: 'Gomostapur',
      profession: 'Current Student',
      present_address: 'Sheikh Hasina Hall, Room 310, PUST',
      hall: 'Sheikh Hasina Hall',
      blood_group: 'A+',
      is_blood_donor: true,
      membership_id: 'CP-PUST-210512',
      status: 'Active',
      passwordHash: bcrypt.hashSync('password123', 10),
      created_at: '2024-02-10T09:15:00.000Z'
    },
    {
      id: 'std_4',
      full_name: 'Md. Tariqul Islam',
      profile_photo: 'ProfilePhoto/Amir.jpg',
      department: 'Civil Engineering (CE)',
      session: '2016-17',
      student_id: '160308',
      roll_no: '160308',
      contact_number: '+8801745678901',
      email: 'tariqul.ce@alumni.pust.ac.bd',
      home_district: 'Chapainawabganj',
      upazila: 'Nachole',
      profession: 'Assistant Engineer (RHD)',
      present_address: 'Tejgaon, Dhaka',
      hall: 'Bangabandhu Sheikh Mujibur Rahman Hall',
      blood_group: 'AB+',
      is_blood_donor: false,
      membership_id: 'CP-PUST-160308',
      status: 'Active',
      passwordHash: bcrypt.hashSync('password123', 10),
      created_at: '2023-11-20T14:45:00.000Z'
    },
    {
      id: 'std_5',
      full_name: 'Mahmudul Hasan Shanto',
      profile_photo: 'Photo/fahim.png',
      department: 'Business Administration (BBA)',
      session: '2022-23',
      student_id: '220914',
      roll_no: '220914',
      contact_number: '+8801756789012',
      email: 'shanto.bba@s.pust.ac.bd',
      home_district: 'Chapainawabganj',
      upazila: 'Bholahat',
      profession: 'Current Student',
      present_address: 'Radhanagar Student Mess, Pabna',
      hall: 'Off-Campus Mess',
      blood_group: 'O-',
      is_blood_donor: true,
      membership_id: 'CP-PUST-220914',
      status: 'Active',
      passwordHash: bcrypt.hashSync('password123', 10),
      created_at: '2024-03-01T12:00:00.000Z'
    },
    {
      id: 'std_6',
      full_name: 'Sabrina Sultana Ritu',
      profile_photo: 'Photo/fahim.png',
      department: 'Information and Communication Engineering (ICE)',
      session: '2023-24',
      student_id: '230405',
      roll_no: '230405',
      contact_number: '+8801767890123',
      email: 'ritu.ice@s.pust.ac.bd',
      home_district: 'Chapainawabganj',
      upazila: 'Shibganj',
      profession: 'Current Student',
      present_address: 'Pritilata Hall, PUST',
      hall: 'Pritilata Hall',
      blood_group: 'B-',
      is_blood_donor: true,
      membership_id: 'CP-PUST-230405',
      status: 'Pending',
      passwordHash: bcrypt.hashSync('password123', 10),
      created_at: '2024-04-12T16:20:00.000Z'
    },
    {
      id: 'std_7',
      full_name: 'Engr. Md. Faruk Hossain',
      profile_photo: 'Photo/adminuser.png',
      department: 'Computer Science and Engineering (CSE)',
      session: '2014-15',
      student_id: '140102',
      roll_no: '140102',
      contact_number: '+8801778901234',
      email: 'faruk.cse@alumni.pust.ac.bd',
      home_district: 'Chapainawabganj',
      upazila: 'Chapainawabganj Sadar',
      profession: 'Senior Software Engineer, Brain Station 23',
      present_address: 'Mirpur DOHS, Dhaka',
      hall: 'Bangabandhu Sheikh Mujibur Rahman Hall',
      blood_group: 'A+',
      is_blood_donor: true,
      membership_id: 'CP-PUST-140102',
      status: 'Active',
      passwordHash: bcrypt.hashSync('password123', 10),
      created_at: '2023-10-05T08:30:00.000Z'
    }
  ],
  support_services: [
    {
      id: 1,
      title: 'নতুন ভর্তিচ্ছু শিক্ষার্থীদের সহায়তা (Admission Helper)',
      icon: 'fa-user-graduate',
      description: 'চাঁপাইনবাবগঞ্জ থেকে পাবিপ্রবিতে নতুন ভর্তি পরীক্ষা ও ভর্তি সংক্রান্ত যে কোনো তথ্য, ক্যাম্পাস পরিদর্শন, সিট খোঁজা এবং বাস কাউন্টার থেকে রিসিভ করার পূর্ণাঙ্গ সহায়তা।'
    },
    {
      id: 2,
      title: 'মেস ও আবাসন সহায়তা (Mess & Accommodation)',
      icon: 'fa-home',
      description: 'পাবনা শহর ও ক্যাম্পাস সংলগ্ন এলাকায় নিরাপদ মেস ও ছাত্রাবাস খুঁজে পেতে নতুন শিক্ষার্থীদের সার্বিক সহযোগিতা ও পরামর্শ।'
    },
    {
      id: 3,
      title: 'জরুরি রক্তদান নেটওয়ার্ক (Emergency Blood Network)',
      icon: 'fa-tint',
      description: 'পাবনা ও চাঁপাইনবাবগঞ্জে জেলা সমিতির সদস্যদের মাধ্যমে জরুরি প্রয়োজনে দ্রুত রক্তদাতা সংগ্রহের সক্রিয় নেটওয়ার্ক।'
    },
    {
      id: 4,
      title: 'ক্যারিয়ার ও বিসিএস গাইডলাইন (Mentorship & Career)',
      icon: 'fa-briefcase',
      description: 'পাবিপ্রবির চাঁপাইনবাবগঞ্জের সফল অ্যালামনাই ও সিনিয়রদের তত্ত্বাবধানে নিয়মিত স্টাডি সেশন, বিসিএস ও জব প্রিপারেশন গাইডলাইন।'
    },
    {
      id: 5,
      title: 'শিক্ষা সহায়তা ও কল্যাণ তহবিল (Student Welfare Fund)',
      icon: 'fa-hands-helping',
      description: 'অসহায় ও মেধাবী শিক্ষার্থীদের এককালীন শিক্ষা সহায়তা, সেমিস্টার ফি এবং জরুরি চিকিৎসা সহায়তায় আর্থিক ফান্ড।'
    }
  ],
  notices: [
    {
      id: 1,
      title: 'পাবিপ্রবি চাঁপাইনবাবগঞ্জ জেলা সমিতি - বার্ষিক মিলনমেলা ও নবীনবরণ ২০২৬',
      file_url: 'NoticeDoc/Instruction.png',
      date: '2026-11-20'
    },
    {
      id: 2,
      title: 'সদস্য তালিকাভুক্তি ও ডিজিটাল আইডি কার্ড সংক্রান্ত জরুরি নোটিশ',
      file_url: 'NoticeDoc/Instruction.png',
      date: '2026-11-15'
    }
  ],
  downloads: [
    {
      id: 1,
      title: 'পাবিপ্রবি চাঁপাইনবাবগঞ্জ জেলা সমিতি গঠনতন্ত্র ও নীতিমালা',
      file_url: 'DownloadDoc/Chapainawabganj_Zilla_Samity_PUST_Constitution.pdf',
      date: '2026-10-01'
    },
    {
      id: 2,
      title: 'সদস্য নিবন্ধন নির্দেশিকা ও তথ্য ফরম',
      file_url: 'DownloadDoc/Instruction.png',
      date: '2026-10-01'
    }
  ],
  committee: [
    {
      role: 'সভাপতি (President)',
      name: 'মো: হাসিবুল হাসান',
      department: 'CSE',
      session: '2019-20',
      upazila: 'Shibganj',
      phone: '+8801700000001'
    },
    {
      role: 'সাধারণ সম্পাদক (General Secretary)',
      name: 'মো: আব্দুল্লাহ আল মামুন',
      department: 'EEE',
      session: '2020-21',
      upazila: 'Chapainawabganj Sadar',
      phone: '+8801700000002'
    },
    {
      role: 'সাংগঠনিক সম্পাদক (Organizing Secretary)',
      name: 'মো: আরিফুল ইসলাম',
      department: 'Pharmacy',
      session: '2021-22',
      upazila: 'Gomostapur',
      phone: '+8801700000003'
    },
    {
      role: 'দপ্তর সম্পাদক (Office Secretary)',
      name: 'মো: ফাহিম ফয়সাল',
      department: 'CE',
      session: '2021-22',
      upazila: 'Nachole',
      phone: '+8801700000004'
    },
    {
      role: 'ছাত্রকল্যাণ ও রক্তদান বিষয়ক সম্পাদক',
      name: 'মো: রাকিবুল ইসলাম',
      department: 'BBA',
      session: '2022-23',
      upazila: 'Bholahat',
      phone: '+8801700000005'
    }
  ]
};

function ensureDb() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(defaultData, null, 2), 'utf8');
  }
}

function readDb() {
  ensureDb();
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading DB, re-initializing default data:', err);
    fs.writeFileSync(DB_PATH, JSON.stringify(defaultData, null, 2), 'utf8');
    return JSON.parse(JSON.stringify(defaultData));
  }
}

function writeDb(data) {
  const tmpPath = DB_PATH + '.tmp';
  fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), 'utf8');
  fs.renameSync(tmpPath, DB_PATH);
}

module.exports = {
  // Members
  getMembers: () => readDb().members,
  getActiveMembers: () => readDb().members.filter(m => m.status === 'Active'),
  getPendingMembers: () => readDb().members.filter(m => m.status === 'Pending'),
  getBloodDonors: () => readDb().members.filter(m => m.is_blood_donor && m.blood_group && m.blood_group !== 'Unknown'),
  getMemberById: (id) => readDb().members.find(m => String(m.id) === String(id)),
  getMemberByEmail: (email) => {
    if (!email) return null;
    return readDb().members.find(m => m.email && m.email.toLowerCase() === email.trim().toLowerCase());
  },
  getMemberByStudentId: (sid) => {
    if (!sid) return null;
    return readDb().members.find(m => 
      (m.student_id && String(m.student_id).trim() === String(sid).trim()) ||
      (m.roll_no && String(m.roll_no).trim() === String(sid).trim())
    );
  },
  getMemberByRoll: (roll) => {
    if (!roll) return null;
    return readDb().members.find(m => 
      (m.roll_no && String(m.roll_no).trim() === String(roll).trim()) ||
      (m.student_id && String(m.student_id).trim() === String(roll).trim())
    );
  },
  addMember: (memberData) => {
    const db = readDb();
    const id = 'std_' + Date.now();
    const newMember = {
      id,
      ...memberData,
      home_district: 'Chapainawabganj',
      membership_id: memberData.membership_id || 'CP-PUST-' + (memberData.student_id || memberData.roll_no || Date.now().toString().slice(-4)),
      created_at: new Date().toISOString()
    };
    db.members.unshift(newMember);
    writeDb(db);
    return newMember;
  },
  updateMember: (id, updates) => {
    const db = readDb();
    const idx = db.members.findIndex(m => String(m.id) === String(id));
    if (idx === -1) return null;
    db.members[idx] = { ...db.members[idx], ...updates, updated_at: new Date().toISOString() };
    writeDb(db);
    return db.members[idx];
  },
  updateMemberByStudentId: (sid, updates) => {
    const db = readDb();
    const idx = db.members.findIndex(m => 
      (m.student_id && String(m.student_id).trim() === String(sid).trim()) ||
      (m.roll_no && String(m.roll_no).trim() === String(sid).trim())
    );
    if (idx === -1) return null;
    db.members[idx] = { ...db.members[idx], ...updates, updated_at: new Date().toISOString() };
    writeDb(db);
    return db.members[idx];
  },
  deleteMember: (id) => {
    const db = readDb();
    db.members = db.members.filter(m => String(m.id) !== String(id) && String(m.student_id) !== String(id) && String(m.roll_no) !== String(id));
    writeDb(db);
    return true;
  },

  // Admin
  getAdminByUsername: (username) => {
    if (!username) return null;
    return readDb().admins.find(a => a.username.toLowerCase() === username.trim().toLowerCase());
  },

  // Notices
  getNotices: () => readDb().notices || [],
  addNotice: (notice) => {
    const db = readDb();
    const newNotice = {
      id: Date.now(),
      ...notice,
      date: notice.date || new Date().toISOString().split('T')[0]
    };
    db.notices.unshift(newNotice);
    writeDb(db);
    return newNotice;
  },
  deleteNotice: (id) => {
    const db = readDb();
    db.notices = db.notices.filter(n => String(n.id) !== String(id));
    writeDb(db);
    return true;
  },

  // Downloads
  getDownloads: () => readDb().downloads || [],
  addDownload: (download) => {
    const db = readDb();
    const newDownload = {
      id: Date.now(),
      ...download,
      date: download.date || new Date().toISOString().split('T')[0]
    };
    db.downloads.unshift(newDownload);
    writeDb(db);
    return newDownload;
  },
  deleteDownload: (id) => {
    const db = readDb();
    db.downloads = db.downloads.filter(d => String(d.id) !== String(id));
    writeDb(db);
    return true;
  },

  // Support & Committee
  getSupportServices: () => readDb().support_services || defaultData.support_services,
  getCommittee: () => readDb().committee || defaultData.committee
};
