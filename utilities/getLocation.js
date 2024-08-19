const getLocation = (location) => {
  const coordinates = location.split(",");
  return {
    latitude: parseFloat(coordinates[0]),
    longitude: parseFloat(coordinates[1]),
  };
};

export default getLocation;
