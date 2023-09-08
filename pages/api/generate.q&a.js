import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const va01 = req.body.va01 || '';
  const va02 = req.body.va01 || '';
  const enfoque = req.body.va01 || '';
  if (va01.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Por favor ingresar textos válidos",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(va01,va02,enfoque),
      temperature: 0.6,
      max_tokens: 1024,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(va01,va02,enfoque) {
  const capitalizedVar01 =va01[0].toUpperCase() + va01.slice(1).toLowerCase();
  const capitalizedVar02 =va02[0].toUpperCase() + va02.slice(1).toLowerCase();
  const capitalizedEnfoque =enfoque[0].toUpperCase() + enfoque.slice(1).toLowerCase();

  return `respoder y listar estas preguntas  tomando en cuentas estos datos: ${capitalizedVar01}, ${capitalizedVar02}, ${capitalizedEnfoque}:  1¿Por qué escogiste la variables para la investigación en tu trabajo?
  2¿Porque escogiste este enfoque? 
 3 ¿Qué es y en que consiste la escala de Likert?
 4 ¿Qué es la escala nominal y ordinal en Likert?`;
}
