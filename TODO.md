Remaining Items for GAVERSNATCH

What would be the next right thing to do? 
- [x] Research some prompt engineering with Google Gemini to get some unique rooms. 
    - [x] Have the AI write the JSON object that is being sent to the server. 
- [x] Aim to have the player move around into unique rooms. 
- [x] Get the styling feeling better. 

Things that should be done by Friday:
- [x] Story's name in the Game View
- [x] Random theme for GEMINI prompt
- [x] Loading when GEMINI is generating descriptions.
- [x] User's actions appear in the log.


Things that would be nice:
- [] Feels more like a game - player can use items
- [x] Improved UI with Images


How do I want the items system to work?
- The user can pick up items, which adds them to inventory. 
    - Room has items in it. How does the user select the item without typing?
    - Room object has to update when item is gone. 

    Maybe there's a command to search the room. If there's something to be grabbed, they grab it. (Later, bad things could happen, too.)

- [x] Rooms have an array of item_ids. 
- [x] Search room command.
- [x] If you pick up something, it is POSTed to the inventory table, 
- [x] and rendered to DOM
- [x] Room's state is altered
- [x] delete route fixed for people who have items.

For Presentation: 
- [] Change favicon
- [] 

Should there be a win state for the demo?
If so, is there an easy way to implement that? Like adding a new table? (maybe not so easy.) Or If you search a room and find a particular item, you win?



SOMEDAY
- Player can use items
    - Player selects command to use specific item. 
        - 'The locked door is now unlocked.'

- [] Use items render in commands.
- [] Using a key next to a room with a locked door unlocks it. 
- [] Using other objects returns that it doesn't do anything. 