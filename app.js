// CodeLab - Student Code Editor Application
class CodeLab {
    constructor() {
        this.editor = null;
        this.currentLanguage = 'python';
        this.isDarkMode = localStorage.getItem('darkMode') === 'true';
        this.projectName = 'My Project';
        
        // OnlineCompiler.io API Configuration
        this.compilerConfig = {
            baseUrl: 'https://onlinecompiler.io/api/v1',
            apiKey: '65ac8c70f7662ae07b166e640b54aa63', // Your API key
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 65ac8c70f7662ae07b166e640b54aa63'
            }
        };
        
        // Language configurations
        this.languageConfig = {
            python: { 
                mode: 'python', 
                languageId: 'python', 
                extension: 'py',
                template: '# Python Code\nprint("Hello, World!")\n\n# Write your Python code here\n'
            },
            java: { 
                mode: 'text/x-java', 
                languageId: 'java', 
                extension: 'java',
                template: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n        \n        // Write your Java code here\n    }\n}\n'
            },
            cpp: { 
                mode: 'text/x-c++src', 
                languageId: 'cpp', 
                extension: 'cpp',
                template: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    \n    // Write your C++ code here\n    \n    return 0;\n}\n'
            },
            mysql: { 
                mode: 'text/x-sql', 
                languageId: 'sql', 
                extension: 'sql',
                template: '-- MySQL Query\nSELECT "Hello, World!" as message;\n\n-- Write your SQL queries here\n-- Note: CREATE TABLE and INSERT operations may be limited in the sandbox\n'
            },
            html: { 
                mode: 'htmlmixed', 
                judge0Id: null, 
                extension: 'html',
                template: '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>My HTML Page</title>\n</head>\n<body>\n    <h1>Hello, World!</h1>\n    <p>Write your HTML code here</p>\n</body>\n</html>\n'
            },
            css: { 
                mode: 'css', 
                languageId: null, 
                extension: 'css',
                template: '/* CSS Styles */\nbody {\n    font-family: Arial, sans-serif;\n    margin: 0;\n    padding: 20px;\n    background-color: #f0f0f0;\n}\n\nh1 {\n    color: #333;\n    text-align: center;\n}\n\n/* Write your CSS code here */\n'
            },
            javascript: { 
                mode: 'javascript', 
                languageId: null, 
                extension: 'js',
                template: '// JavaScript Code\nconsole.log("Hello, World!");\n\n// Write your JavaScript code here\nfunction greet(name) {\n    return `Hello, ${name}!`;\n}\n\nconsole.log(greet("CodeLab"));\n'
            }
        };
        
