export const getRouteData = async (
  origin: any,
  dest: any
) => {

  const url = `
https://routing.openstreetmap.de/routed-car/route/v1/driving/
${origin.longitude},${origin.latitude};
${dest.lon},${dest.lat}
?overview=full
&geometries=geojson
&steps=true
`;

  const response = await fetch(
    url.replace(/\s/g, '')
  );

  return await response.json();
};