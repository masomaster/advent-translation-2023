export default function VersePanel( {language, dayData, languageIsHebrew, hebrewCitation, englishCitation} ) {
  return (
    <div className="verse-text">
      <p className={language}>{dayData.text}</p>
      <p className={`${language}-verse`}>
        {languageIsHebrew ? `${hebrewCitation} [Heb.]` : englishCitation}
      </p>
    </div>
  );
}
