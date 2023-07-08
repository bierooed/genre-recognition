import { useSelector } from "react-redux";

export default async function listenMusic() {
  const { model } = useSelector((state) => state.model);
  console.log(model);
  const classLabels = model.wordLabels();
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
      includeSpectrogram: true, // in case listen should return result.spectrogram
      probabilityThreshold: 0.75,
      invokeCallbackOnNoiseAndUnknown: true,
      overlapFactor: 0.5, // probably want between 0.5 and 0.75. More info in README
    }
  );
}
