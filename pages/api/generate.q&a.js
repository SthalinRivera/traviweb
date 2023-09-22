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
      prompt: generatePrompt(va01, va02,concatenatedValues),
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

function generatePrompt(va01, va02,concatenatedValues) {
  const capitalizedVar01 = va01[0].toUpperCase() + va01.slice(1).toLowerCase();
  const capitalizedVar02 = va02[0].toUpperCase() + va02.slice(1).toLowerCase();
  const capitalizedconcatenatedValues = concatenatedValues[0].toUpperCase() + concatenatedValues.slice(1).toLowerCase();

  return `responder estas preguntas y enumeralas tomando en cuentas estos datos: Variable 01 o independiente"${capitalizedVar01}", Variable 02 o dependendiente "${capitalizedVar02}", Enfoque de investigación "${capitalizedconcatenatedValues}" las siguientes preguntas son:  
1. ¿Por qué escogiste la variables para la investigación en tu trabajo?
2. ¿Porque escogiste este enfoque? 
3. ¿Qué es y en que consiste la escala de Likert?
4. ¿Qué es la escala nominal y ordinal en Likert?
5. ¿Por qué escogiste la variable D/I para la investigación en tu trabajo? 
6. ¿Cuál ha sido tu diseño de estudio y por qué?,
7. ¿Qué opinión tienes sobre la herramienta que utilizaste para tu investigación?
8. ¿Qué método de análisis de datos utilizaste?
9. ¿Qué es una correlación de variables, en que consiste y para qué sirve?
10. ¿Explique las razones de por qué su investigación es no experimental, preexperimental, cuasiexperimental o experimento puro?
11. ¿Cuál es el enfoque de tu investigación? ¿Por qué?
12. ¿Qué nivel de investigación has empleado? ¿Por qué?
 `
    ;
}
