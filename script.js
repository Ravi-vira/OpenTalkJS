// Task 1

// import ollama from "ollama";
// const response = await ollama.chat({
//     model: "llama3.1:8b",
//     messages: [{ role: "user", content: "Generate marketing emails" }],
// });
// console.log(response.message.content);

//task 2
import ollama from "ollama";
import fs from "fs";

let q= fs.readFileSync("./q.txt", "utf-8");
console.log(q)

askQuestion()
async function askQuestion() {
  try {
    const response = await ollama.chat({
      model: "llama3.2:latest",
      messages: [{ role: 'user', content: q }]
    });

    fs.writeFileSync("./a.txt", response.message.content);

  } catch (error) {
    console.error("Error occurred:", error.message);
  }
}