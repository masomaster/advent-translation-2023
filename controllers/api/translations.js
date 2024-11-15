const OpenAI = require("openai");
const Translation = require("../../models/translation");
const User = require("../../models/user");

module.exports = {
  create,
  update,
  getDayTranslations,
  getOfficialTranslations,
  getTranslationFeedback,
};

// Helper function to ensure Firebase UID is associated with the user
async function ensureFirebaseUID(req, day) {
  try {
    const firebaseUID = req.user.uid;
    const email = req.user.email;

    // Get user in MongoDB
    const mongoDbUser = await User.findOne({ email });

    // If user exists but UID is missing, add the Firebase UID
    if (mongoDbUser) {
      const mongoUserID = mongoDbUser._id;
      const filter = { user: mongoUserID, day: day };
      const existingTranslation = await Translation.findOne(filter);
      if (existingTranslation && !existingTranslation.firebaseUID) {
        console.log("Updating translation with new Firebase UID");
        const update = { firebaseUID: firebaseUID };
        const updatedTranslation = await Translation.findOneAndUpdate(
          filter,
          update,
          { new: true }
        );
      }
      // }
    } 

    return firebaseUID;
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
}

async function create(req, res) {
  try {
    const firebaseUID = req.user.uid;

    // Check for existing translation for the given day and firebaseUID
    let existingTranslation = await Translation.findOne({
      day: req.body.day,
      firebaseUID: firebaseUID,
    });

    // If translation does not exist with firebaseUID, check for translation with old user ID
    if (existingTranslation === null) {
      const email = req.user.email;

      // Get user in MongoDB
      const mongoDbUser = await User.findOne({ email });
      if (mongoDbUser) {
        const mongoUserID = mongoDbUser._id;

        existingTranslation = await Translation.findOne({
          day: req.body.day,
          user: mongoUserID,
        });

        // If translation found with old user ID, update the translation to include new Firebase UID
        if (existingTranslation) {
          const firebaseUID = await ensureFirebaseUID(req, req.body.day);
        }
      }
    }

    // If we have found an existing translation, update it
    if (existingTranslation) {
      return update(req, res);
    }

    if (req.body.hebrew && !req.body.greek) req.body.greek = "";
    if (req.body.greek && !req.body.hebrew) req.body.hebrew = "";

    req.body.firebaseUID = firebaseUID;
    const dayTranslations = await Translation.create(req.body);
    res.json(dayTranslations);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
}

async function update(req, res) {
  const firebaseUID = req.user.uid;

  try {
    const filter = { day: req.body.day, firebaseUID: firebaseUID };
    const dayTranslations = await Translation.findOneAndUpdate(
      filter,
      req.body,
      { new: true }
    );
    res.json(dayTranslations);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function getDayTranslations(req, res) {
  try {
    const firebaseUID = await ensureFirebaseUID(req, req.params.id);
    const dayTranslations = await Translation.findOne({
      day: req.params.id,
      firebaseUID: firebaseUID,
    });

    res.json(dayTranslations);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function getOfficialTranslations(req, res) {
  const parabibleBASE_URL =
    "https://dev.parabible.com/api/v2/text?modules=NET&reference=";
  const citation = req.params.id.replace(/\s/g, "");
  const fetchURL = parabibleBASE_URL + citation;

  try {
    const officialTranslationJSON = await fetch(fetchURL);
    if (!officialTranslationJSON.ok) {
      throw new Error("Failed to fetch official translation");
    }
    const response = await officialTranslationJSON.json();
    const officialTranslation = response
      .map((subarray) => subarray[0].html)
      .join(" ");
    res.json(`<p>"${officialTranslation}"</p>`);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function getTranslationFeedback(req, res) {
  const [translation, citation] = req.body;
  const message = `Give a critical analysis of the quality and accuracy of this translation of ${citation}. 
  Evaluate whether it correctly conveys the meaning and context of the original Hebrew/Greek. 
  Begin with a 1-2 sentence summary focusing on overall accuracy, then assess word choice (general meaning, not slight variations in sense), grammar, and syntax in discrete sections. 
  Identify any mistranslations, inaccuracies, or missing elements in the translation, pointing out deviations from the original meaning. 
  If the translation is generally fine, however, do not identify unimportant changes just for the sake of giving critical feedback; 
  it is fine to say it is an adequate translation.
  Avoid personal opinions or theological interpretations.
  Limit your response to 200 words. Here is the translation to evaluate: ${translation}`;

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
      temperature: 1,
      max_tokens: 300,
    });
    const formattedFeedback = formatFeedbackToHtml(
      response.choices[0].message.content
    );
    res.json(formattedFeedback);
  } catch (err) {
    res.status(400).json(err);
  }
}

function formatFeedbackToHtml(content) {
  content = content.replace(/^###\s(.+)/gm, "<h3>$1</h3>");
  content = content.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  content = content.replace(/\*(.+?)\*/g, "<em>$1</em>");
  content = content.replace(/^>\s(.+)/gm, "<blockquote>$1</blockquote>");
  content = content.replace(/^- (.+)/gm, "<li>$1</li>");
  content = content.replace(/(<li>.+<\/li>\n?)+/g, "<ul>$&</ul>");
  content = content.replace(/^(?!<h|<ul|<blockquote)(.+)$/gm, "<p>$1</p>");
  return content;
}
