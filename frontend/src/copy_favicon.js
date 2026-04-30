import fs from 'fs';
import path from 'path';

const source = 'C:\\Users\\CHIRAG PRAJAPAT\\.gemini\\antigravity\\brain\\55c5d0a6-3948-4f12-8db6-ad0510a83af5\\traviora_favicon_1777536246262.png';
const target = 'c:\\Users\\CHIRAG PRAJAPAT\\Desktop\\hackathon\\traviora\\frontend\\public\\favicon.png';

try {
  fs.copyFileSync(source, target);
  console.log('Favicon copied successfully!');
} catch (err) {
  console.error('Error copying favicon:', err);
}
