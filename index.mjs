 import dotenv from "dotenv"
 dotenv.config({
    path: './.env'
})

 import { GoogleGenerativeAI } from "@google/generative-ai";
 import { getTextFromPDF } from "./pdftotext.mjs";
 
const genAI = new  GoogleGenerativeAI(process.env.API_KEY);
const path = ""
const pdfPath =  await getTextFromPDF(path);
const comment = "make quizz of physics 11 questions";
const input = comment +' '+ pdfPath;

async function run() {
   try {
     const model = genAI.getGenerativeModel({ model: "gemini-pro"});
     const prompt = `${input}.make qiuzz of 10 mcq having 4 options and answer seperatly in foolowing json
     format.{"question":[{"id":0,"question":"","options":[],"answer":""}, ...]} `
     
     const result = await model.generateContent(prompt)
     const response = await result.response;
     const text = response.text();
     console.log(text);
   } catch (error) {
       console.log("Can't generate Because of the internal error",error);
   }
    
}
run();