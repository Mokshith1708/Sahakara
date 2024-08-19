const getLocation = (location) => {
  const coordinates = location.split(",");
  return { latitude: coordinates[0], longitude: coordinates[1] };
};

export default getLocation;
