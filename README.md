# ORION: PRODUCT AS CHARACTER

PRODUCT AS CHARACTER: A virtual try-on AR product visualizer that utilizes AI Voice models as a user interface to interact with the product and enhance the experience. The product is a character, and you can talk to it.

This project was based on the sample OpenAI Realtime Console project that displays the capabilities of the new realtime API from the openAI team. The OpenAI Realtime Console is intended as an inspector and interactive API reference
for the OpenAI Realtime API. It comes packaged with two utility libraries,
[openai/openai-realtime-api-beta](https://github.com/openai/openai-realtime-api-beta)
that acts as a **Reference Client** (for browser and Node.js) and
[`/src/lib/wavtools`](./src/lib/wavtools) which allows for simple audio
management in the browser.

# Starting the console

This is a React project created using `create-react-app` that is bundled via Webpack.
Install it by extracting the contents of this package and using;

```shell
$ npm i
```

Start your server with:

```shell
$ npm start
```

It should be available via `localhost:3000`.

# Description

<img src="/readme/screenshot.png" width="250" />

This project uses the openAI realtime API to create a RAG (retrieval-augmented generation). A LLM (Large language Model) with specific context and specific functions. In this case we created a fictional character; a pair of smart glasses called Orion (Meta smart glasses) that are aware of their features, weight, colors, history, future, and AR in general.

<img src="/readme/RAG.png" width="800" />

In this example you are served with a camera feed and AR glasses placed in your face.
Orion has two functions outside their LLM capabilities:

1. It can memorize things for you
1. It can change color of the glasses you are wearing in AR

# Instructions

This experience has been developed for Desktop and Mobile. I recommend using your phone for a more intuitive experience.
Once it is up and running:

1. Visit: `localhost:3000` or the network IP
1. The app will display a dialog to add an OpenAI Realtime API key. You will need to get your own in the [openAI website](https://platform.openai.com/api-keys). This is mandatory to enjoy the experience
1. Copy and paste the provided key and press OK.
1. You are served with the home page. Click the glasses button to move forward.
1. You are served with the primary experience
1. You can click and HOLD the mic button to talk to the ORION glasses.
   1. Ask them whatever you want to know about the product.
   1. Ask them to change color to a color of your choice.
