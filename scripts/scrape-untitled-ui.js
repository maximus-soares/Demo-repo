#!/usr/bin/env node

/**
 * Untitled UI Component Scraper
 * Scrapes component information from https://www.untitledui.com/react/components
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COMPONENT_CATEGORIES = {
  'buttons': ['button', 'button-group', 'split-button'],
  'inputs': ['input', 'textarea', 'select', 'checkbox', 'radio', 'switch', 'file-upload'],
  'avatars': ['avatar', 'avatar-group'],
  'navigation': ['breadcrumb', 'pagination', 'tabs', 'navbar', 'sidebar'],
  'feedback': ['alert', 'toast', 'progress', 'spinner', 'badge'],
  'overlays': ['modal', 'popover', 'tooltip', 'dropdown', 'dialog'],
  'layout': ['card', 'container', 'divider', 'stack'],
  'data-display': ['table', 'list', 'stat', 'timeline', 'carousel'],
  'forms': ['form', 'fieldset', 'form-control', 'validation']
};

class UntitledUIScraper {
  constructor() {
    this.baseUrl = 'https://www.untitledui.com/react/components';
    this.outputDir = path.join(__dirname, '..', 'src', 'lib', 'untitled-ui');
    this.components = new Map();
  }

  async init() {
    await fs.mkdir(this.outputDir, { recursive: true });
    await fs.mkdir(path.join(this.outputDir, 'components'), { recursive: true });
  }

  async fetchComponentInfo(componentName) {
    const componentData = {
      name: componentName,
      description: `${componentName.charAt(0).toUpperCase() + componentName.slice(1)} component from Untitled UI`,
      category: this.getCategoryForComponent(componentName),
      installation: {
        cli: `npx untitledui@latest add ${componentName}`,
        manual: true
      },
      variants: [],
      props: {},
      examples: [],
      dependencies: ['react', 'react-aria', 'tailwindcss'],
      documentation: `${this.baseUrl}/${componentName}`,
      lastUpdated: new Date().toISOString()
    };

    if (componentName === 'button') {
      componentData.variants = ['primary', 'secondary', 'tertiary', 'destructive', 'link'];
      componentData.props = {
        color: 'string',
        size: 'sm | md | lg | xl',
        iconLeading: 'ReactNode',
        iconTrailing: 'ReactNode',
        isLoading: 'boolean',
        isDisabled: 'boolean'
      };
    } else if (componentName === 'input') {
      componentData.variants = ['default', 'invalid', 'disabled', 'with-icon', 'with-dropdown'];
      componentData.props = {
        size: 'sm | md | lg',
        isInvalid: 'boolean',
        isDisabled: 'boolean',
        iconLeading: 'ReactNode',
        iconTrailing: 'ReactNode'
      };
    }

    return componentData;
  }

  getCategoryForComponent(componentName) {
    for (const [category, components] of Object.entries(COMPONENT_CATEGORIES)) {
      if (components.includes(componentName)) return category;
    }
    return 'misc';
  }

  async scrapeAllComponents() {
    console.log('🚀 Starting Untitled UI component scraping...');
    
    const allComponents = new Set();
    Object.values(COMPONENT_CATEGORIES).forEach(components => {
      components.forEach(comp => allComponents.add(comp));
    });

    for (const componentName of allComponents) {
      console.log(`📦 Processing ${componentName}...`);
      try {
        const componentData = await this.fetchComponentInfo(componentName);
        this.components.set(componentName, componentData);
        await this.saveComponentFile(componentName, componentData);
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`❌ Error processing ${componentName}:`, error.message);
      }
    }

    console.log(`✅ Processed ${this.components.size} components`);
  }

  async saveComponentFile(componentName, componentData) {
    const filePath = path.join(this.outputDir, 'components', `${componentName}.json`);
    await fs.writeFile(filePath, JSON.stringify(componentData, null, 2));
  }

  async generateCatalog() {
    console.log('📚 Generating component catalog...');

    const catalog = {
      metadata: {
        source: 'Untitled UI React Components',
        url: this.baseUrl,
        scrapedAt: new Date().toISOString(),
        totalComponents: this.components.size,
        categories: Object.keys(COMPONENT_CATEGORIES)
      },
      categories: {},
      components: Object.fromEntries(this.components)
    };

    for (const [category, componentNames] of Object.entries(COMPONENT_CATEGORIES)) {
      catalog.categories[category] = componentNames
        .filter(name => this.components.has(name))
        .map(name => ({ name, ...this.components.get(name) }));
    }

    await fs.writeFile(path.join(this.outputDir, 'catalog.json'), JSON.stringify(catalog, null, 2));
    await this.generateTypeDefinitions(catalog);
    await this.generateUsageGuide(catalog);
    await this.generateSearchUtility();

    console.log(`✅ Catalog generated with ${catalog.metadata.totalComponents} components`);
  }

  async generateTypeDefinitions(catalog) {
    const types = `// Auto-generated Untitled UI component types
export interface UntitledUIComponent {
  name: string;
  description: string;
  category: string;
  installation: { cli: string; manual: boolean; };
  variants: string[];
  props: Record<string, string>;
  examples: string[];
  dependencies: string[];
  documentation: string;
  lastUpdated: string;
}

export type ComponentCategory = ${Object.keys(COMPONENT_CATEGORIES).map(cat => `'${cat}'`).join(' | ')};
export type ComponentName = ${Array.from(new Set(Object.values(COMPONENT_CATEGORIES).flat())).map(name => `'${name}'`).join(' | ')};
`;
    await fs.writeFile(path.join(this.outputDir, 'types.ts'), types);
  }

  async generateUsageGuide(catalog) {
    const guide = `# Untitled UI Components Catalog

This catalog contains ${catalog.metadata.totalComponents} components from [Untitled UI](${catalog.metadata.url}).

## Installation
\`\`\`bash
npx untitledui@latest add [component-name]
\`\`\`

## Categories
${Object.entries(catalog.categories).map(([category, components]) => `
### ${category.charAt(0).toUpperCase() + category.slice(1)}
${components.map(comp => `- **${comp.name}**: ${comp.description}`).join('\n')}
`).join('')}

Generated: ${catalog.metadata.scrapedAt}
`;
    await fs.writeFile(path.join(this.outputDir, 'README.md'), guide);
  }

  async generateSearchUtility() {
    const searchUtility = `// Untitled UI Component Search Utility
import catalog from './catalog.json';
import type { UntitledUIComponent, ComponentCategory } from './types';

export class UntitledUISearch {
  static findByName(name: string): UntitledUIComponent | null {
    return catalog.components[name] || null;
  }

  static findByCategory(category: ComponentCategory): UntitledUIComponent[] {
    return catalog.categories[category] || [];
  }

  static search(query: string): UntitledUIComponent[] {
    const lowerQuery = query.toLowerCase();
    return Object.values(catalog.components).filter(component =>
      component.name.toLowerCase().includes(lowerQuery) ||
      component.description.toLowerCase().includes(lowerQuery) ||
      component.category.toLowerCase().includes(lowerQuery)
    );
  }

  static getInstallCommand(name: string): string | null {
    const component = this.findByName(name);
    return component?.installation.cli || null;
  }
}

export default UntitledUISearch;
`;
    await fs.writeFile(path.join(this.outputDir, 'search.ts'), searchUtility);
  }

  async run() {
    try {
      await this.init();
      await this.scrapeAllComponents();
      await this.generateCatalog();
      
      console.log('🎉 Untitled UI scraping completed successfully!');
      console.log(`📁 Files generated in: ${this.outputDir}`);
    } catch (error) {
      console.error('❌ Scraping failed:', error);
      process.exit(1);
    }
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const scraper = new UntitledUIScraper();
  scraper.run();
}

export default UntitledUIScraper;