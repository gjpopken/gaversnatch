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

const randomThemeIndex = Math.floor(Math.random() * themes.length)

// console.log(themes[randomThemeIndex]);

module.exports = themes[randomThemeIndex]