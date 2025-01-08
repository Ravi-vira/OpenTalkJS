//task 1
// import ollama from "ollama";

// async function runChat() {
//   try {
//     const response = await ollama.chat({
//       model: "llama3.2:latest",
//       messages: [{ role: 'user', content: "Generate marketing emails" }]
//     });

//     console.log("Chatbot Response:", response.message.content);
//   } catch (error) {
//     console.error("Error occurred:", error.message);
//   }
// }

// runChat();


// task 2

// import ollama from "ollama";
// import fs from "fs";

// async function processQuestion() {
//   try {
    
//     let q = fs.readFileSync("./q.txt", "utf-8");
//     console.log("Question:", q);

   
//     const response = await ollama.chat({
//       model: "llama3.2:latest",
//       messages: [{ role: "user", content: q }],
//     });

    
//     fs.writeFileSync("./a.txt", response.message.content);
//     console.log("Response written to a.txt");
//   } catch (error) {
//     console.error("Error occurred:", error.message);
//   }
// }


// (async () => {
//   await processQuestion();
// })();


//Task 3

import ollama from "ollama";
import fs from "fs/promises";
import path from "path";

async function readQuestionsAndAnswer() {
  const questionsFolder = "./Questions";
  const answersFolder = "./Answers";

  try {
    // Ensure the Answers folder exists
    await fs.mkdir(answersFolder, { recursive: true });

    // Read all files in the Questions folder
    const questionFiles = await fs.readdir(questionsFolder);

    // Process each question file
    await Promise.all(
      questionFiles.map(async (file) => {
        const questionPath = path.join(questionsFolder, file);
        const answerPath = path.join(answersFolder, file);

        try {
          const questionContent = await fs.readFile(questionPath, "utf-8");
          const answerContent = await askQuestion(questionContent);
          await fs.writeFile(answerPath, answerContent);
          console.log(`Processed: ${file}`);
        } catch (error) {
          console.error(`Error processing ${file}:`, error.message);
        }
      })
    );

    console.log("All questions processed.");
  } catch (error) {
    console.error("Error reading questions:", error.message);
  }
}

async function askQuestion(question) {
  try {
    const response = await ollama.chat({
      model: "llama3.2:latest",
      messages: [{ role: "user", content: question }],
    });
    return response.message.content;
  } catch (error) {
    console.error("Error occurred while asking question:", error.message);
    throw error;
  }
}

// Call the main function
readQuestionsAndAnswer();

