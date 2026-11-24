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
      passwordHash: bcrypt.hashSync('Chapai@Admin2026', 10),
      name: 'Central Administrator',
      role: 'admin'
    }
  ],
  members: [],
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
  ],
  site_settings: {
    site_title: 'পাবনা বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়স্থ চাঁপাইনবাবগঞ্জ জেলা সমিতি',
    site_tagline: 'ঐক্য, সৌহার্দ্য ও প্রগতি',
    contact_phone: '01778332062',
    contact_email: 'alemranak13@gmail.com',
    blood_hotline: '01778332062',
    facebook_url: 'https://facebook.com/groups/pust.chapai',
    office_address: 'পাবনা বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় (PUST), রাজাপুর, পাবনা-৬৬০০'
  }
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
