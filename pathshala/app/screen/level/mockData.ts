export const lessonData = {
  Print: {
    lessonName: "Print Statements",
    description: "Learn basic print statements in Java",
    steps: [
      {
        title: "Introduction to Print",
        content:
          "In Java, we use System.out.println() to display text on the console. This is one of the most basic ways to output information from your program.",
        example: 'System.out.println("Hello, World!");',
        task: "Write a program to print 'Hello, Java!'",
        solution: 'System.out.println("Hello, Java!");',
      },
      {
        title: "Print with Variables",
        content:
          "You can combine text and variables in print statements using the + operator for concatenation.",
        example: 'String name = "John";\nSystem.out.println("Hello, " + name);',
        task: "Create a variable with your name and print a greeting",
        solution:
          'String name = "Alice";\nSystem.out.println("Welcome, " + name);',
      },
      {
        title: "Multiple Print Statements",
        content:
          "You can use multiple print statements to output text on different lines.",
        example:
          'System.out.println("Line 1");\nSystem.out.println("Line 2");',
        task: "Print three different messages on separate lines",
        solution:
          'System.out.println("First line");\nSystem.out.println("Second line");\nSystem.out.println("Third line");',
      },
      {
        title: "Print Without New Line",
        content:
          "Use System.out.print() instead of println() to print without adding a new line at the end.",
        example:
          'System.out.print("Hello ");\nSystem.out.print("World!"); // Output: Hello World!',
        task: "Use print() to display text in the same line",
        solution:
          'System.out.print("Java ");\nSystem.out.print("Programming");',
      },
    ],
  },

  Strings: {
    lessonName: "String Operations",
    description: "Master string manipulation in Java",
    steps: [
      {
        title: "String Basics",
        content:
          "Strings in Java are objects that represent sequences of characters.",
        example: 'String text = "Hello";\nint length = text.length();',
        task: "Create a string and find its length",
        solution: 'String message = "Welcome";\nint messageLength = message.length();',
      },
      {
        title: "String Methods",
        content: "Java provides many built-in methods to manipulate strings.",
        example: 'String text = "Hello World";\nString upper = text.toUpperCase();',
        task: "Convert a string to uppercase and lowercase",
        solution:
          'String text = "Java Programming";\nString upper = text.toUpperCase();\nString lower = text.toLowerCase();',
      },
      {
        title: "Substring and Replace",
        content:
          "You can extract parts of strings and replace text using substring() and replace().",
        example:
          'String text = "Java Programming";\nString part = text.substring(0, 4);\nString replaced = text.replace("Java", "Python");',
        task: "Extract and replace words in a string",
        solution:
          'String name = "Learning Java";\nString sub = name.substring(9);\nString newStr = name.replace("Java", "Kotlin");',
      },
    ],
  },

  Variables: {
    lessonName: "Variables in Java",
    description: "Understanding variable declaration and types",
    steps: [
      {
        title: "Variable Declaration",
        content: "Learn how to declare and initialize variables in Java.",
        example: 'int number = 10;\nString text = "Hello";',
        task: "Declare variables of different types",
        solution: 'int age = 25;\nString name = "John";\nboolean isStudent = true;',
      },
      {
        title: "Data Types",
        content:
          "Java has various data types like int, double, char, boolean, and String.",
        example:
          'int count = 5;\ndouble price = 99.99;\nchar grade = \'A\';\nboolean valid = true;',
        task: "Create variables of different types and print them",
        solution:
          'int roll = 10;\ndouble height = 5.8;\nchar initial = \'R\';\nboolean passed = true;\nSystem.out.println(roll + \", \" + height + \", \" + initial + \", \" + passed);',
      },
    ],
  },

  Arrays: {
    lessonName: "Array Operations",
    description: "Working with arrays in Java",
    steps: [
      {
        title: "Array Declaration",
        content: "Learn how to declare and initialize arrays.",
        example: 'int[] numbers = {1, 2, 3, 4, 5};',
        task: "Create an array of five numbers",
        solution: 'int[] scores = {95, 88, 76, 92, 85};',
      },
      {
        title: "Accessing Elements",
        content: "Access array elements using their index starting from 0.",
        example: 'int first = numbers[0];\nSystem.out.println(first);',
        task: "Access and print the first and last elements of an array",
        solution:
          'int[] nums = {10, 20, 30, 40};\nSystem.out.println(nums[0]);\nSystem.out.println(nums[3]);',
      },
      {
        title: "Array Length",
        content: "Use the length property to find the size of an array.",
        example: 'int len = numbers.length;',
        task: "Print the number of elements in an array",
        solution:
          'int[] data = {3, 6, 9, 12, 15};\nSystem.out.println(data.length);',
      },
    ],
  },

  Functions: {
    lessonName: "Functions in Java",
    description: "Creating and using functions",
    steps: [
      {
        title: "Function Basics",
        content: "Learn how to declare and call functions.",
        example:
          'public static void greet() {\n    System.out.println("Hello!");\n}',
        task: "Create a function that prints a greeting",
        solution:
          'public static void sayHello(String name) {\n    System.out.println("Hello, " + name + "!");\n}',
      },
      {
        title: "Function with Return Value",
        content:
          "Functions can return values using the return keyword.",
        example:
          'public static int add(int a, int b) {\n    return a + b;\n}',
        task: "Create a function that adds two numbers and returns the result",
        solution:
          'public static int multiply(int a, int b) {\n    return a * b;\n}',
      },
    ],
  },

  Loops: {
    lessonName: "Loops in Java",
    description: "Repeating code using loops",
    steps: [
      {
        title: "For Loop",
        content: "A for loop repeats code a fixed number of times.",
        example: 'for(int i = 0; i < 5; i++) {\n    System.out.println(i);\n}',
        task: "Print numbers from 1 to 10 using a for loop",
        solution:
          'for(int i = 1; i <= 10; i++) {\n    System.out.println(i);\n}',
      },
      {
        title: "While Loop",
        content: "A while loop runs as long as its condition is true.",
        example: 'int i = 0;\nwhile(i < 5) {\n    System.out.println(i);\n    i++;\n}',
        task: "Print even numbers less than 10 using a while loop",
        solution:
          'int i = 0;\nwhile(i < 10) {\n    System.out.println(i);\n    i += 2;\n}',
      },
    ],
  },

  Conditionals: {
    lessonName: "Conditionals in Java",
    description: "Making decisions in programs using if-else",
    steps: [
      {
        title: "If-Else Basics",
        content: "If-else statements control program flow based on conditions.",
        example: 'int x = 10;\nif(x > 5) {\n    System.out.println("Greater!");\n} else {\n    System.out.println("Smaller!");\n}',
        task: "Check whether a number is positive or negative",
        solution:
          'int num = -3;\nif(num >= 0) {\n    System.out.println("Positive");\n} else {\n    System.out.println("Negative");\n}',
      },
      {
        title: "Nested If",
        content: "You can nest if statements for multiple conditions.",
        example: 'int score = 85;\nif(score >= 90) {\n    System.out.println("A");\n} else if(score >= 80) {\n    System.out.println("B");\n}',
        task: "Write code to grade based on score",
        solution:
          'int marks = 72;\nif(marks >= 90) System.out.println("A");\nelse if(marks >= 75) System.out.println("B");\nelse System.out.println("C");',
      },
    ],
  },

  Classes: {
    lessonName: "Classes and Objects",
    description: "Understanding object-oriented programming basics",
    steps: [
      {
        title: "Creating a Class",
        content: "A class defines the blueprint for objects.",
        example:
          'class Person {\n    String name;\n    int age;\n}',
        task: "Create a class Car with model and price fields",
        solution:
          'class Car {\n    String model;\n    double price;\n}',
      },
      {
        title: "Creating Objects",
        content: "You can create objects using the new keyword.",
        example:
          'Person p = new Person();\np.name = "John";\np.age = 25;',
        task: "Create a Student object and set its attributes",
        solution:
          'class Student {\n    String name;\n    int roll;\n}\nStudent s = new Student();\ns.name = "Alice";\ns.roll = 101;',
      },
    ],
  },
};


