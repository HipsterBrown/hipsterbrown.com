const fs = require('fs');
const path = require('path');

const TRAINING_DATA_DIR = 'training-data';
const PROJECTS_DIR = 'projects';

const DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})-/;

function extractDateFromFilename(filename) {
  const match = filename.match(DATE_REGEX);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}T00:00:00.000Z`;
  }
  return null;
}

function addDateToFrontMatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const filename = path.basename(filePath);
  
  const dateFromFilename = extractDateFromFilename(filename);
  if (!dateFromFilename) {
    console.log(`⚠️  No date found in filename: ${filename}`);
    return false;
  }

  // Check if date already exists in front matter
  if (content.includes('date:')) {
    console.log(`⏭️  Date already exists: ${filename}`);
    return false;
  }

  // Find front matter delimiters
  const lines = content.split('\n');
  let frontMatterStartIndex = -1;
  let frontMatterEndIndex = -1;
  
  // First line should be --- for YAML front matter
  if (lines[0].trim() === '---') {
    frontMatterStartIndex = 0;
  } else {
    console.log(`❌ No front matter start found: ${filename}`);
    return false;
  }

  // Find the closing ---
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      frontMatterEndIndex = i;
      break;
    }
  }

  if (frontMatterEndIndex === -1) {
    console.log(`❌ No front matter end found: ${filename}`);
    return false;
  }

  // Insert date after draft field (or after opening --- if no draft)
  let insertIndex = 1;
  for (let i = 1; i < frontMatterEndIndex; i++) {
    if (lines[i].startsWith('draft:')) {
      insertIndex = i + 1;
      break;
    }
  }

  // Insert the date line
  lines.splice(insertIndex, 0, `date: ${dateFromFilename}`);
  
  const newContent = lines.join('\n');
  fs.writeFileSync(filePath, newContent);
  
  console.log(`✅ Added date to: ${filename} (${dateFromFilename})`);
  return true;
}

function migrateDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Directory not found: ${dir}`);
    return;
  }

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  
  console.log(`\n📁 Migrating ${dir} (${files.length} files)...`);
  
  let migrated = 0;
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (addDateToFrontMatter(filePath)) {
      migrated++;
    }
  });
  
  console.log(`   Migrated: ${migrated} files`);
}

// Run migration
console.log('🚀 Starting date migration...\n');

migrateDirectory(TRAINING_DATA_DIR);
migrateDirectory(PROJECTS_DIR);

console.log('\n✨ Migration complete!');
