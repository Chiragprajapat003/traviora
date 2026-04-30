import fs from 'fs';

const source = 'C:\\Users\\CHIRAG PRAJAPAT\\.gemini\\antigravity\\brain\\55c5d0a6-3948-4f12-8db6-ad0510a83af5\\traviora_globe_favicon_1777542572908.png';
const target = 'c:\\Users\\CHIRAG PRAJAPAT\\Desktop\\hackathon\\traviora\\frontend\\public\\favicon.png';

try {
  fs.copyFileSync(source, target);
  console.log('✅ Success: New Globe Favicon copied to public folder.');
} catch (err) {
  console.error('❌ Error: Could not copy file. You may need to copy it manually.', err.message);
}
