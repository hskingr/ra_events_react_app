function getSWCoordinates(coordinatesCollection) {
  const lowestLng = Math.min(
    ...coordinatesCollection.map((coordinates) => coordinates[0])
  );
  const lowestLat = Math.min(
    ...coordinatesCollection.map((coordinates) => coordinates[1])
  );

  return [lowestLng, lowestLat];
}

function getNECoordinates(coordinatesCollection) {
  const highestLng = Math.max(
    ...coordinatesCollection.map((coordinates) => coordinates[0])
  );
  const highestLat = Math.max(
    ...coordinatesCollection.map((coordinates) => coordinates[1])
  );

  return [highestLng, highestLat];
}

function calcBoundsFromCoordinates(coordinatesCollection) {
  return [
    getSWCoordinates(coordinatesCollection),
    getNECoordinates(coordinatesCollection),
  ];
}

export default calcBoundsFromCoordinates;
