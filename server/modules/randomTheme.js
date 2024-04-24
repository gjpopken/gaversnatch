const themes = [
'space station',
'underwater city',
'steampunk airship',
'magical academy',
'lost jungle ruins',
'haunted mansion',
'cyberpunk cityscape',
'wild west frontier',
'enchanted forest',
'time travel adventure',
'desert temple',
'sky temple',
]


/**
 * Generates a random index that will reference the themes array above.
 * Eventually, that array could be a table in the database.
 */
const randomThemeIndex = Math.floor(Math.random() * themes.length)

// console.log(themes[randomThemeIndex]);


/**
 * Sends the theme as a string which will be used in the AI prompt
 */
module.exports = themes[randomThemeIndex]