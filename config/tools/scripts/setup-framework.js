#!/usr/bin/env node

/**
 * Framework Setup Script
 * Choose between Astro and Next.js for the marketing website
 */

import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('🚀 NextWork Marketing Website - Framework Setup');
console.log('===============================================\n');

console.log('Available frameworks:');
console.log('1. Astro (Recommended for marketing sites)');
console.log('   - Static-first architecture');
console.log('   - Superior SEO and performance');
console.log('   - Component framework agnostic\n');

console.log('2. Next.js (Great for interactive apps)');
console.log('   - React-based');
console.log('   - Full-stack capabilities');
console.log('   - Large ecosystem\n');

rl.question('Which framework would you like to use? (1 for Astro, 2 for Next.js): ', (answer) => {
  const choice = answer.trim();
  
  if (choice === '1') {
    console.log('\n✅ Setting up Astro...');
    setupAstro();
  } else if (choice === '2') {
    console.log('\n✅ Setting up Next.js...');
    setupNextJS();
  } else {
    console.log('\n❌ Invalid choice. Please run the script again and choose 1 or 2.');
    process.exit(1);
  }
  
  rl.close();
});

function setupAstro() {
  try {
    // Install Astro dependencies
    console.log('📦 Installing Astro dependencies...');
    execSync('pnpm add astro @astrojs/react @astrojs/tailwind @astrojs/image @astrojs/sitemap @astrojs/rss', { stdio: 'inherit' });
    
    // Update package.json scripts
    updatePackageJsonForAstro();
    
    console.log('✅ Astro setup complete!');
    console.log('Run "pnpm dev" to start development');
  } catch (error) {
    console.error('❌ Error setting up Astro:', error.message);
    process.exit(1);
  }
}

function setupNextJS() {
  try {
    // Install Next.js dependencies
    console.log('📦 Installing Next.js dependencies...');
    execSync('pnpm add next react react-dom @next/bundle-analyzer', { stdio: 'inherit' });
    
    // Update package.json scripts
    updatePackageJsonForNextJS();
    
    console.log('✅ Next.js setup complete!');
    console.log('Run "pnpm dev" to start development');
  } catch (error) {
    console.error('❌ Error setting up Next.js:', error.message);
    process.exit(1);
  }
}

function updatePackageJsonForAstro() {
  const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
  
  packageJson.scripts.build = 'astro build';
  packageJson.scripts.dev = 'astro dev';
  packageJson.scripts.start = 'astro preview';
  packageJson.scripts.preview = 'astro preview';
  packageJson.scripts['astro:add'] = 'astro add';
  packageJson.scripts['astro:check'] = 'astro check';
  
  writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
  console.log('📝 Updated package.json scripts for Astro');
}

function updatePackageJsonForNextJS() {
  const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
  
  packageJson.scripts.build = 'next build';
  packageJson.scripts.dev = 'next dev';
  packageJson.scripts.start = 'next start';
  packageJson.scripts.preview = 'next start';
  packageJson.scripts['next:lint'] = 'next lint';
  
  writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
  console.log('📝 Updated package.json scripts for Next.js');
}