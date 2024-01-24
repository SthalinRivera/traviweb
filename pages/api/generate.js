import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

export default async function (req, res) {
  if (!openai.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const animal = req.body.animal || '';
  const option = req.body.option || '';
  if (animal.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Por favor ingresar textos válidos",
      }
    });
    return;
  }

  try {
    const completion =await openai.chat.completions.create({
      messages: [{ role: "system", content: generatePrompt(animal,option)}],
      model: "gpt-3.5-turbo",
    });

    //console.log(completion.choices[0].message.content);

    res.status(200).json({ result: completion.choices[0].message.content });
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
  return `Realizar  un parafraseo  ${capitalizedOpcion}  y mejorar el siguiente texto: ${capitalizedAnimal}`;
}
