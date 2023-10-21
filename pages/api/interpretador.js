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

  const animal = req.body.animal || '';
  const option = req.body.option || '';
//  if (animal.trim().length === 0) {
   //  res.status(400).json({
  //     error: {
//         message: "Por favor ingresar textos válidos",
//       }
//     });
//    return;
//   }
  if (animal.trim().length < 4 || !animal.includes('|')) {
    res.status(400).json({
      error: {
        message: "Por favor ingrese al menos una tabla válida con un mínimo de 4 '|' caracteres.",
      }
    });
    return;
  }
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(animal,option),
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

function generatePrompt(animal,option) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
    const capitalizedOpcion =
    option[0].toUpperCase() + option.slice(1).toLowerCase();
  return `Interpretar esta ${capitalizedOpcion} ,  toma en cuenta porcentaje   ${capitalizedAnimal}`;
}
