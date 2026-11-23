const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_PATH = path.join(__dirname, 'db.json');

const defaultData = {
  admins: [
    {
      id: 1,
      username: 'admin',
      email: 'admin@pusteeealumni.org',
      passwordHash: bcrypt.hashSync('admin123', 10),
      name: 'System Administrator',
      role: 'admin'
    }
  ],
  members: [
    {
      id: 'mem_1',
      full_name: 'Md. Amirul Islam Rony',
      gender: 'Male',
      email: 'amirul.090201@s.pust.ac.bd',
      contact_number: '+8801722302779',
      blood_group: 'A-',
      facebook: 'https://facebook.com/amirulrony',
      linkedin: 'https://linkedin.com/in/amirulrony',
      degree: 'B.Sc in EEE',
      roll_no: '090201',
      department: 'Electrical and Electronic Engineering (EEE)',
      batch_no: '1st',
      hall: 'Bangabandhu Sheikh Mujibur Rahman hall',
      passing_year: '2014',
      grade_cgpa: '3.75',
      organization: 'SQUARE InformatiX Ltd.',
      designation: 'Senior Network Engineer',
      contact_address: 'Dhaka, Bangladesh',
      work_country: 'Bangladesh',
      membership_type: 'Fellow',
      membership_no: 'MEM-090201',
      permanent_country: 'Bangladesh',
      permanent_district: 'Pabna',
      permanent_address: 'Pabna Sadar, Pabna',
      present_country: 'Bangladesh',
      present_district: 'Dhaka',
      present_address: 'Mohakhali DOHS, Dhaka',
      cert_serial_no: 'PUST-EEE-090201',
      cert_photo: 'CertPhoto/11.jpg',
      profile_photo: 'ProfilePhoto/Amir.jpg',
      payment_method: 'Online Payment',
      payment_photo: 'PaymentPhoto/11.jpg',
      passwordHash: bcrypt.hashSync('password123', 10),
      status: 'Active',
      created_at: new Date().toISOString()
    },
    {
      id: 'mem_2',
      full_name: 'Md Zahidul Islam',
      gender: 'Male',
      email: 'zahidul090202@gmail.com',
      contact_number: '+8801700000002',
      blood_group: 'B+',
      facebook: '',
      linkedin: '',
      degree: 'B.Sc in EEE',
      roll_no: '090202',
      department: 'Electrical and Electronic Engineering (EEE)',
      batch_no: '1st',
      hall: 'Bangabandhu Sheikh Mujibur Rahman hall',
      passing_year: '2014',
      grade_cgpa: '3.60',
      organization: 'Banglalink Telecom',
      designation: 'Radio Planning Specialist',
      contact_address: 'Dhaka, Bangladesh',
      work_country: 'Bangladesh',
      membership_type: 'Member',
      membership_no: 'MEM-090202',
      permanent_country: 'Bangladesh',
      permanent_district: 'Rajshahi',
      permanent_address: 'Rajshahi',
      present_country: 'Bangladesh',
      present_district: 'Dhaka',
      present_address: 'Gulshan, Dhaka',
      cert_serial_no: 'PUST-EEE-090202',
      cert_photo: '',
      profile_photo: 'Photo/fahim.png',
      payment_method: 'Online Payment',
      payment_photo: '',
      passwordHash: bcrypt.hashSync('password123', 10),
      status: 'Active',
      created_at: new Date().toISOString()
    },
    {
      id: 'mem_3',
      full_name: 'Md Anisur Rhaman Khan',
      gender: 'Male',
      email: 'anisur090203@gmail.com',
      contact_number: '+8801700000003',
      blood_group: 'O+',
      facebook: '',
      linkedin: '',
      degree: 'B.Sc in EEE',
      roll_no: '090203',
      department: 'Electrical and Electronic Engineering (EEE)',
      batch_no: '1st',
      hall: 'Bangabandhu Sheikh Mujibur Rahman hall',
      passing_year: '2014',
      grade_cgpa: '3.70',
      organization: 'DESCO Ltd.',
      designation: 'Assistant Engineer',
      contact_address: 'Dhaka, Bangladesh',
      work_country: 'Bangladesh',
      membership_type: 'Member',
      membership_no: 'MEM-090203',
      permanent_country: 'Bangladesh',
      permanent_district: 'Bogura',
      permanent_address: 'Bogura Sadar',
      present_country: 'Bangladesh',
      present_district: 'Dhaka',
      present_address: 'Mirpur, Dhaka',
      cert_serial_no: '',
      cert_photo: '',
      profile_photo: 'Photo/fahim.png',
      payment_method: 'Online Payment',
      payment_photo: '',
      passwordHash: bcrypt.hashSync('password123', 10),
      status: 'Active',
      created_at: new Date().toISOString()
    },
    {
      id: 'mem_4',
      full_name: 'Md. Shariful Islam',
      gender: 'Male',
      email: 'shariful090204@gmail.com',
      contact_number: '+8801700000004',
      blood_group: 'AB+',
      facebook: '',
      linkedin: '',
      degree: 'B.Sc in EEE',
      roll_no: '090204',
      department: 'Electrical and Electronic Engineering (EEE)',
      batch_no: '1st',
      hall: 'Bangabandhu Sheikh Mujibur Rahman hall',
      passing_year: '2014',
      grade_cgpa: '3.65',
      organization: 'Power Grid Company of Bangladesh (PGCB)',
      designation: 'Sub-Divisional Engineer',
      contact_address: 'Aftabnagar, Dhaka',
      work_country: 'Bangladesh',
      membership_type: 'Member',
      membership_no: 'MEM-090204',
      permanent_country: 'Bangladesh',
      permanent_district: 'Natore',
      permanent_address: 'Natore Sadar',
      present_country: 'Bangladesh',
      present_district: 'Dhaka',
      present_address: 'Badda, Dhaka',
      cert_serial_no: '',
      cert_photo: '',
      profile_photo: 'Photo/fahim.png',
      payment_method: 'Online Payment',
      payment_photo: '',
      passwordHash: bcrypt.hashSync('password123', 10),
      status: 'Active',
      created_at: new Date().toISOString()
    },
    {
      id: 'mem_5',
      full_name: 'Moynul Islam Navil',
      gender: 'Male',
      email: 'navil090205@gmail.com',
      contact_number: '+8801700000005',
      blood_group: 'B+',
      facebook: '',
      linkedin: '',
      degree: 'B.Sc in EEE',
      roll_no: '090205',
      department: 'Electrical and Electronic Engineering (EEE)',
      batch_no: '1st',
      hall: 'Bangabandhu Sheikh Mujibur Rahman hall',
      passing_year: '2014',
      grade_cgpa: '3.80',
      organization: 'Huawei Technologies',
      designation: 'Solution Architect',
      contact_address: 'Dhaka',
      work_country: 'Bangladesh',
      membership_type: 'Fellow',
      membership_no: 'MEM-090205',
      permanent_country: 'Bangladesh',
      permanent_district: 'Kushtia',
      permanent_address: 'Kushtia',
      present_country: 'Bangladesh',
      present_district: 'Dhaka',
      present_address: 'Banani, Dhaka',
      cert_serial_no: '',
      cert_photo: '',
      profile_photo: 'ProfilePhoto/Navil090205.png',
      payment_method: 'Online Payment',
      payment_photo: '',
      passwordHash: bcrypt.hashSync('password123', 10),
      status: 'Active',
      created_at: new Date().toISOString()
    },
    {
      id: 'mem_6',
      full_name: 'Md.Khosru Siddique',
      gender: 'Male',
      email: 'khosru090206@gmail.com',
      contact_number: '+8801700000006',
      blood_group: 'O+',
      facebook: '',
      linkedin: '',
      degree: 'B.Sc in EEE',
      roll_no: '090206',
      department: 'Electrical and Electronic Engineering (EEE)',
      batch_no: '1st',
      hall: 'Bangabandhu Sheikh Mujibur Rahman hall',
      passing_year: '2014',
      grade_cgpa: '3.55',
      organization: 'Walton Hi-Tech Industries PLC',
      designation: 'R&D Engineer',
      contact_address: 'Gazipur, Bangladesh',
      work_country: 'Bangladesh',
      membership_type: 'Member',
      membership_no: 'MEM-090206',
      permanent_country: 'Bangladesh',
      permanent_district: 'Pabna',
      permanent_address: 'Pabna',
      present_country: 'Bangladesh',
      present_district: 'Gazipur',
      present_address: 'Chandra, Gazipur',
      cert_serial_no: '',
      cert_photo: '',
      profile_photo: 'Photo/fahim.png',
      payment_method: 'Online Payment',
      payment_photo: '',
      passwordHash: bcrypt.hashSync('password123', 10),
      status: 'Active',
      created_at: new Date().toISOString()
    },
    {
      id: 'mem_7',
      full_name: 'Shafiul Azam Hero',
      gender: 'Male',
      email: 'shafiul090207@gmail.com',
      contact_number: '+8801700000007',
      blood_group: 'A+',
      facebook: '',
      linkedin: '',
      degree: 'B.Sc in EEE',
      roll_no: '090207',
      department: 'Electrical and Electronic Engineering (EEE)',
      batch_no: '1st',
      hall: 'Bangabandhu Sheikh Mujibur Rahman hall',
      passing_year: '2014',
      grade_cgpa: '3.72',
      organization: 'Bangladesh Rural Electrification Board (BREB)',
      designation: 'Deputy General Manager',
      contact_address: 'Dhaka',
      work_country: 'Bangladesh',
      membership_type: 'Member',
      membership_no: 'MEM-090207',
      permanent_country: 'Bangladesh',
      permanent_district: 'Sirajganj',
      permanent_address: 'Sirajganj',
      present_country: 'Bangladesh',
      present_district: 'Dhaka',
      present_address: 'Nikunja, Dhaka',
      cert_serial_no: '',
      cert_photo: '',
      profile_photo: 'Photo/fahim.png',
      payment_method: 'Online Payment',
      payment_photo: '',
      passwordHash: bcrypt.hashSync('password123', 10),
      status: 'Active',
      created_at: new Date().toISOString()
    },
    {
      id: 'mem_8',
      full_name: 'Mohd. Abdus Salam',
      gender: 'Male',
      email: 'salam090209@gmail.com',
      contact_number: '+8801700000008',
      blood_group: 'B+',
      facebook: '',
      linkedin: '',
      degree: 'B.Sc in EEE',
      roll_no: '090209',
      department: 'Electrical and Electronic Engineering (EEE)',
      batch_no: '1st',
      hall: 'Bangabandhu Sheikh Mujibur Rahman hall',
      passing_year: '2014',
      grade_cgpa: '3.68',
      organization: 'Energypac Engineering Ltd.',
      designation: 'Project Lead',
      contact_address: 'Tejgaon, Dhaka',
      work_country: 'Bangladesh',
      membership_type: 'Member',
      membership_no: 'MEM-090209',
      permanent_country: 'Bangladesh',
      permanent_district: 'Tangail',
      permanent_address: 'Tangail',
      present_country: 'Bangladesh',
      present_district: 'Dhaka',
      present_address: 'Mohammadpur, Dhaka',
      cert_serial_no: '',
      cert_photo: '',
      profile_photo: 'Photo/fahim.png',
      payment_method: 'Online Payment',
      payment_photo: '',
      passwordHash: bcrypt.hashSync('password123', 10),
      status: 'Active',
      created_at: new Date().toISOString()
    },
    {
      id: 'mem_9',
      full_name: 'Md. Saydur Rahman',
      gender: 'Male',
      email: 'saydur090210@gmail.com',
      contact_number: '+8801700000009',
      blood_group: 'O+',
      facebook: '',
      linkedin: '',
      degree: 'B.Sc in EEE',
      roll_no: '090210',
      department: 'Electrical and Electronic Engineering (EEE)',
      batch_no: '1st',
      hall: 'Bangabandhu Sheikh Mujibur Rahman hall',
      passing_year: '2014',
      grade_cgpa: '3.62',
      organization: 'Grameenphone Ltd.',
      designation: 'System Automation Specialist',
      contact_address: 'GP House, Bashundhara, Dhaka',
      work_country: 'Bangladesh',
      membership_type: 'Member',
      membership_no: 'MEM-090210',
      permanent_country: 'Bangladesh',
      permanent_district: 'Pabna',
      permanent_address: 'Pabna',
      present_country: 'Bangladesh',
      present_district: 'Dhaka',
      present_address: 'Bashundhara R/A, Dhaka',
      cert_serial_no: '',
      cert_photo: '',
      profile_photo: 'Photo/fahim.png',
      payment_method: 'Online Payment',
      payment_photo: '',
      passwordHash: bcrypt.hashSync('password123', 10),
      status: 'Active',
      created_at: new Date().toISOString()
    },
    {
      id: 'mem_10',
      full_name: 'Mohammad Golam Rabbani',
      gender: 'Male',
      email: 'rabbani090211@gmail.com',
      contact_number: '+8801700000010',
      blood_group: 'A+',
      facebook: '',
      linkedin: '',
      degree: 'B.Sc in EEE',
      roll_no: '090211',
      department: 'Electrical and Electronic Engineering (EEE)',
      batch_no: '1st',
      hall: 'Bangabandhu Sheikh Mujibur Rahman hall',
      passing_year: '2014',
      grade_cgpa: '3.88',
      organization: 'Pabna University of Science & Technology',
      designation: 'Assistant Professor (EEE)',
      contact_address: 'PUST Campus, Pabna',
      work_country: 'Bangladesh',
      membership_type: 'Fellow',
      membership_no: 'MEM-090211',
      permanent_country: 'Bangladesh',
      permanent_district: 'Pabna',
      permanent_address: 'Pabna Sadar',
      present_country: 'Bangladesh',
      present_district: 'Pabna',
      present_address: 'PUST Campus, Pabna',
      cert_serial_no: '',
      cert_photo: '',
      profile_photo: 'Photo/fahim.png',
      payment_method: 'Online Payment',
      payment_photo: '',
      passwordHash: bcrypt.hashSync('password123', 10),
      status: 'Active',
      created_at: new Date().toISOString()
    }
  ],
  notices: [
    {
      id: 1,
      title: 'Read Before Apply for Membership',
      file_url: 'NoticeDoc/Instruction.png',
      date: '2023-08-15'
    }
  ],
  downloads: [
    {
      id: 1,
      title: 'Convener Committee',
      file_url: 'DownloadDoc/EEE_PUST_ALUMNI _CONVENER_COMMITTEE_APPROVED.pdf',
      date: '2023-08-15'
    },
    {
      id: 2,
      title: 'Read Before Apply for Membership',
      file_url: 'DownloadDoc/Instruction.png',
      date: '2023-08-15'
    },
    {
      id: 3,
      title: 'Convener Committee Picture',
      file_url: 'DownloadDoc/Convener committee.jpg',
      date: '2023-08-15'
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
  getMemberById: (id) => readDb().members.find(m => String(m.id) === String(id)),
  getMemberByEmail: (email) => {
    if (!email) return null;
    return readDb().members.find(m => m.email.toLowerCase() === email.trim().toLowerCase());
  },
  getMemberByRoll: (roll) => {
    if (!roll) return null;
    return readDb().members.find(m => String(m.roll_no).trim() === String(roll).trim());
  },
  addMember: (memberData) => {
    const db = readDb();
    const id = 'mem_' + Date.now();
    const newMember = {
      id,
      ...memberData,
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
  updateMemberByRoll: (roll, updates) => {
    const db = readDb();
    const idx = db.members.findIndex(m => String(m.roll_no).trim() === String(roll).trim());
    if (idx === -1) return null;
    db.members[idx] = { ...db.members[idx], ...updates, updated_at: new Date().toISOString() };
    writeDb(db);
    return db.members[idx];
  },
  deleteMember: (id) => {
    const db = readDb();
    db.members = db.members.filter(m => String(m.id) !== String(id) && String(m.roll_no) !== String(id));
    writeDb(db);
    return true;
  },

  // Admin
  getAdminByUsername: (username) => {
    if (!username) return null;
    return readDb().admins.find(a => a.username.toLowerCase() === username.trim().toLowerCase());
  },
  updateAdminPassword: (username, newHash) => {
    const db = readDb();
    const admin = db.admins.find(a => a.username.toLowerCase() === username.trim().toLowerCase());
    if (admin) {
      admin.passwordHash = newHash;
      writeDb(db);
      return true;
    }
    return false;
  },

  // Notices
  getNotices: () => readDb().notices,
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
  getDownloads: () => readDb().downloads,
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
  }
};
