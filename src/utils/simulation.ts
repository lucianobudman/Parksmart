export const simulateMovement = (
  routeCoords: any[],
  setLocation: any
) => {

  let index = 0;

  const interval = setInterval(() => {

    if (index >= routeCoords.length) {
      clearInterval(interval);
      return;
    }

    setLocation(routeCoords[index]);

    index++;

  }, 1000);
};