#!/usr/bin/env node

/**
 * Untitled UI Helper CLI
 * Quick component discovery and installation helper
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class UIHelper {
  constructor() {
    this.catalogPath = path.join(__dirname, '..', 'src', 'lib', 'untitled-ui', 'catalog.json');
  }

  async loadCatalog() {
    try {
      const catalogData = await fs.readFile(this.catalogPath, 'utf-8');
      return JSON.parse(catalogData);
    } catch (error) {
      console.error('❌ Could not load catalog. Run npm run scrape-ui first.');
      process.exit(1);
    }
  }

  async search(query) {
    const catalog = await this.loadCatalog();
    const lowerQuery = query.toLowerCase();
    
    const results = Object.values(catalog.components).filter(component =>
      component.name.toLowerCase().includes(lowerQuery) ||
      component.description.toLowerCase().includes(lowerQuery) ||
      component.category.toLowerCase().includes(lowerQuery) ||
      component.variants.some(variant => variant.toLowerCase().includes(lowerQuery))
    );

    if (results.length === 0) {
      console.log(`🔍 No components found for "${query}"`);
      return;
    }

    console.log(`🎯 Found ${results.length} component(s) for "${query}":\n`);
    results.forEach(comp => {
      console.log(`📦 ${comp.name} (${comp.category})`);
      console.log(`   ${comp.description}`);
      console.log(`   Install: ${comp.installation.cli}`);
      console.log(`   Variants: ${comp.variants.join(', ')}`);
      console.log(`   Docs: ${comp.documentation}\n`);
    });
  }

  async list(category = null) {
    const catalog = await this.loadCatalog();
    
    if (category) {
      const categoryComponents = catalog.categories[category];
      if (!categoryComponents) {
        console.log(`❌ Category "${category}" not found.`);
        console.log(`Available categories: ${Object.keys(catalog.categories).join(', ')}`);
        return;
      }
      
      console.log(`📂 ${category.toUpperCase()} Components:\n`);
      categoryComponents.forEach(comp => {
        console.log(`  📦 ${comp.name} - ${comp.description}`);
        console.log(`     ${comp.installation.cli}`);
      });
    } else {
      console.log(`📚 All Categories (${catalog.metadata.totalComponents} components):\n`);
      Object.entries(catalog.categories).forEach(([catName, components]) => {
        console.log(`📂 ${catName.toUpperCase()} (${components.length} components)`);
        components.forEach(comp => {
          console.log(`  📦 ${comp.name}`);
        });
        console.log('');
      });
    }
  }

  async install(componentName) {
    const catalog = await this.loadCatalog();
    const component = catalog.components[componentName];
    
    if (!component) {
      console.log(`❌ Component "${componentName}" not found.`);
      console.log('Use "npm run ui search <query>" to find components.');
      return;
    }

    console.log(`🚀 Installing ${componentName}...`);
    console.log(`Command: ${component.installation.cli}`);
    console.log(`\nComponent Info:`);
    console.log(`  Description: ${component.description}`);
    console.log(`  Category: ${component.category}`);
    console.log(`  Variants: ${component.variants.join(', ')}`);
    console.log(`  Dependencies: ${component.dependencies.join(', ')}`);
    console.log(`  Documentation: ${component.documentation}`);
  }

  async info(componentName) {
    const catalog = await this.loadCatalog();
    const component = catalog.components[componentName];
    
    if (!component) {
      console.log(`❌ Component "${componentName}" not found.`);
      return;
    }

    console.log(`📦 ${component.name.toUpperCase()}\n`);
    console.log(`Description: ${component.description}`);
    console.log(`Category: ${component.category}`);
    console.log(`Install: ${component.installation.cli}`);
    console.log(`Documentation: ${component.documentation}`);
    console.log(`Dependencies: ${component.dependencies.join(', ')}`);
    
    if (component.variants.length > 0) {
      console.log(`\nVariants:`);
      component.variants.forEach(variant => console.log(`  • ${variant}`));
    }

    if (Object.keys(component.props).length > 0) {
      console.log(`\nProps:`);
      Object.entries(component.props).forEach(([prop, type]) => {
        console.log(`  • ${prop}: ${type}`);
      });
    }
  }

  showHelp() {
    console.log(`
🎨 Untitled UI Helper CLI

Usage:
  npm run ui <command> [args]

Commands:
  search <query>     Search for components by name, description, or category
  list [category]    List all components or components in a specific category  
  install <name>     Show installation info for a component
  info <name>        Show detailed information about a component
  help              Show this help message

Examples:
  npm run ui search button
  npm run ui list inputs
  npm run ui install button
  npm run ui info button

Categories: buttons, inputs, avatars, navigation, feedback, overlays, layout, data-display, forms
`);
  }

  async run() {
    const args = process.argv.slice(2);
    const command = args[0];

    switch (command) {
      case 'search':
        if (!args[1]) {
          console.log('❌ Please provide a search query');
          console.log('Usage: npm run ui search <query>');
          return;
        }
        await this.search(args[1]);
        break;
        
      case 'list':
        await this.list(args[1]);
        break;
        
      case 'install':
        if (!args[1]) {
          console.log('❌ Please provide a component name');
          console.log('Usage: npm run ui install <component-name>');
          return;
        }
        await this.install(args[1]);
        break;
        
      case 'info':
        if (!args[1]) {
          console.log('❌ Please provide a component name');
          console.log('Usage: npm run ui info <component-name>');
          return;
        }
        await this.info(args[1]);
        break;
        
      case 'help':
      default:
        this.showHelp();
        break;
    }
  }
}

const helper = new UIHelper();
helper.run();