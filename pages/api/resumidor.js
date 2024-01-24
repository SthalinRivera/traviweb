import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

export default async function (req, res) {


  const text_resumen = req.body.text_resumen || '';
  const option = req.body.option || '';
  if (text_resumen.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Por favor ingresar textos válidos",
      }
    });
    return;
  }

  try {

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: generatePrompt(text_resumen, option) }],
      model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0].message.content);

    res.status(200).json({ result: completion.choices[0].message.content });
  } catch (error) {
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

function generatePrompt(text_resumen, option) {
  const capitalizedText =
    text_resumen[0].toUpperCase() + text_resumen.slice(1).toLowerCase();
  const capitalizedOption =
    option[0].toUpperCase() + option.slice(1).toLowerCase();

  return `Actuar  como un experto en resumir textos de forma ${capitalizedOption}  el siguiente texto: ${capitalizedText}`;
}
