 import dotenv from "dotenv"
 dotenv.config({
    path: './.env'
})

 import { GoogleGenerativeAI } from "@google/generative-ai";
 
const genAI = new  GoogleGenerativeAI(process.env.API_KEY);
const input = "make quizz of 5 random muliple choice question with 4 options and answer seperatly."

async function run() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const prompt = `${input}.give output in json format.`
    
    const result = await model.generateContent(prompt)
    const response = await result.response;
    const text = response.text();
    console.log(text);
    
}
run();