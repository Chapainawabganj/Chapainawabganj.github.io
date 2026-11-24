const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const db = require('./data/db');

const ROOT_DIR = path.join(__dirname, '.');
const DOCS_DIR = path.join(__dirname, 'docs');
const VIEWS_DIR = path.join(__dirname, 'views');
const PUBLIC_DIR = path.join(__dirname, 'public');

// Ensure output directories exist
if (!fs.existsSync(DOCS_DIR)) {
  fs.mkdirSync(DOCS_DIR, { recursive: true });
}

// Helper to copy directory recursively
function copyDirSync(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copy public assets to both root and docs/
console.log('Copying public assets to root and docs/...');
copyDirSync(PUBLIC_DIR, ROOT_DIR);
copyDirSync(PUBLIC_DIR, DOCS_DIR);

// Create .nojekyll for GitHub Pages
fs.writeFileSync(path.join(ROOT_DIR, '.nojekyll'), '');
fs.writeFileSync(path.join(DOCS_DIR, '.nojekyll'), '');

// Post-process HTML for GitHub Pages static compatibility
function transformForGitHubPages(html) {
  return html
    // Transform asset URLs from absolute to relative
    .replace(/(src|href)=["']\/CSS\//g, '$1="CSS/')
    .replace(/(src|href)=["']\/Photo\//g, '$1="Photo/')
    .replace(/(src|href)=["']\/ProfilePhoto\//g, '$1="ProfilePhoto/')
    .replace(/(src|href)=["']\/DownloadDoc\//g, '$1="DownloadDoc/')
    .replace(/(src|href)=["']\/NoticeDoc\//g, '$1="NoticeDoc/')
    .replace(/(src|href)=["']\/uploads\//g, '$1="uploads/')
    .replace(/(src|href)=["']\/CertPhoto\//g, '$1="CertPhoto/')
    .replace(/(src|href)=["']\/PaymentPhoto\//g, '$1="PaymentPhoto/')
    .replace(/(src|href)=["']\/DataTables\//g, '$1="DataTables/')

    // Specific anchors & queries
    .replace(/(href|action)=["']\/student_support\.aspx#mess["']/g, '$1="student_support.html#mess"')
    .replace(/(href|action)=["']\/student_support#mess["']/g, '$1="student_support.html#mess"')

    // Route mappings with optional query strings/hashes
    .replace(/(href|action)=["']\/(home|home\.aspx)?["']/g, '$1="index.html"')
    .replace(/(href|action)=["']\/about(\.aspx)?([?#][^"']*)?["']/g, '$1="about.html$3"')
    .replace(/(href|action)=["']\/(alumnilist|students)(\.aspx)?([?#][^"']*)?["']/g, '$1="alumnilist.html$4"')
    .replace(/(href|action)=["']\/(blood_donation|blood)(\.aspx)?([?#][^"']*)?["']/g, '$1="blood_donation.html$4"')
    .replace(/(href|action)=["']\/(student_support|support)(\.aspx)?([?#][^"']*)?["']/g, '$1="student_support.html$4"')
    .replace(/(href|action)=["']\/committee(\.aspx)?([?#][^"']*)?["']/g, '$1="committee.html$3"')
    .replace(/(href|action)=["']\/notice(\.aspx)?([?#][^"']*)?["']/g, '$1="notice.html$3"')
    .replace(/(href|action)=["']\/download(\.aspx)?([?#][^"']*)?["']/g, '$1="download.html$3"')
    .replace(/(href|action)=["']\/contact(\.aspx)?([?#][^"']*)?["']/g, '$1="contact.html$3"')
    .replace(/(href|action)=["']\/registration(\.aspx)?([?#][^"']*)?["']/g, '$1="registration.html$3"')
    .replace(/(href|action)=["']\/registration_confirmation(\.aspx)?([?#][^"']*)?["']/g, '$1="registration_confirmation.html$3"')
    .replace(/(href|action)=["']\/login(\.aspx)?([?#][^"']*)?["']/g, '$1="login.html$3"')
    .replace(/(href|action)=["']\/adminlogin(\.aspx)?([?#][^"']*)?["']/g, '$1="adminlogin.html$3"')
    .replace(/(href|action)=["']\/my_profile(\.aspx)?([?#][^"']*)?["']/g, '$1="my_profile.html$3"')
    .replace(/(href|action)=["']\/membermanagement(\.aspx)?([?#][^"']*)?["']/g, '$1="membermanagement.html$3"')
    .replace(/(href|action)=["']\/admin_update_member(\.aspx)?([?#][^"']*)?["']/g, '$1="admin_update_member.html$3"')
    .replace(/(href|action)=["']\/admin_content(\.aspx)?([?#][^"']*)?["']/g, '$1="admin_content.html$3"')
    .replace(/(href|action)=["']\/logout(\.aspx)?["']/g, '$1="index.html"')

    // Any remaining /page.aspx with optional queries/hashes
    .replace(/(href|action)=["']\/([a-zA-Z0-9_-]+)\.aspx([?#][^"']*)?["']/g, '$1="$2.html$3"');
}

// Default data for views
const defaultData = {
  currentUser: {
    id: 'std_1',
    student_id: '200101',
    full_name: 'Md. Al-Emran',
    email: 'emran.cse@s.pust.ac.bd',
    profile_photo: 'Photo/fahim.png',
    status: 'Active'
  },
  currentAdmin: {
    username: 'admin',
    name: 'Central Administrator',
    role: 'admin'
  },
  success_msg: null,
  error_msg: null
};

// Pages to compile
const pages = [
  {
    template: 'index.ejs',
    output: 'index.html',
    data: { title: 'হোম', activePage: 'home' }
  },
  {
    template: 'about.ejs',
    output: 'about.html',
    data: { title: 'পরিচিতি ও ইতিহাস', activePage: 'about' }
  },
  {
    template: 'alumnilist.ejs',
    output: 'alumnilist.html',
    data: {
      title: 'শিক্ষার্থী ও সদস্য তালিকা',
      activePage: 'alumnilist',
      members: db.getActiveMembers(),
      query: '',
      selectedUpazila: 'All'
    }
  },
  {
    template: 'blood_donation.ejs',
    output: 'blood_donation.html',
    data: {
      title: 'জরুরি রক্তদান নেটওয়ার্ক',
      activePage: 'blood',
      donors: db.getBloodDonors(),
      selectedGroup: 'All'
    }
  },
  {
    template: 'student_support.ejs',
    output: 'student_support.html',
    data: {
      title: 'শিক্ষার্থী সহায়তা ও কল্যাণ',
      activePage: 'support',
      services: db.getSupportServices()
    }
  },
  {
    template: 'committee.ejs',
    output: 'committee.html',
    data: {
      title: 'কার্যনির্বাহী কমিটি',
      activePage: 'committee',
      committee: db.getCommittee()
    }
  },
  {
    template: 'download.ejs',
    output: 'download.html',
    data: {
      title: 'ডাউনলোড ও ডকুমেন্টস',
      activePage: 'download',
      downloads: db.getDownloads()
    }
  },
  {
    template: 'notice.ejs',
    output: 'notice.html',
    data: {
      title: 'নোটিশ বোর্ড',
      activePage: 'notice',
      notices: db.getNotices()
    }
  },
  {
    template: 'contact.ejs',
    output: 'contact.html',
    data: {
      title: 'যোগাযোগ ও সহায়তা',
      activePage: 'contact'
    }
  },
  {
    template: 'registration.ejs',
    output: 'registration.html',
    data: {
      title: 'সদস্য নিবন্ধন',
      activePage: 'registration'
    }
  },
  {
    template: 'registration_confirmation.ejs',
    output: 'registration_confirmation.html',
    data: {
      title: 'নিবন্ধন নিশ্চিতকরণ',
      activePage: 'registration',
      student: db.getActiveMembers()[0] || {
        full_name: 'Md. Al-Emran',
        department: 'Computer Science and Engineering (CSE)',
        session: '2020-21',
        student_id: '200101',
        upazila: 'Shibganj',
        blood_group: 'B+',
        contact_number: '+8801712345678',
        email: 'emran.cse@s.pust.ac.bd',
        present_address: 'Bangabandhu Sheikh Mujibur Rahman Hall, Room 412, PUST',
        is_blood_donor: true,
        profile_photo: 'Photo/fahim.png',
        created_at: new Date().toISOString()
      }
    }
  },
  {
    template: 'login.ejs',
    output: 'login.html',
    data: {
      title: 'সদস্য লগইন',
      activePage: 'login'
    }
  },
  {
    template: 'adminlogin.ejs',
    output: 'adminlogin.html',
    data: {
      title: 'অ্যাডমিন লগইন',
      activePage: 'adminlogin'
    }
  },
  {
    template: 'my_profile.ejs',
    output: 'my_profile.html',
    data: {
      title: 'আমার প্রোফাইল ও আইডি কার্ড',
      activePage: 'profile',
      member: db.getActiveMembers()[0]
    }
  },
  {
    template: 'membermanagement.ejs',
    output: 'membermanagement.html',
    data: {
      title: 'শিক্ষার্থী ভেরিফিকেশন ও ব্যবস্থাপনা',
      activePage: 'admin',
      members: db.getMembers()
    }
  },
  {
    template: 'admin_update_member.ejs',
    output: 'admin_update_member.html',
    data: {
      title: 'শিক্ষার্থী তথ্য আপডেট',
      activePage: 'admin',
      member: db.getActiveMembers()[0],
      searchedRoll: '200101'
    }
  },
  {
    template: 'admin_content.ejs',
    output: 'admin_content.html',
    data: {
      title: 'নোটিশ ও ডকুমেন্টস ব্যবস্থাপনা',
      activePage: 'admin',
      notices: db.getNotices(),
      downloads: db.getDownloads()
    }
  }
];

// Compile each page
console.log('Rendering EJS pages to static HTML...');
for (const p of pages) {
  const tplPath = path.join(VIEWS_DIR, p.template);
  if (!fs.existsSync(tplPath)) {
    console.warn(`Template not found: ${tplPath}`);
    continue;
  }
  const viewData = Object.assign({}, defaultData, p.data);
  ejs.renderFile(tplPath, viewData, { root: VIEWS_DIR }, (err, str) => {
    if (err) {
      console.error(`Error rendering ${p.template}:`, err);
      process.exit(1);
    }
    const transformed = transformForGitHubPages(str);
    
    // Write to root
    fs.writeFileSync(path.join(ROOT_DIR, p.output), transformed, 'utf8');
    // Write to docs/
    fs.writeFileSync(path.join(DOCS_DIR, p.output), transformed, 'utf8');

    console.log(`✓ Generated ${p.output} (in root and docs/)`);
  });
}

// 404 page
const notFoundHtml = `<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>404 - পৃষ্ঠাটি পাওয়া যায়নি | পাবিপ্রবি চাঁপাইনবাবগঞ্জ জেলা সমিতি</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="CSS/customstylesheet.css" />
</head>
<body class="bg-light d-flex align-items-center justify-content-center" style="min-height: 100vh;">
    <div class="text-center p-4">
        <h1 class="display-3 font-weight-bold text-danger">404</h1>
        <h3 class="font-weight-bold text-dark mb-3">অনুরোধকৃত পেজটি পাওয়া যায়নি</h3>
        <p class="text-muted mb-4">পাবনা বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়স্থ চাঁপাইনবাবগঞ্জ জেলা সমিতি পোর্টাল</p>
        <a href="index.html" class="btn btn-primary font-weight-bold px-4">হোমে ফিরে যান</a>
    </div>
</body>
</html>`;
fs.writeFileSync(path.join(ROOT_DIR, '404.html'), notFoundHtml, 'utf8');
fs.writeFileSync(path.join(DOCS_DIR, '404.html'), notFoundHtml, 'utf8');
console.log('✓ Generated 404.html (in root and docs/)');

console.log('\nProduction build successfully completed for GitHub Pages!');
