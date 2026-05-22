import * as Speech from 'expo-speech';

export const speakInstruction = (
  text: string
) => {

  Speech.stop();

  Speech.speak(text, {
    language: 'es-AR',
    pitch: 1,
    rate: 0.95,
  });
};