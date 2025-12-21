# Testing the Website Locally

## Why You Need a Local Server

Modern browsers block loading files via JavaScript when opening HTML files directly (using `file://` protocol) for security reasons. This means if you double-click `talks.html`, the Markdown content won't load.

## 🚀 Quick Solutions

### Option 1: Python (Recommended - Works on Mac/Linux)

If you have Python installed (comes with macOS):

```bash
# Navigate to your website directory
cd ~/Work/wangleiphy.github.io

# Start a simple web server
python -m http.server 8000

# Or if you have Python 2:
python -m SimpleHTTPServer 8000
```

Then open your browser and visit:
- **Homepage**: http://localhost:8000/
- **Talks**: http://localhost:8000/talks.html
- **Lectures**: http://localhost:8000/lectures.html

Press `Ctrl+C` in the terminal to stop the server.

### Option 2: PHP

If you have PHP installed:

```bash
cd ~/Work/wangleiphy.github.io
php -S localhost:8000
```

Then visit: http://localhost:8000/talks.html

### Option 3: Node.js (http-server)

If you have Node.js installed:

```bash
# Install http-server globally (one time only)
npm install -g http-server

# Run from your website directory
cd ~/Work/wangleiphy.github.io
http-server -p 8000
```

Then visit: http://localhost:8000/talks.html

### Option 4: VS Code Live Server Extension

If you use VS Code:

1. Install the "Live Server" extension by Ritwick Dey
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. Your browser opens automatically!

### Option 5: Just Push to GitHub

**Easiest option**: Just push your changes to GitHub and view the live site!

```bash
git add .
git commit -m "Update content"
git push
```

Wait ~1 minute, then visit:
`https://wangleiphy.github.io/`

## 🔍 Troubleshooting

### "Error Loading Content" Message

**Cause**: You're opening the HTML file directly (file:// protocol)

**Solution**: Use one of the local server options above

### Content Not Updating

**Cause**: Browser cache

**Solution**: 
- Hard refresh: `Ctrl+F5` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Or open DevTools (F12) → Network tab → Check "Disable cache"

### "marked.js failed to load"

**Cause**: No internet connection (marked.js loads from CDN)

**Solution**: 
- Check your internet connection
- Or download marked.js and host it locally

### Console Errors

To see detailed error messages:

1. Open DevTools: F12 (or right-click → Inspect)
2. Go to "Console" tab
3. Look for red error messages
4. The error messages will show exactly what's wrong

## 📊 What You Should See

When the site loads correctly, in the browser console you should see:

```
MarkdownLoader initializing...
Current path: /talks.html
Detected page: talks
Markdown path: content/talks.md
Fetching: content/talks.md
Markdown loaded, length: 2847
```

## ✅ Verification Checklist

- [ ] Using a local web server (not opening file directly)
- [ ] Can see console logs in DevTools
- [ ] Content loads without errors
- [ ] Links work correctly
- [ ] Styling looks good
- [ ] Responsive on mobile (use DevTools device emulator)

## 🌐 Testing on Different Devices

### Desktop Browsers
Test on:
- Chrome/Edge
- Firefox
- Safari (Mac)

### Mobile Testing
Use DevTools device emulator:
1. Open DevTools (F12)
2. Click device toggle button (Ctrl+Shift+M)
3. Select different devices (iPhone, iPad, Android)

### Real Mobile Device
1. Start local server: `python -m http.server 8000`
2. Find your computer's local IP: `ifconfig` (Mac/Linux) or `ipconfig` (Windows)
3. On mobile, visit: `http://YOUR_IP:8000/`
   - Example: `http://192.168.1.100:8000/`

## 🚀 Production Testing (GitHub Pages)

After pushing to GitHub:

1. Go to your repository settings
2. Navigate to "Pages" section
3. Ensure source is set to main branch
4. Visit: `https://wangleiphy.github.io/`

Changes appear in ~1 minute after pushing.

## 📝 Quick Test Workflow

```bash
# 1. Start local server
python -m http.server 8000

# 2. In another terminal, make changes
vim content/talks.md

# 3. Refresh browser to see changes (Ctrl+F5)

# 4. When satisfied, commit and push
git add content/talks.md
git commit -m "Update talks"
git push

# 5. Stop server (Ctrl+C)
```

## 💡 Pro Tips

1. **Keep server running**: Leave the server running while you edit files, just refresh the browser
2. **Use DevTools**: Keep the console open to see any errors immediately
3. **Test responsive**: Always check mobile view before publishing
4. **Clear cache**: When in doubt, hard refresh (Ctrl+F5)
5. **Check console**: Look for the debug messages to verify paths are correct

## 🐛 Still Having Issues?

Check these files exist and are in the right place:

```
wangleiphy.github.io/
├── content/
│   ├── talks.md          ✅ Should exist
│   ├── lectures.md       ✅ Should exist
│   └── conferences.md    ✅ Should exist
├── js/
│   └── markdown-loader.js ✅ Should exist
├── talks.html             ✅ Should exist
├── lectures.html          ✅ Should exist
└── conferences.html       ✅ Should exist
```

If all files are in place and you're using a local server, it should work!

