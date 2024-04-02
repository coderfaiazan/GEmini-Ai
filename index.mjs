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
     const model = genAI.getGenerativeModel({ 
      model: "gemini-pro",
      response_format:{"type":"json_object"},
     
    });
     const prompt = `${input}.make qiuzz of 10 mcq having 4 options and answer seperatly in foolowing json
     format.{"question":[{"id":0,"question":"","options":[],"answer":""}, ...]} `
     
     const result = await model.generateContent(prompt)
     const response = await result.response;
     //console.log("Content:", response.candidates[0].content);
     const json = JSON.stringify(response.candidates[0].content)
     const jsonparse = JSON.parse(json)
     console.log(jsonparse);
   } catch (error) {
       console.log("Can't generate Because of the internal error",error);
   }
    
}
run();