export const testData = {
  Print: {
    questions: [
      {
        question: "Which statement is used to print text in Java?",
        answers: ["System.out.println()", "console.log()", "print()", "echo()"],
        correctAnswer: 0,
      },
      {
        question:
          'What will be the output of: System.out.println("Hello" + " " + "World");',
        answers: ["HelloWorld", "Hello World", "Hello + World", "Error"],
        correctAnswer: 1,
      },
      {
        question: "Which character is used for string concatenation in Java?",
        answers: ["&", ",", "+", "|"],
        correctAnswer: 2,
      },
    ],
  },

  Strings: {
    questions: [
      {
        question: "Which method returns the length of a String?",
        answers: ["size()", "length()", "count()", "getLength()"],
        correctAnswer: 1,
      },
      {
        question: "How do you convert a String to uppercase in Java?",
        answers: [
          "toUpperCase()",
          "uppercase()",
          "convertUpper()",
          "makeUpper()",
        ],
        correctAnswer: 0,
      },
      {
        question: "What does substring(0, 4) return for 'JavaCode'?",
        answers: ["JavaC", "Java", "ava", "Code"],
        correctAnswer: 1,
      },
    ],
  },

  Variables: {
    questions: [
      {
        question: "Which data type is used to store decimal numbers?",
        answers: ["int", "double", "boolean", "char"],
        correctAnswer: 1,
      },
      {
        question: "What is the default value of an uninitialized int variable?",
        answers: ["0", "null", "undefined", "Error"],
        correctAnswer: 0,
      },
    ],
  },

  Arrays: {
    questions: [
      {
        question: "How do you access the third element of an array named arr?",
        answers: ["arr[2]", "arr(3)", "arr{2}", "arr[3]"],
        correctAnswer: 0,
      },
      {
        question: "What property gives the length of an array?",
        answers: ["size", "length", "count", "capacity"],
        correctAnswer: 1,
      },
    ],
  },

  Functions: {
    questions: [
      {
        question: "Which keyword is used to return a value from a method?",
        answers: ["get", "return", "output", "yield"],
        correctAnswer: 1,
      },
      {
        question: "Which of these defines a static method?",
        answers: [
          "public static void name()",
          "public name()",
          "method static name()",
          "function name()",
        ],
        correctAnswer: 0,
      },
    ],
  },

  Loops: {
    questions: [
      {
        question: "What keyword is used to stop a loop immediately?",
        answers: ["stop", "exit", "break", "end"],
        correctAnswer: 2,
      },
      {
        question: "Which loop is guaranteed to run at least once?",
        answers: ["for", "while", "do-while", "foreach"],
        correctAnswer: 2,
      },
    ],
  },

  Conditionals: {
    questions: [
      {
        question: "What is used to compare two values in an if condition?",
        answers: ["=", "==", "equals", "compare"],
        correctAnswer: 1,
      },
      {
        question: "Which keyword starts a conditional branch?",
        answers: ["if", "else", "switch", "case"],
        correctAnswer: 0,
      },
    ],
  },

  Classes: {
    questions: [
      {
        question: "What keyword is used to create an object?",
        answers: ["new", "create", "object", "init"],
        correctAnswer: 0,
      },
      {
        question: "Which concept is the foundation of OOP?",
        answers: [
          "Encapsulation",
          "Recursion",
          "Iteration",
          "Compilation",
        ],
        correctAnswer: 0,
      },
    ],
  },
};
