// Hey, Utkarsh if you are reading thin is future, remember you are great.

var express = require('express');
var app = express();
var ejs = require("ejs");
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();

// to get css
app.use(express.static("public"));

// bodyparser
app.use(bodyParser.urlencoded({extended:true}));

// create application/json parser
var jsonParser = bodyParser.json()

app.set('view engine', 'ejs');

// session management
app.use(session({
  secret: 'your secret key',
  resave: true,
  saveUninitialized: true
}));

// Requiring Configuration and Open AI Api
const { Configuration, OpenAIApi } = require("openai");
const { query } = require('express');

// API KEY
const configuration = new Configuration({
  apiKey: process.env.encrypted_api_key,
});

// Global variables
var answer = [];
var gptanswer = answer;
var subjectof = [];
var subjectt = subjectof;
var tap = [];

// Routing
app.get('/', (req, res) => {
  res.render("index",{
    gptanswer: req.session.gptanswer || [],
    subject: req.session.subjectof || []
  })
});




app.post("/", async function (req, res) {
  // open ai
  async function getAiResponse(topic) {
    // This is array which colloects questiones
    tap.shift(); // shift deleted first questiones so it always only one questions remains in array that is the current question

    // push pushes the questiones in array after the last question got deleted
    tap.push(topic);

    // just logging the question
    console.log(tap);

    const openai = new OpenAIApi(configuration);
    const completion = await openai.createCompletion({
      model: "text-davinci-003",

      // English
      prompt: topic,

      // Hindi
      // prompt: topic+"in hindi",

      max_tokens: 1024,
      n: 1,
      stop: null,
      temperature: 0.7
      
    });
    var respon = completion.data.choices[0].text;
    gptanswer.push(respon);
    var status = getAiResponse.status;
    req.session.gptanswer = gptanswer;
    req.session.subjectof = subjectof;
    res.render("result",{
      gptanswer: gptanswer,
      subject: subjectof
    });
  }

  // What to write
  let what_to_write = req.body.whattowrite;
  
  // Tone of Application
  let tone_of_application = req.body.tone_of_application;
   
  // To whom writing
  let to_whome = req.body.to_whome;

  // Subject Line
  let sub_line = req.body.sub_line;
  subjectof.push(sub_line);

  // This th query to ask to chat gpt
  let ques = "Write a " + tone_of_application + " " + what_to_write + " " + to_whome + " " + "with subject " + " " + sub_line;
  console.log(ques);

  await getAiResponse(ques);
});

// Listening the app on port 3000
app.listen(3000, () => {
  console.log('Chatbot listening on port 3000!');
});
