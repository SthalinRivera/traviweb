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
  const va02 = req.body.va02 || '';
  if (va01.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Por favor ingresar textos válidos",
      }
    });
    return;
  }
  if (va02.trim().length === 0) {
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
      prompt: generatePrompt(va01,va02),
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

function generatePrompt(va01,va02) {
  const capitalizedva01 = va01[0].toUpperCase() + va01.slice(1).toLowerCase();
  const capitalizedva02 = va02[0].toUpperCase() + va02.slice(1).toLowerCase();
  return `Generar una matriz de consistencia tomando en cuenta "Problemas general y especificos", "objetivos general y especificos" , "hipotisis general y especificos", "dimensiones", "variable indicadores" , "Enfoque de investigación" y metodologia
 de las siguientes variables:${capitalizedva01} y ${capitalizedva02}`;
}
