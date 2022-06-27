import { useMap } from "react-map-gl";
import calcBoundsFromCoordinates from "../utils/calcBoundsFromCoordinates";

export default function ChangeBounds({ resultData, longitude, latitude }) {
  function fitPointsInMap(data, latLong) {
    try {
      const coords = data.map(
        (loc) => loc.eventResult.venue_id.location.coordinates
      );

      //   console.log([latLong, ...coords]);
      const bounds = calcBoundsFromCoordinates([latLong, ...coords]);
      //   console.log(`fitPointInMap: bounds: ${bounds[0]}, ${bounds[1]}`);

      return bounds;
    } catch (error) {
      console.log(error);
    }
  }

  const { current: map } = useMap();
  const bounds = fitPointsInMap(resultData, [longitude, latitude]);
  // console.log(bounds);
  map.fitBounds(bounds, {
    padding: { top: 180, bottom: 180, left: 30, right: 30 },
  });
}
