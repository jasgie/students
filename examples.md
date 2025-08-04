# CodeLab Demo Examples

This file contains sample code snippets that you can copy and paste into CodeLab to test its functionality.

## Python Examples

### Basic Hello World
```python
print("Hello, World!")
print("Welcome to CodeLab!")

# Basic math operations
x = 10
y = 5
print(f"Sum: {x + y}")
print(f"Product: {x * y}")
```

### Simple Function
```python
def factorial(n):
    if n <= 1:
        return 1
    else:
        return n * factorial(n - 1)

# Test the function
for i in range(1, 6):
    print(f"Factorial of {i} is {factorial(i)}")
```

### List Operations
```python
# Create a list of numbers
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Filter even numbers
evens = [n for n in numbers if n % 2 == 0]
print("Even numbers:", evens)

# Calculate sum
total = sum(numbers)
print("Sum of all numbers:", total)
```

## JavaScript Examples

### Basic Operations
```javascript
console.log("Hello, World!");
console.log("JavaScript is running!");

// Variables and operations
let a = 15;
let b = 25;
console.log(`Sum: ${a + b}`);
console.log(`Difference: ${a - b}`);

// Array operations
const fruits = ['apple', 'banana', 'orange'];
console.log('Fruits:', fruits);
console.log('First fruit:', fruits[0]);
```

### Function Example
```javascript
function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// Test prime numbers
for (let i = 1; i <= 20; i++) {
    if (isPrime(i)) {
        console.log(`${i} is prime`);
    }
}
```

## Java Examples

### Basic Hello World
```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println("Java is running on Judge0!");
        
        // Basic operations
        int x = 10;
        int y = 20;
        System.out.println("Sum: " + (x + y));
        System.out.println("Product: " + (x * y));
    }
}
```

### Simple Class Example
```java
public class Main {
    static class Calculator {
        public static int add(int a, int b) {
            return a + b;
        }
        
        public static int multiply(int a, int b) {
            return a * b;
        }
    }
    
    public static void main(String[] args) {
        System.out.println("Calculator Test:");
        System.out.println("5 + 3 = " + Calculator.add(5, 3));
        System.out.println("5 * 3 = " + Calculator.multiply(5, 3));
    }
}
```

## C++ Examples

### Basic Hello World
```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    cout << "C++ is running on Judge0!" << endl;
    
    // Basic operations
    int x = 15;
    int y = 25;
    cout << "Sum: " << (x + y) << endl;
    cout << "Product: " << (x * y) << endl;
    
    return 0;
}
```

### Vector Example
```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> numbers = {5, 2, 8, 1, 9, 3};
    
    cout << "Original numbers: ";
    for (int num : numbers) {
        cout << num << " ";
    }
    cout << endl;
    
    sort(numbers.begin(), numbers.end());
    
    cout << "Sorted numbers: ";
    for (int num : numbers) {
        cout << num << " ";
    }
    cout << endl;
    
    return 0;
}
```

## MySQL Examples

### Basic Queries
```sql
-- Simple SELECT statement
SELECT 'Hello, World!' as message;

-- Basic math operations
SELECT 
    10 + 5 as addition,
    10 * 5 as multiplication,
    10 / 2 as division;

-- Date and time functions
SELECT 
    NOW() as current_time,
    CURDATE() as current_date,
    YEAR(NOW()) as current_year;
```

### Sample Data Operations
```sql
-- Note: These may not work in all Judge0 configurations
-- as they require table creation permissions

-- Create a temporary table (if supported)
CREATE TEMPORARY TABLE students (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    grade CHAR(1)
);

-- Insert sample data
INSERT INTO students VALUES 
(1, 'Alice', 'A'),
(2, 'Bob', 'B'),
(3, 'Charlie', 'A');

-- Query the data
SELECT * FROM students;
SELECT name FROM students WHERE grade = 'A';
```

## HTML Examples

### Basic Page Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Page</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .highlight { background-color: yellow; }
        .container { max-width: 600px; margin: 0 auto; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to My Website!</h1>
        <p>This is a <span class="highlight">highlighted</span> paragraph.</p>
        
        <h2>My Favorite Things</h2>
        <ul>
            <li>Programming</li>
            <li>Learning new technologies</li>
            <li>Building cool projects</li>
        </ul>
        
        <h2>Contact Form</h2>
        <form>
            <label for="name">Name:</label><br>
            <input type="text" id="name" name="name" required><br><br>
            
            <label for="email">Email:</label><br>
            <input type="email" id="email" name="email" required><br><br>
            
            <label for="message">Message:</label><br>
            <textarea id="message" name="message" rows="4" cols="50"></textarea><br><br>
            
            <button type="submit">Send Message</button>
        </form>
    </div>
</body>
</html>
```

## CSS Examples

### Modern Styling
```css
/* Reset and base styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    margin-top: 50px;
}

h1 {
    color: #2c3e50;
    text-align: center;
    margin-bottom: 30px;
    font-size: 2.5em;
}

.card {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;
    border-left: 4px solid #667eea;
    transition: transform 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.button {
    display: inline-block;
    padding: 12px 24px;
    background: #667eea;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    transition: background 0.3s ease;
}

.button:hover {
    background: #5a6fd8;
}

/* Responsive design */
@media (max-width: 768px) {
    .container {
        margin: 20px;
        padding: 15px;
    }
    
    h1 {
        font-size: 2em;
    }
}
```

## How to Use These Examples

1. **Copy** any of the code snippets above
2. **Open** CodeLab in your browser
3. **Select** the appropriate language from the dropdown
4. **Paste** the code into the editor
5. **Click Run** to execute the code
6. **View** the output in the console

## Tips for Testing

- Start with simple examples before trying complex ones
- Check your internet connection for OnlineCompiler.io-dependent languages (Java, C++, MySQL)
- Use the provided templates as starting points
- Experiment with modifications to understand how the code works
- Download your projects to save your work locally

Happy coding! 🚀
