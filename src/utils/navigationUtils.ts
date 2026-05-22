import {
  getDistance,
} from './distance';

export const isNearCoordinate = (
  currentLat: number,
  currentLon: number,
  targetLat: number,
  targetLon: number
) => {

  const distance =
    Number(
      getDistance(
        currentLat,
        currentLon,
        targetLat,
        targetLon
      )
    );

  // 30 metros
  return distance < 0.03;
};