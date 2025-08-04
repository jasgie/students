// CodeLab - Student Code Editor Application
class CodeLab {
    constructor() {
        this.editor = null;
        this.currentLanguage = 'python';
        this.isDarkMode = localStorage.getItem('darkMode') === 'true';
        this.projectName = 'My Project';
        
        // Judge0 API Configuration (using free tier)
        this.judge0Config = {
            baseUrl: 'https://judge0-ce.p.rapidapi.com',
            headers: {
                'Content-Type': 'application/json',
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                'X-RapidAPI-Key': 'demo' // Using demo key for public access
            },
            // Alternative free endpoints to try
            alternativeUrls: [
                'https://api.judge0.com',
                'https://judge0-extra-ce.p.rapidapi.com'
            ]
        };
        
        // Language configurations
        this.languageConfig = {
            python: { 
                mode: 'python', 
                judge0Id: 71, 
                extension: 'py',
                template: '# Python Code\nprint("Hello, World!")\n\n# Write your Python code here\n'
            },
            java: { 
                mode: 'text/x-java', 
                judge0Id: 62, 
                extension: 'java',
                template: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n        \n        // Write your Java code here\n    }\n}\n'
            },
            cpp: { 
                mode: 'text/x-c++src', 
                judge0Id: 54, 
                extension: 'cpp',
                template: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    \n    // Write your C++ code here\n    \n    return 0;\n}\n'
            },
            mysql: { 
                mode: 'text/x-sql', 
                judge0Id: 82, 
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
                judge0Id: null, 
                extension: 'css',
                template: '/* CSS Styles */\nbody {\n    font-family: Arial, sans-serif;\n    margin: 0;\n    padding: 20px;\n    background-color: #f0f0f0;\n}\n\nh1 {\n    color: #333;\n    text-align: center;\n}\n\n/* Write your CSS code here */\n'
            },
            javascript: { 
                mode: 'javascript', 
                judge0Id: null, 
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
        this.updateProjectName();
        
        // Add some delay to ensure all libraries are loaded
        setTimeout(() => {
            this.checkLibraries();
            this.checkJudge0Status();
        }, 1000);
    }
    
    checkLibraries() {
        this.appendToOutput('🔍 Checking library status...\n');
        
        if (typeof Sk !== 'undefined') {
            this.appendToOutput('✅ Skulpt (Python) library loaded\n');
        } else {
            this.appendToOutput('❌ Skulpt (Python) library not loaded\n');
        }
        
        if (typeof CodeMirror !== 'undefined') {
            this.appendToOutput('✅ CodeMirror editor library loaded\n');
        } else {
            this.appendToOutput('❌ CodeMirror editor library not loaded\n');
        }
        
        if (typeof JSZip !== 'undefined') {
            this.appendToOutput('✅ JSZip download library loaded\n');
        } else {
            this.appendToOutput('❌ JSZip download library not loaded\n');
        }
        
        this.appendToOutput('📚 Library check complete.\n\n');
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
    
    async checkJudge0Status() {
        const statusElement = document.getElementById('api-status-text');
        
        // Check multiple endpoints
        const endpoints = [this.judge0Config.baseUrl, ...this.judge0Config.alternativeUrls];
        let workingEndpoint = null;
        
        for (const endpoint of endpoints) {
            try {
                const response = await fetch(`${endpoint}/languages`, {
                    method: 'GET',
                    headers: endpoint === this.judge0Config.baseUrl ? 
                        this.judge0Config.headers : 
                        { 'Content-Type': 'application/json' }
                });
                
                if (response.ok) {
                    workingEndpoint = endpoint;
                    break;
                }
            } catch (error) {
                // Continue to next endpoint
                continue;
            }
        }
        
        if (workingEndpoint) {
            statusElement.textContent = 'Connected ✅';
            statusElement.className = 'font-medium text-green-600 dark:text-green-400';
            this.appendToOutput(`🌐 Judge0 API connected via ${workingEndpoint}\n`);
        } else {
            statusElement.textContent = 'Limited (Local execution only) ⚠️';
            statusElement.className = 'font-medium text-yellow-600 dark:text-yellow-400';
            this.appendToOutput('⚠️ Judge0 API unavailable - Java, C++, MySQL will use local alternatives when possible.\n');
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
                    await this.runWithJudge0(code);
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
            // Check if Skulpt is loaded
            if (typeof Sk === 'undefined') {
                this.appendToOutput('❌ Python Error: Skulpt library not loaded. Trying simple evaluation...\n');
                this.runSimplePython(code);
                return;
            }
            
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
                },
                __future__: Sk.python3
            });
            
            // Execute Python code
            const promise = Sk.misceval.asyncToPromise(() => {
                return Sk.importMainWithBody("<stdin>", false, code, true);
            });
            
            await promise;
            
            this.appendToOutput(`✅ Python execution completed:\n${output}\n`);
        } catch (error) {
            this.appendToOutput(`❌ Python Error: ${error.toString()}\n`);
            this.appendToOutput(`💡 Trying simple evaluation fallback...\n`);
            this.runSimplePython(code);
        }
    }
    
