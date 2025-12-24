#!/usr/bin/env node

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

console.log('🔍 Verifying production build...\n');

let hasErrors = false;

// Check 1: Dist directory exists
console.log('✓ Checking build output directory...');
const distPath = join(projectRoot, 'dist');
if (!existsSync(distPath)) {
  console.error('❌ dist/ directory not found. Run `npm run build` first.');
  process.exit(1);
}
console.log('  ✓ dist/ directory exists\n');

// Check 2: index.html exists
console.log('✓ Checking index.html...');
const indexPath = join(distPath, 'index.html');
if (!existsSync(indexPath)) {
  console.error('❌ dist/index.html not found');
  hasErrors = true;
} else {
  console.log('  ✓ index.html exists\n');
}

// Check 3: Verify environment variables are not hardcoded
console.log('✓ Checking for hardcoded values...');
if (existsSync(indexPath)) {
  const indexContent = readFileSync(indexPath, 'utf-8');

  const warnings = [];

  // Check for specific project ID (should use env var)
  if (indexContent.includes('qmnybnnmoyvpytjhnmfe') && !indexContent.includes('VITE_')) {
    warnings.push('⚠️  Supabase project ID might be hardcoded');
  }

  // Check for localhost references
  if (indexContent.includes('localhost') || indexContent.includes('127.0.0.1')) {
    warnings.push('⚠️  localhost reference found in build');
  }

  if (warnings.length > 0) {
    console.log('  Warnings:');
    warnings.forEach(w => console.log(`  ${w}`));
    console.log();
  } else {
    console.log('  ✓ No obvious hardcoded values found\n');
  }
}

// Check 4: Verify assets directory
console.log('✓ Checking assets...');
const assetsPath = join(distPath, 'assets');
if (!existsSync(assetsPath)) {
  console.error('❌ dist/assets/ directory not found');
  hasErrors = true;
} else {
  console.log('  ✓ assets/ directory exists\n');
}

// Check 5: Read and display environment variable requirements
console.log('✓ Required environment variables for Vercel:\n');
const envExamplePath = join(projectRoot, '.env.example');
if (existsSync(envExamplePath)) {
  const envContent = readFileSync(envExamplePath, 'utf-8');
  const envVars = envContent
    .split('\n')
    .filter(line => line.trim() && !line.startsWith('#'))
    .map(line => line.split('=')[0]);

  if (envVars.length > 0) {
    console.log('  Make sure these are set in Vercel dashboard:');
    envVars.forEach(varName => {
      console.log(`    • ${varName}`);
    });
    console.log();
  }
}

// Summary
console.log('━'.repeat(60));
if (hasErrors) {
  console.log('❌ Build verification failed. Please fix the errors above.');
  process.exit(1);
} else {
  console.log('✅ Build verification passed!');
  console.log('\n📦 Your project is ready for Vercel deployment.');
  console.log('\nNext steps:');
  console.log('  1. Push your code to GitHub/GitLab/Bitbucket');
  console.log('  2. Import the project in Vercel dashboard');
  console.log('  3. Set environment variables from .env.example');
  console.log('  4. Deploy!');
}
console.log('━'.repeat(60));