        this.init();
    }
    
    init() {
        this.setupDarkMode();
        this.setupEditor();
        this.setupEventListeners();
        this.checkApiStatus();
        this.updateProjectName();
    }
    
    setupDarkMode() {
        const body = document.body;
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        const sunIcon = darkModeToggle.querySelector('.sun-icon');
        const moonIcon = darkModeToggle.querySelector('.moon-icon');
        
        if (this.isDarkMode) {
            body.classList.add('dark');
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        }
        
        darkModeToggle.addEventListener('click', () => {
            this.isDarkMode = !this.isDarkMode;
            localStorage.setItem('darkMode', this.isDarkMode);
            
            body.classList.toggle('dark');
            sunIcon.classList.toggle('hidden');
            moonIcon.classList.toggle('hidden');
            
            // Update editor theme
            this.editor.setOption('theme', this.isDarkMode ? 'monokai' : 'default');
        });
    }
    
    setupEditor() {
        this.editor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
            lineNumbers: true,
            mode: this.languageConfig[this.currentLanguage].mode,
            theme: this.isDarkMode ? 'monokai' : 'default',
            indentUnit: 4,
            lineWrapping: true,
            autoCloseBrackets: true,
            matchBrackets: true,
            value: this.languageConfig[this.currentLanguage].template
        });
        
        // Set initial template
        this.editor.setValue(this.languageConfig[this.currentLanguage].template);
    }
    
    setupEventListeners() {
        // Language selector
        const languageSelect = document.getElementById('language-select');
        languageSelect.addEventListener('change', (e) => {
            this.currentLanguage = e.target.value;
            const config = this.languageConfig[this.currentLanguage];
            this.editor.setOption('mode', config.mode);
            this.editor.setValue(config.template);
            this.clearOutput();
        });
        
        // Project name input
        const projectNameInput = document.getElementById('project-name');
        projectNameInput.addEventListener('input', (e) => {
            this.projectName = e.target.value || 'My Project';
            this.updateProjectName();
        });
        
        // Buttons
        document.getElementById('run-btn').addEventListener('click', () => this.runCode());
        document.getElementById('clear-btn').addEventListener('click', () => this.clearEditor());
        document.getElementById('download-btn').addEventListener('click', () => this.downloadCode());
        document.getElementById('clear-output-btn').addEventListener('click', () => this.clearOutput());
    }
    
    updateProjectName() {
        document.getElementById('app-title').textContent = this.projectName || 'CodeLab';
        document.title = `${this.projectName || 'CodeLab'} - Student Code Editor`;
    }
    
    async checkApiStatus() {
        const statusElement = document.getElementById('api-status-text');
        try {
            const response = await fetch(`${this.compilerConfig.baseUrl}/languages`, {
                method: 'GET',
                headers: this.compilerConfig.headers
            });
            
            if (response.ok) {
                statusElement.textContent = 'Connected ✅';
                statusElement.className = 'font-medium text-green-600 dark:text-green-400';
            } else {
                throw new Error('API not accessible');
            }
        } catch (error) {
            statusElement.textContent = 'Limited (Local execution only) ⚠️';
            statusElement.className = 'font-medium text-yellow-600 dark:text-yellow-400';
        }
    }
    
    async runCode() {
        const code = this.editor.getValue();
        if (!code.trim()) {
            this.appendToOutput('❌ No code to execute.\n');
            return;
        }
        
        this.appendToOutput(`🚀 Running ${this.currentLanguage.toUpperCase()} code...\n`);
        this.setRunButtonLoading(true);
        
        try {
            switch (this.currentLanguage) {
                case 'python':
                    await this.runPython(code);
                    break;
                case 'javascript':
                    this.runJavaScript(code);
                    break;
                case 'html':
                    this.runHTML(code);
                    break;
                case 'css':
                    this.runCSS(code);
                    break;
                case 'java':
                case 'cpp':
                case 'mysql':
                    await this.runWithCompiler(code);
                    break;
                default:
                    this.appendToOutput('❌ Language not supported for execution.\n');
            }
        } catch (error) {
            this.appendToOutput(`❌ Error: ${error.message}\n`);
        } finally {
            this.setRunButtonLoading(false);
        }
    }
    
    async runPython(code) {
        try {
            let output = '';
            
            // Configure Skulpt
            Sk.configure({
                output: (text) => {
                    output += text;
                },
                read: (filename) => {
                    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][filename] === undefined) {
                        throw "File not found: '" + filename + "'";
                    }
                    return Sk.builtinFiles["files"][filename];
                }
            });
            
            await Sk.misceval.asyncToPromise(() => {
                return Sk.importMainWithBody("<stdin>", false, code, true);
            });
            
            this.appendToOutput(`✅ Python execution completed:\n${output}\n`);
        } catch (error) {
            this.appendToOutput(`❌ Python Error: ${error.toString()}\n`);
        }
    }
    
    runJavaScript(code) {
        try {
            // Capture console output
            const originalLog = console.log;
            const originalError = console.error;
            const originalWarn = console.warn;
            let output = '';
            
            const captureOutput = (...args) => {
                output += args.map(arg => 
                    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                ).join(' ') + '\n';
            };
            
            console.log = captureOutput;
            console.error = captureOutput;
            console.warn = captureOutput;
            
            // Execute the code
            const result = eval(code);
            
            // Restore console
            console.log = originalLog;
            console.error = originalError;
            console.warn = originalWarn;
            
            if (result !== undefined) {
                output += `Return value: ${result}\n`;
            }
            
            this.appendToOutput(`✅ JavaScript execution completed:\n${output}\n`);
        } catch (error) {
            this.appendToOutput(`❌ JavaScript Error: ${error.message}\n`);
        }
    }
    
    runHTML(code) {
        try {
            // Create a new window/tab to display HTML
            const newWindow = window.open('', '_blank');
            newWindow.document.write(code);
            newWindow.document.close();
            
            this.appendToOutput('✅ HTML opened in new tab/window.\n');
        } catch (error) {
            this.appendToOutput(`❌ HTML Error: ${error.message}\n`);
        }
    }
    
    runCSS(code) {
        // For CSS, we'll show a preview with some sample HTML
        const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Preview</title>
    <style>
${code}
    </style>
</head>
<body>
    <h1>CSS Preview</h1>
    <p>This is a sample paragraph to demonstrate your CSS styles.</p>
    <div class="sample-div">Sample div element</div>
    <button>Sample button</button>
    <ul>
        <li>List item 1</li>
        <li>List item 2</li>
        <li>List item 3</li>
    </ul>
</body>
</html>`;
        
        try {
            const newWindow = window.open('', '_blank');
            newWindow.document.write(htmlTemplate);
            newWindow.document.close();
            
            this.appendToOutput('✅ CSS preview opened in new tab/window.\n');
        } catch (error) {
            this.appendToOutput(`❌ CSS Error: ${error.message}\n`);
        }
    }
    
    async runWithCompiler(code) {
        const config = this.languageConfig[this.currentLanguage];
        
        try {
            // Submit code for execution to onlinecompiler.io
            const submitResponse = await fetch(`${this.compilerConfig.baseUrl}/execute`, {
                method: 'POST',
                headers: this.compilerConfig.headers,
                body: JSON.stringify({
                    language: config.languageId,
                    code: code,
                    input: '' // Empty input
                })
            });
            
            if (!submitResponse.ok) {
                throw new Error(`API Error: ${submitResponse.status}`);
            }
            
            const result = await submitResponse.json();
            
            // Display results
            let output = '';
            
            if (result.success) {
                if (result.output) {
                    output += `Output:\n${result.output}\n`;
                }
                
                if (result.error) {
                    output += `Errors:\n${result.error}\n`;
                }
                
                const statusIcon = result.error ? '⚠️' : '✅';
                this.appendToOutput(`${statusIcon} Execution completed:\n${output}\n`);
            } else {
                this.appendToOutput(`❌ Execution failed: ${result.message || 'Unknown error'}\n`);
            }
            
        } catch (error) {
            this.appendToOutput(`❌ Execution failed: ${error.message}\n`);
            this.appendToOutput('💡 Tip: Make sure you have internet connection for OnlineCompiler.io API access.\n');
        }
    }
    
    clearEditor() {
        const config = this.languageConfig[this.currentLanguage];
        this.editor.setValue(config.template);
        this.appendToOutput('🧹 Editor cleared.\n');
    }
    
    clearOutput() {
        document.getElementById('output-console').textContent = '';
    }
    
    appendToOutput(text) {
        const outputElement = document.getElementById('output-console');
        outputElement.textContent += text;
        outputElement.scrollTop = outputElement.scrollHeight;
    }
    
    setRunButtonLoading(isLoading) {
        const runBtn = document.getElementById('run-btn');
        const originalHTML = runBtn.innerHTML;
        
        if (isLoading) {
            runBtn.innerHTML = '<div class="loading-spinner"></div>Running...';
            runBtn.disabled = true;
        } else {
            runBtn.innerHTML = originalHTML;
            runBtn.disabled = false;
        }
    }
    
    async downloadCode() {
        const code = this.editor.getValue();
        const config = this.languageConfig[this.currentLanguage];
        const filename = `${this.projectName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}`;
        
        if (!code.trim()) {
            this.appendToOutput('❌ No code to download.\n');
            return;
        }
        
        try {
            // Create ZIP file with JSZip
            const zip = new JSZip();
            const fileExtension = config.extension;
            const codeFilename = `${filename}.${fileExtension}`;
            
            // Add the main code file
            zip.file(codeFilename, code);
            
            // Add a README file
            const readmeContent = `# ${this.projectName}

Language: ${this.currentLanguage.toUpperCase()}
Created with: CodeLab Student Code Editor
Date: ${new Date().toLocaleDateString()}

## Files
- ${codeFilename}: Main ${this.currentLanguage} source code

## Instructions
To run this code:
${this.getRunInstructions()}

Generated by CodeLab - Student Code Editor
`;
            
            zip.file('README.md', readmeContent);
            
            // Generate and download ZIP
            const content = await zip.generateAsync({ type: 'blob' });
            const url = URL.createObjectURL(content);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${filename}.zip`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.appendToOutput(`📦 Downloaded: ${filename}.zip\n`);
            
        } catch (error) {
            // Fallback: download as single text file
            this.downloadAsSingleFile(code, filename, config.extension);
        }
    }
    
    downloadAsSingleFile(code, filename, extension) {
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}.${extension}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.appendToOutput(`📄 Downloaded: ${filename}.${extension}\n`);
    }
    
    getRunInstructions() {
        const instructions = {
            python: '1. Install Python 3.x\n2. Run: python filename.py',
            java: '1. Install JDK\n2. Compile: javac filename.java\n3. Run: java Main',
            cpp: '1. Install GCC compiler\n2. Compile: g++ filename.cpp -o program\n3. Run: ./program',
            mysql: '1. Install MySQL\n2. Run: mysql -u username -p < filename.sql',
            html: '1. Open filename.html in a web browser',
            css: '1. Include in HTML: <link rel="stylesheet" href="filename.css">',
            javascript: '1. Include in HTML: <script src="filename.js"></script>\n2. Or run with Node.js: node filename.js'
        };
        
        return instructions[this.currentLanguage] || 'Refer to language documentation';
    }
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new CodeLab();
});

// Service Worker registration for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
