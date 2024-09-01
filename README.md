# I am: Rock, Paper, Scissors . . .

## Overview

This project is a **Multiplayer Rock Paper Scissors** game with a unique twist. Inspired by the scene *"The Oldest Game"* from Netflix's *The Sandman* ([watch here](https://youtu.be/iZOwaeAEIw0?si=jdPaKsYxEO3JqHz7)), the traditional "rock, paper, scissors" mechanics are replaced with custom prompt submissions. You decide what person, place, thing or concept will face off against your opponent, limited only by your imagination. 

Players submit any prompt, and **ChatGPT** evaluates the submissions to decide the winner based on its interpretation of each player's move. Additionally, the game is visually enhanced through a custom **Google search engine integration**, which fetches relevant images corresponding to the submitted prompts.

The project was built using the **MEVN** stack (**M**ongoDB, **E**xpress, **V**ue, and **N**ode.js). 

## Try It Out

You can [try it out here!](https://iam.vfos.dev)

- Create or join a game room
- Wait until another player has joined
- Submit a custom prompt on your move
- Choose an image retrieved from Google's Custom Search engine to represent your prompt
- Watch as ChatGPT evaluates the prompts and determines the winner
- Continue playing until one player runs out of health, and the other wins


## Features

1. **Custom Prompt Submissions**:
   - Players submit any text prompt as their "move"
   - Instead of "rock," "paper," or "scissors," prompts can be anything (e.g., "dragon", "spaceship", "cat")

2. **Custom Google Search Engine Integration**:
   - The game retrieves relevant images from a Google custom search engine for each prompt to enhance the visual experience   

3. **ChatGPT Decision Making**:
   - ChatGPT analyzes the prompts and decides which player’s submission would win based on its knowledge and reasoning
      
4. **Multiplayer Mode**:
   - Multiple players can join and submit their prompts in real-time
   - Players face off one-on-one in rooms, and the winner is determined at the end of each round
   
5. **Real-time Communication**:
   - Powered by **Socket.io** to allow real-time interaction between multiple players

## Tech Stack

- **Frontend**: Vue.js for the UI and interaction
- **Backend**: Node.js with Express.js for the server
  - **API Integrations**:
    - **ChatGPT** for determining game outcomes based on prompts
    - **Google Custom Search** for retrieving images related to each player's prompt
  - **Websockets**: Socket.io for player sessions and game syncing
- **Database**: MongoDB for players and game session storage

# Enviroment variables

## Frontend
```
# - Server Connection -
# VITE_API=
```

## Backend
```
# - Server Config -
# origins=
# port=

# - Debugging -
# SocketLogging=

#############
# APIs Keys #
#############

# - Google -
# GoogleAPIKey=
# CustomSearchEngine=

# - Mongo -
# MongoDB_URL=

# - OpenAI -
# OPENAI_API_KEY=
```