    runSimplePython(code) {
        try {
            // Simple Python-like evaluation for basic expressions
            let output = '';
            const printFunction = (...args) => {
                output += args.map(arg => String(arg)).join(' ') + '\n';
            };
            
            // Replace Python print statements with JavaScript equivalents
            let jsCode = code
                .replace(/print\s*\(/g, 'printFunction(')
                .replace(/print\s+(.+)/g, 'printFunction($1)')
                .replace(/^\s*#.*/gm, '') // Remove comments
                .replace(/'''/g, '`').replace(/"""/g, '`'); // Convert triple quotes
            
            // Create a limited execution context
            const context = {
                printFunction,
                console: { log: printFunction },
                Math: Math,
                parseInt: parseInt,
                parseFloat: parseFloat,
                String: String,
                Number: Number,
                Array: Array,
                Object: Object
            };
            
            // Execute in limited context
            const func = new Function(...Object.keys(context), jsCode);
            func(...Object.values(context));
            
            if (output) {
                this.appendToOutput(`⚠️ Simple Python evaluation:\n${output}\n`);
                this.appendToOutput(`📝 Note: Limited Python support. For full Python features, Skulpt library is required.\n`);
            } else {
                this.appendToOutput(`⚠️ Simple evaluation completed (no output generated)\n`);
            }
        } catch (error) {
            this.appendToOutput(`❌ Simple Python evaluation failed: ${error.message}\n`);
            this.appendToOutput(`💡 Suggestions:\n`);
            this.appendToOutput(`   • Try simpler Python expressions\n`);
            this.appendToOutput(`   • Check for syntax errors\n`);
            this.appendToOutput(`   • Refresh page to reload Skulpt library\n`);
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
    
    async runWithJudge0(code) {
        const config = this.languageConfig[this.currentLanguage];
        
        // Try the primary endpoint first
        let success = await this.tryJudge0Endpoint(this.judge0Config.baseUrl, code, config);
        
        if (!success) {
            // Try alternative endpoints
            for (const altUrl of this.judge0Config.alternativeUrls) {
                this.appendToOutput(`🔄 Trying alternative endpoint...\n`);
                success = await this.tryJudge0Endpoint(altUrl, code, config, true);
                if (success) break;
            }
        }
        
        if (!success) {
            this.appendToOutput(`❌ All Judge0 endpoints unavailable.\n`);
            this.appendToOutput(`💡 Alternative solutions:\n`);
            
            // Try basic syntax checking for code quality
            this.performBasicSyntaxCheck(code, config);
            
            this.appendToOutput(`   • For Java: Try online IDEs like repl.it or CodePen\n`);
            this.appendToOutput(`   • For C++: Try online compilers like OnlineGDB\n`);
            this.appendToOutput(`   • For MySQL: Try online SQL editors like SQLiteOnline\n`);
            this.appendToOutput(`   • Or run locally with appropriate compilers/databases\n`);
        }
    }
    
    async tryJudge0Endpoint(baseUrl, code, config, isAlternative = false) {
        try {
            const headers = isAlternative ? 
                { 'Content-Type': 'application/json' } : 
                this.judge0Config.headers;
                
            // Submit code for execution
            const submitResponse = await fetch(`${baseUrl}/submissions?wait=true`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    language_id: config.judge0Id,
                    source_code: btoa(code), // Base64 encode
                    stdin: btoa(''), // Empty stdin
                })
            });
            
            if (!submitResponse.ok) {
                throw new Error(`HTTP ${submitResponse.status}: ${submitResponse.statusText}`);
            }
            
            const result = await submitResponse.json();
            
            // Handle direct response (wait=true)
            if (result.token) {
                return await this.pollJudge0Result(result.token, baseUrl, headers);
            } else {
                return this.handleJudge0Result(result);
            }
            
        } catch (error) {
            this.appendToOutput(`❌ Endpoint ${baseUrl} failed: ${error.message}\n`);
            return false;
        }
    }
    
    handleJudge0Result(result) {
        let output = '';
        
        if (result.stdout) {
            output += `Output:\n${atob(result.stdout)}\n`;
        }
        
        if (result.stderr) {
            output += `Errors:\n${atob(result.stderr)}\n`;
        }
        
        if (result.compile_output) {
            output += `Compilation:\n${atob(result.compile_output)}\n`;
        }
        
        const statusIcon = result.status?.id === 3 ? '✅' : '❌';
        const statusDesc = result.status?.description || 'Unknown';
        this.appendToOutput(`${statusIcon} Execution ${statusDesc}:\n${output}\n`);
        return true;
    }
    
    async pollJudge0Result(token, baseUrl, headers, maxAttempts = 10) {
        for (let i = 0; i < maxAttempts; i++) {
            try {
                const response = await fetch(`${baseUrl}/submissions/${token}`, {
                    method: 'GET',
                    headers: headers
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                
                const result = await response.json();
                
                if (result.status.id <= 2) {
                    // Still processing
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    continue;
                }
                
                // Execution completed
                return this.handleJudge0Result(result);
                
            } catch (error) {
                this.appendToOutput(`❌ Failed to get results: ${error.message}\n`);
                return false;
            }
        }
        
        this.appendToOutput('⏱️ Execution timeout - please try again.\n');
        return false;
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
    
    performBasicSyntaxCheck(code, config) {
        this.appendToOutput(`🔍 Performing basic syntax check for ${this.currentLanguage.toUpperCase()}...\n`);
        
        try {
            let issues = [];
            
            switch (this.currentLanguage) {
                case 'java':
                    issues = this.checkJavaSyntax(code);
                    break;
                case 'cpp':
                    issues = this.checkCppSyntax(code);
                    break;
                case 'mysql':
                    issues = this.checkSqlSyntax(code);
                    break;
            }
            
            if (issues.length === 0) {
                this.appendToOutput(`✅ No obvious syntax issues found!\n`);
            } else {
                this.appendToOutput(`⚠️ Potential issues found:\n`);
                issues.forEach(issue => this.appendToOutput(`   • ${issue}\n`));
            }
        } catch (error) {
            this.appendToOutput(`❌ Syntax check failed: ${error.message}\n`);
        }
    }
    
    checkJavaSyntax(code) {
        const issues = [];
        
        if (!code.includes('public class')) {
            issues.push('Missing "public class" declaration');
        }
        
        if (!code.includes('public static void main')) {
            issues.push('Missing main method');
        }
        
        const openBraces = (code.match(/\{/g) || []).length;
        const closeBraces = (code.match(/\}/g) || []).length;
        if (openBraces !== closeBraces) {
            issues.push(`Mismatched braces: ${openBraces} open, ${closeBraces} close`);
        }
        
        const openParens = (code.match(/\(/g) || []).length;
        const closeParens = (code.match(/\)/g) || []).length;
        if (openParens !== closeParens) {
            issues.push(`Mismatched parentheses: ${openParens} open, ${closeParens} close`);
        }
        
        return issues;
    }
    
    checkCppSyntax(code) {
        const issues = [];
        
        if (!code.includes('#include')) {
            issues.push('Missing #include directives');
        }
        
        if (!code.includes('int main')) {
            issues.push('Missing main function');
        }
        
        const openBraces = (code.match(/\{/g) || []).length;
        const closeBraces = (code.match(/\}/g) || []).length;
        if (openBraces !== closeBraces) {
            issues.push(`Mismatched braces: ${openBraces} open, ${closeBraces} close`);
        }
        
        if (!code.includes('return')) {
            issues.push('Main function should return a value');
        }
        
        return issues;
    }
    
    checkSqlSyntax(code) {
        const issues = [];
        
        const sqlKeywords = ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'DROP', 'ALTER'];
        const hasKeyword = sqlKeywords.some(keyword => 
            code.toUpperCase().includes(keyword)
        );
        
        if (!hasKeyword) {
            issues.push('No SQL keywords found');
        }
        
        const openParens = (code.match(/\(/g) || []).length;
        const closeParens = (code.match(/\)/g) || []).length;
        if (openParens !== closeParens) {
            issues.push(`Mismatched parentheses: ${openParens} open, ${closeParens} close`);
        }
        
        return issues;
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
