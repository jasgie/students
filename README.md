# CodeLab - Student Code Editor 🚀

A comprehensive client-side web application that allows students to write, run, and download code in multiple programming languages. Built with modern web technologies and designed to be 100% client-side for easy deployment on GitHub Pages.

![CodeLab Screenshot](https://img.shields.io/badge/CodeLab-Student%20Code%20Editor-blue?style=for-the-badge&logo=code)

## ✨ Features

### 🔧 Multi-Language Support
- **Python** - Client-side execution using Skulpt
- **Java** - Server-side execution via Judge0 API
- **C++** - Server-side execution via Judge0 API  
- **MySQL** - SQL query execution via Judge0 API
- **HTML** - Live preview in new browser tab
- **CSS** - Live preview with sample HTML template
- **JavaScript** - Client-side execution with console capture

### 🎨 User Interface
- **Modern Design** - Clean, responsive interface built with Tailwind CSS
- **Dark Mode** - Toggle between light and dark themes
- **Code Editor** - Powered by CodeMirror with syntax highlighting
- **Terminal Output** - Styled console for viewing execution results
- **Mobile Friendly** - Fully responsive design for all devices

### 💾 Project Management
- **Project Naming** - Custom project titles reflected in app title bar
- **Code Download** - Download as ZIP archive or single file
- **Template Code** - Language-specific starter templates
- **README Generation** - Automatic README.md creation with run instructions

### 🌐 Progressive Web App (PWA)
- **Offline Support** - Works without internet connection for local languages
- **App Installation** - Can be installed as a native app
- **Service Worker** - Caching for improved performance

## 🚀 Getting Started

### Quick Start
1. **Clone or Download** this repository
2. **Open** `index.html` in any modern web browser
3. **Start Coding** - Select a language and begin writing code!

### Deployment on GitHub Pages
1. Fork this repository
2. Go to repository Settings > Pages
3. Select "Deploy from a branch" and choose `main` branch
4. Your app will be available at `https://yourusername.github.io/repository-name`

## 🔧 Technical Details

### Client-Side Execution
- **Python**: Uses Skulpt library for in-browser Python execution
- **JavaScript**: Direct execution with console output capture
- **HTML/CSS**: Live preview in new browser windows

### Server-Side Execution (Judge0 API)
- **Java, C++, MySQL**: Executed via Judge0 CE API
- **Free Tier**: Uses public demo endpoints
- **Fallback**: Graceful degradation when API unavailable

### Technologies Used
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Code Editor**: CodeMirror
- **Python Runtime**: Skulpt
- **File Handling**: JSZip
- **API**: Judge0 Code Execution Engine

## 📝 Usage Guide

### Basic Workflow
1. **Select Language** from the dropdown menu
2. **Write Code** in the editor (templates provided)
3. **Set Project Name** to customize your project
4. **Run Code** to see output in the console
5. **Download** your project as ZIP or single file

### Supported Operations
- **Run**: Execute code and view output
- **Clear**: Reset editor to template code
- **Download**: Save project files locally
- **Clear Output**: Clean the console display

### Language-Specific Features

#### Python
- Full Python 2.7 syntax support via Skulpt
- Built-in libraries available
- Real-time execution feedback

#### Java
- Full Java compilation and execution
- Main class detection
- Compilation error reporting

#### C++
- GCC compiler support
- Standard library access
- Runtime error handling

#### MySQL
- SQL query execution
- Result set display
- Syntax error reporting

#### HTML/CSS/JavaScript
- Live browser preview
- Instant feedback
- Development-ready output

## 🛠️ Customization

### Adding New Languages
1. Update `languageConfig` in `app.js`
2. Add CodeMirror mode for syntax highlighting
3. Implement execution method in `runCode()` function
4. Add language-specific templates

### Modifying UI
- Edit `index.html` for structure changes
- Modify Tailwind classes for styling
- Update `app.js` for functionality changes

### API Configuration
- Replace Judge0 API key in `judge0Config`
- Modify API endpoints if using different service
- Add error handling for API failures

## 🔒 Security Considerations

### Client-Side Execution
- JavaScript code runs in current browser context
- Python code sandboxed via Skulpt
- HTML/CSS opens in new windows for isolation

### Server-Side Execution
- Code sent to external Judge0 API
- No sensitive data should be included in code
- Rate limiting applies to free tier usage

## 📦 File Structure

```
codelab/
├── index.html          # Main application interface
├── app.js             # Core application logic
├── sw.js              # Service worker for PWA
├── manifest.json      # PWA configuration
└── README.md          # Documentation
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Report Bugs** - Open an issue with detailed description
2. **Suggest Features** - Propose new functionality
3. **Submit PRs** - Fix bugs or add features
4. **Improve Docs** - Enhance documentation

### Development Setup
1. Clone the repository
2. Open `index.html` in browser
3. Make changes and test locally
4. Submit pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **CodeMirror** - Excellent code editor component
- **Skulpt** - Python-to-JavaScript compiler
- **Judge0** - Code execution API service
- **Tailwind CSS** - Utility-first CSS framework
- **JSZip** - JavaScript ZIP library

## 🆘 Support

### Common Issues

**Q: Code won't run for Java/C++/MySQL**
A: Check internet connection - these languages require Judge0 API access.

**Q: Python code gives errors**
A: Ensure code is Python 2.7 compatible (Skulpt limitation).

**Q: Download doesn't work**
A: Make sure your browser allows file downloads and popups.

**Q: App won't install as PWA**
A: Ensure you're using HTTPS or localhost for PWA features.

### Getting Help
- Check browser console for error messages
- Verify internet connection for API-dependent languages
- Test with provided template code first
- Report persistent issues on GitHub

---

**Made with ❤️ for students learning to code**

*CodeLab - Empowering the next generation of developers*
