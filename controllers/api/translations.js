const OpenAI = require("openai");
const Translation = require("../../models/translation");

module.exports = {
  create,
  update,
  getDayTranslations,
  getOfficialTranslations,
  getTranslationFeedback,
};

async function create(req, res) {
  try {
    const existingTranslation = await Translation.findOne({
      day: req.body.day,
      user: req.user._id,
    });
    if (existingTranslation) {
      return update(req, res);
    }
    console.log("req.body: ", req.body);
    if (req.body.hebrew && !req.body.greek) {
      req.body.greek = "";
    }
    if (req.body.greek && !req.body.hebrew) {
      req.body.hebrew = "";
    }
    console.log("req.body: ", req.body);
    const dayTranslations = await Translation.create(req.body);
    console.log("dayTranslations: ", dayTranslations);
    res.json(dayTranslations);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function update(req, res) {
  try {
    const filter = { day: req.body.day, user: req.user._id };
    const dayTranslations = await Translation.findOneAndUpdate(
      filter,
      req.body,
      {
        new: true,
      }
    );
    res.json(dayTranslations);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function getDayTranslations(req, res) {
  try {
    const dayTranslations = await Translation.findOne({
      day: req.params.id,
      user: req.user._id,
    });
    res.json(dayTranslations);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function getOfficialTranslations(req, res) {
  const parabibleBASE_URL =
    "https://dev.parabible.com/api/v2/text?modules=NET&reference=";
  const citation = req.params.id;
  const citationWithoutSpaces = citation.replace(/\s/g, "");
  const fetchURL = parabibleBASE_URL + citationWithoutSpaces;

  try {
    const officialTranslationJSON = await fetch(fetchURL);
    if (!officialTranslationJSON.ok) {
      throw new Error("Failed to fetch official translation");
    }
    const response = await officialTranslationJSON.json(); // This is an array with each verse as a separate element.
    const officialTranslation = response
      .map((subarray) => subarray[0].html)
      .join(" ");
    const formattedOfficialTranslation = `
      <p>"${officialTranslation}"</p>
      `;
    res.json(formattedOfficialTranslation);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function getTranslationFeedback(req, res) {
  const translation = req.body[0];
  const citation = req.body[1];
  const message = `Give feedback on this translation of ${citation} from the original language: "${translation}". 
  Organize your response into a 1-2 sentences summary followed by sections on word choice, grammar, and syntax. 
  Limit your response to 200 words. If the translation is sufficiently accurate, do not make up minor corrections just to fill the space.`;

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
      temperature: 1,
      max_tokens: 300,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      response_format: {
        type: "text",
      },
    });
    const formattedFeedback = formatFeedbackToHtml(response.choices[0]["message"]["content"]);
    res.json(formattedFeedback);
  } catch (err) {
    res.status(400).json(err);
  }
}

  // Formats feedback from OpenAI to HTML
  function formatFeedbackToHtml(content) {
    content = content.replace(/^###\s(.+)/gm, '<h3>$1</h3>');    
    content = content.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    content = content.replace(/\*(.+?)\*/g, '<em>$1</em>');
    content = content.replace(/^>\s(.+)/gm, '<blockquote>$1</blockquote>');
    content = content.replace(/^- (.+)/gm, '<li>$1</li>');
    content = content.replace(/(<li>.+<\/li>\n?)+/g, '<ul>$&</ul>');
    content = content.replace(/^(?!<h|<ul|<blockquote)(.+)$/gm, '<p>$1</p>');
    return content;
  }