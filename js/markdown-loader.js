/**
 * Markdown Content Loader
 * Loads and renders Markdown files for Lei Wang's website
 */

class MarkdownLoader {
    constructor() {
        this.marked = window.marked;
        if (this.marked) {
            // Configure marked options
            this.marked.setOptions({
                breaks: true,
                gfm: true,
                headerIds: true,
                mangle: false
            });
        }
    }

    /**
     * Load and render a Markdown file
     * @param {string} markdownPath - Path to the markdown file
     * @param {string} containerId - ID of the container element
     */
    async loadMarkdown(markdownPath, containerId) {
        const container = document.getElementById(containerId);
        
        if (!container) {
            console.error(`Container with id "${containerId}" not found`);
            return;
        }

        // Check if marked.js is loaded
        if (!this.marked) {
            console.error('marked.js library not loaded');
            container.innerHTML = `
                <div class="error-message">
                    <h2>Loading Error</h2>
                    <p>Markdown parser not loaded. Please check your internet connection and refresh.</p>
                </div>
            `;
            return;
        }

        try {
            // Show loading state
            container.innerHTML = '<div class="loading">Loading content...</div>';

            console.log('Fetching:', markdownPath);

            // Fetch the markdown file
            const response = await fetch(markdownPath);
            
            if (!response.ok) {
                throw new Error(`Failed to load ${markdownPath}: ${response.status} ${response.statusText}`);
            }

            const markdown = await response.text();
            console.log('Markdown loaded, length:', markdown.length);
            
            // Parse and render
            const html = this.marked.parse(markdown);
            
            // Render with animation
            container.style.opacity = '0';
            container.innerHTML = html;
            
            // Process the rendered content
            this.processContent(container);
            
            // Fade in
            setTimeout(() => {
                container.style.transition = 'opacity 0.3s ease';
                container.style.opacity = '1';

                // Scroll to anchor if present in URL (after content is visible)
                if (window.location.hash) {
                    const target = document.querySelector(window.location.hash);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }, 10);

        } catch (error) {
            console.error('Error loading markdown:', error);
            
            // Check if this is a local file access issue
            const isLocalFile = window.location.protocol === 'file:';
            const localFileHelp = isLocalFile ? `
                <div style="background: #fffbcc; border: 1px solid #ffeb3b; padding: 1em; margin-top: 1em; border-radius: 4px;">
                    <strong>🔧 Running Locally?</strong>
                    <p>If you're testing locally, you need to use a local web server. Try:</p>
                    <pre style="background: #f5f5f5; padding: 0.5em; border-radius: 4px;">python -m http.server 8000</pre>
                    <p>Then visit: <code>http://localhost:8000/talks.html</code></p>
                </div>
            ` : '';
            
            container.innerHTML = `
                <div class="error-message">
                    <h2>Error Loading Content</h2>
                    <p>Sorry, there was an error loading the content.</p>
                    <details style="margin-top: 1em; font-size: 0.9em; color: #666;">
                        <summary style="cursor: pointer;">Show technical details</summary>
                        <p><strong>Error:</strong> ${error.message}</p>
                        <p><strong>File:</strong> ${markdownPath}</p>
                        <p><strong>Protocol:</strong> ${window.location.protocol}</p>
                        <p><strong>Path:</strong> ${window.location.pathname}</p>
                    </details>
                    ${localFileHelp}
                </div>
            `;
        }
    }

    /**
     * Process the rendered content for styling
     * @param {HTMLElement} container - Container element
     */
    processContent(container) {
        // Convert lists to styled content lists
        const lists = container.querySelectorAll('ul');
        lists.forEach(list => {
            // Check if this is a content list (has links in list items)
            const hasLinks = list.querySelector('li a');
            if (hasLinks) {
                list.classList.add('content-list');
            }
        });

        // Process headings
        const headings = container.querySelectorAll('h2, h3');
        headings.forEach(heading => {
            heading.classList.add('fade-in');
        });

        // Make external links open in new tab
        const links = container.querySelectorAll('a[href^="http"]');
        links.forEach(link => {
            if (!link.hostname.includes('wangleiphy.github.io')) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });

        // Add smooth scroll for anchor links
        const anchorLinks = container.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    /**
     * Get the markdown file path based on current page
     * @returns {string|null} Path to markdown file
     */
    static getMarkdownPath() {
        const path = window.location.pathname;
        console.log('Current path:', path);
        
        // Extract page name (handles both /talks.html and /folder/talks.html)
        const page = path.split('/').pop().replace('.html', '') || 'index';
        console.log('Detected page:', page);
        
        const markdownMap = {
            'talks': 'content/talks.md',
            'teaching': 'content/teaching.md',
            'conferences': 'content/conferences.md',
            'index': 'content/profile.md',
            '': 'content/profile.md'
        };

        const mdPath = markdownMap[page] || null;
        console.log('Markdown path:', mdPath);
        return mdPath;
    }

    /**
     * Get page title based on markdown file
     * @param {string} page - Page name
     * @returns {string} Page title
     */
    static getPageTitle(page) {
        const titles = {
            'talks': 'Research Talks',
            'lectures': 'Lectures & Teaching',
            'conferences': 'Conferences & Events',
            'index': 'Welcome'
        };
        return titles[page] || 'Lei Wang';
    }

    /**
     * Initialize the loader for the current page
     */
    static async init() {
        console.log('MarkdownLoader initializing...');
        
        // Wait for marked.js to be available
        let attempts = 0;
        while (!window.marked && attempts < 50) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        
        if (!window.marked) {
            console.error('marked.js failed to load after 5 seconds');
            const container = document.getElementById('markdown-content');
            if (container) {
                container.innerHTML = `
                    <div class="error-message">
                        <h2>Loading Error</h2>
                        <p>Unable to load the Markdown parser. Please check your internet connection and refresh the page.</p>
                    </div>
                `;
            }
            return;
        }
        
        const loader = new MarkdownLoader();
        const markdownPath = MarkdownLoader.getMarkdownPath();
        
        if (markdownPath) {
            await loader.loadMarkdown(markdownPath, 'markdown-content');
        } else {
            console.warn('No markdown path found for current page');
        }
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => MarkdownLoader.init());
} else {
    MarkdownLoader.init();
}

