import fs from 'fs';
import path from 'path';

const DOCS_DIR = path.resolve(process.cwd(), 'docs');
const RESERVED_FILES = new Set(['index.md', 'log.md']);
const REQUIRED_FRONTMATTER_KEYS = ['type', 'title', 'description', 'lifecycle'];

interface ValidationResult {
  file: string;
  errors: string[];
}

function parseFrontmatter(content: string): { frontmatter: Record<string, string>; body: string } | null {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return null;

  const rawYaml = match[1];
  const body = match[2];
  const frontmatter: Record<string, string> = {};

  for (const line of rawYaml.split(/\r?\n/)) {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0 && !line.startsWith(' ') && !line.startsWith('-')) {
      const key = line.slice(0, colonIdx).trim();
      const val = line.slice(colonIdx + 1).trim();
      frontmatter[key] = val;
    }
  }

  return { frontmatter, body };
}

function validateOKF(): void {
  console.log('🔍 Validating OKF v0.2 Knowledge Bundle in docs/...\n');

  if (!fs.existsSync(DOCS_DIR)) {
    console.error('❌ Error: docs/ directory does not exist.');
    process.exit(1);
  }

  const files = fs.readdirSync(DOCS_DIR).filter(f => f.endsWith('.md'));
  const conceptFiles = files.filter(f => !RESERVED_FILES.has(f));
  const results: ValidationResult[] = [];

  // Check required reserved files
  for (const reserved of RESERVED_FILES) {
    const reservedPath = path.join(DOCS_DIR, reserved);
    if (!fs.existsSync(reservedPath)) {
      results.push({
        file: reserved,
        errors: [`Missing required reserved file: ${reserved}`],
      });
    }
  }

  const indexContent = fs.existsSync(path.join(DOCS_DIR, 'index.md'))
    ? fs.readFileSync(path.join(DOCS_DIR, 'index.md'), 'utf-8')
    : '';

  // Validate each concept document
  for (const file of conceptFiles) {
    const filePath = path.join(DOCS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const errors: string[] = [];

    const parsed = parseFrontmatter(content);
    if (!parsed) {
      errors.push('Missing or malformed YAML frontmatter block (must be bounded by ---).');
    } else {
      for (const requiredKey of REQUIRED_FRONTMATTER_KEYS) {
        if (!parsed.frontmatter[requiredKey]) {
          errors.push(`Missing required frontmatter key: "${requiredKey}".`);
        }
      }
    }

    // Verify presence in index.md
    if (!indexContent.includes(file)) {
      errors.push(`Not registered or linked in docs/index.md.`);
    }

    // Verify relative markdown links within the document
    const linkRegex = /\[.*?\]\((?!https?:\/\/|#|mailto:)(.*?)\)/g;
    let match;
    while ((match = linkRegex.exec(content)) !== null) {
      const linkTarget = match[1].split('#')[0].split('?')[0].trim();
      if (linkTarget) {
        const resolvedPath = path.resolve(path.dirname(filePath), linkTarget);
        if (!fs.existsSync(resolvedPath)) {
          errors.push(`Broken internal relative link to: "${linkTarget}".`);
        }
      }
    }

    if (errors.length > 0) {
      results.push({ file, errors });
    }
  }

  // Output summary
  if (results.length > 0) {
    console.error('❌ OKF Validation Failed:');
    for (const r of results) {
      console.error(`\n📄 docs/${r.file}:`);
      for (const err of r.errors) {
        console.error(`   - ${err}`);
      }
    }
    process.exit(1);
  } else {
    console.log(`✅ OKF Bundle Validated Successfully!`);
    console.log(`   - Verified ${conceptFiles.length} concepts.`);
    console.log(`   - Confirmed index.md and log.md presence.`);
    console.log(`   - Verified zero broken internal links.`);
  }
}

validateOKF();
