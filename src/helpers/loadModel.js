import * as speechCommands from "@tensorflow-models/speech-commands";
import { useDispatch } from "react-redux";
import { setModel } from "../slices/modelSlice";

export default async function loadModel() {
  //   const dispatch = useDispatch();
  const URL = "https://teachablemachine.withgoogle.com/models/pLngQGEdl/";
  const checkpointURL = URL + "model.json"; // model topology
  const metadataURL = URL + "metadata.json";
  const recognizer = speechCommands.create(
    "BROWSER_FFT",
    undefined,
    checkpointURL,
    metadataURL
  );
  await recognizer.ensureModelLoaded();
  // dispatch(setModel(recognizer));
}
