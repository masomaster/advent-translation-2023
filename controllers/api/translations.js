const Translation = require("../../models/translation");

module.exports = {
  create,
  update,
  getDayTranslations,
  getOfficialTranslations,
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
    const officialTranslation = response.map(subarray => subarray[0].html).join(" ");
    res.json(officialTranslation);
  } catch (err) {
    res.status(400).json(err);
  }
}
