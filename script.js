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




import ollama from "ollama";
import fs from "fs";

async function processQuestion() {
  try {
    
    let q = fs.readFileSync("./q.txt", "utf-8");
    console.log("Question:", q);

   
    const response = await ollama.chat({
      model: "llama3.2:latest",
      messages: [{ role: "user", content: q }],
    });

    
    fs.writeFileSync("./a.txt", response.message.content);
    console.log("Response written to a.txt");
  } catch (error) {
    console.error("Error occurred:", error.message);
  }
}


(async () => {
  await processQuestion();
})();
