 import dotenv from "dotenv"
 dotenv.config({
    path: './.env'
})

 import { GoogleGenerativeAI } from "@google/generative-ai";
 
const genAI = new  GoogleGenerativeAI(process.env.API_KEY);
const input = `make quizz of 5 mcq of following text.To oversimplify significantly, the importance of embedded information processing technologies is to support and enhance decision-making capability.  Should the UAS change course?  Does the UAS have enough fuel to get home?  If not, what should happen?  Is the UAS about to fly into a tree?  The entire flight of a UAS, whether alone or in a swarm, is filled with the need to make and execute decisions.

The point of integrating advanced information technologies into UASs is to speed up the ability to make and execute appropriate decisions.  Those two phrases: “make and execute” and “appropriate” are critical to understanding the problem space.  “Make and execute” imply data input to a decision-making system, data output from such a decision-making system, and a triggering mechanism for a decision acting element.  “Appropriate” implies that the decision and triggering processes have been thoroughly tested to comply with the rules of engagement and the policies that exist for the mission profile.  These are decision cycles: a decision made based on input, action is done based on the decision, and a reassessment of the situation is performed to see if further action is needed.  Rinse and repeat, as needed.

The point of attacking information technologies in UASs is to disrupt or deceive the decision cycle, for one or more purpose.  Therefore, it is useful to have a short discussion on conceptualizing decision cycles.  There are many different ways to conceptualize how decisions are formed, but one that has currency and broad based acceptance is the OODA Loop, first conceptualized by John Boyd (Richards, 2012) and updated by many, including Julie Ryan in 1996 (Nichols, Ryan, & Ryan, 2000).  There have been many other contributors to the nuanced application of the OODA Loop as well, including criticisms (Forsling, 2018).  The point is that the useful but only as far as the nuanced application of it allows.  Further, the model was developed in a time when decisions were definitely restricted to the human brain, hence the development of OODA 2.0 (Nichols, Ryan, & Ryan, 2000, pp. 477-488).  Both versions of the model are useful in planning C-UAS activities. See Figure 1-1.

The original OODA Loop is normally simplified to a simple loop that encompasses four steps connected with arrows.  The four steps comprise a decision cycle.  The first step is to observe what is going on.  The second step is to orient those observations within the context of the environment and activities.  The third step is to create candidate decisions based on the observations, the orientation, and mission.  The fourth step is to act on the decision(s) that are deemed appropriate.  Finally, the cycle repeats as needed.  The following diagram depicts the OODA Loop as normally drawn:

Figure 1-1: Simplified OODA Loop

 



 

Source: (Richards, 2012)

 

The literature is clear to point out, however, that the OODA conceptualized by Boyd was much more nuanced, considering the role of feedback, mental biases, and experience level throughout the entire model.  Figure 1-2, taken from (Richards, 2012), shows the version of the OODA drawn by Boyd:

 

Figure 1-2: Boyd’s Drawing of the OODA Loop
`
async function run() {
   try {
     const model = genAI.getGenerativeModel({ model: "gemini-pro"});
     const prompt = `${input}.make qiuzz of mcq having 4 options and answer seperatly in foolowing json
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