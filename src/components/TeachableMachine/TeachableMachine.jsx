import React, { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as speechCommands from "@tensorflow-models/speech-commands";

export default function TeachableMachine() {
  const [predictions, setPredictions] = useState();
  const [model, setModel] = useState();

  async function loadModel() {
    const URL = "https://teachablemachine.withgoogle.com/models/pLngQGEdl/";
    const checkpointURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    const recognizer = speechCommands.create(
      "BROWSER_FFT",
      undefined,
      checkpointURL,
      metadataURL
    );
    await recognizer.ensureModelLoaded();
    setModel(recognizer);
  }

  useEffect(() => {
    loadModel();
  }, []);

  async function listenMusic() {
    const classLabels = model.wordLabels(); // ['Background Noise', 'Pop', 'Rap']
    model.listen(
      (result) => {
        const scores = result.scores;
        classLabels.forEach((label, idx) => {
          setPredictions((prevPrediction) => ({
            ...prevPrediction,
            [label]: scores[idx],
          }));
        });
      },
      {
        includeSpectrogram: true,
        probabilityThreshold: 0.75,
        invokeCallbackOnNoiseAndUnknown: true,
        overlapFactor: 0.5,
      }
    );
  }

  return (
    <>
      {model ? (
        <>
          {" "}
          <div className="flex justify-around p-6">
            <button onClick={() => listenMusic()}>Listen</button>
            <button onClick={() => model.stopListening()}>Stop</button>
          </div>
          {!!predictions && (
            <div>
              {Object.entries(predictions).map(([label, prediction]) => {
                return (
                  <h4 key={label}>
                    {label} - {(prediction * 100).toFixed(0)}%
                  </h4>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <h1>loading...</h1>
      )}
    </>
  );
}
