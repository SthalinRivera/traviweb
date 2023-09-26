import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "La clave API de OpenAI no está configurada; siga las instrucciones en README.md",
      }
    });
    return;
  }

  const va01 = req.body.va01 || '';
  const va02 = req.body.va02 || '';
  const concatenatedValues = `Enfoque: ${req.body.enfoque || ''}, Tipo: ${req.body.tipo || ''}, Diseño: ${req.body.diseno || ''}, TDisExp: ${req.body.tDisExp || ''}, TDisNoExp: ${req.body.tDisNoExp || ''}, Nivel: ${req.body.nivel || ''}`;
const pregunta= req.body.pregunta || '';
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
      prompt: generatePrompt(va01, va02,concatenatedValues,pregunta),
      temperature: 0.6,
      max_tokens: 1024,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error con la solicitud de API OpenAI: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'Se produjo un error durante su solicitud.',
        }
      });
    }
  }
}

function generatePrompt(va01, va02,concatenatedValues,pregunta) {
  const capitalizedVar01 = va01[0].toUpperCase() + va01.slice(1).toLowerCase();
  const capitalizedVar02 = va02[0].toUpperCase() + va02.slice(1).toLowerCase();
  const capitalizedconcatenatedValues = concatenatedValues[0].toUpperCase() + concatenatedValues.slice(1).toLowerCase();
  const preguntaValue = pregunta[0].toUpperCase() + pregunta.slice(1).toLowerCase();

  return `responder esta pregunta esta  Variable 01 o independiente"${capitalizedVar01}", Variable 02 o dependendiente "${capitalizedVar02}", metodologicos de "${capitalizedconcatenatedValues}" de la siguiente pregunta: "${preguntaValue}"

 `
    ;
}
