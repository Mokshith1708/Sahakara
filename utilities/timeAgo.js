const timeAgo = (createdAt) => {
  const currentTime = Date.now(); // Current timestamp in milliseconds
  const createdTime = new Date(createdAt).getTime(); // Blog creation time in milliseconds

  const differenceInMilliseconds = currentTime - createdTime; // Difference in milliseconds
  const differenceInHours = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60)
  ); // Convert milliseconds to hours

  if (differenceInHours < 1) {
    const differenceInMinutes = Math.floor(
      differenceInMilliseconds / (1000 * 60)
    );
    return differenceInMinutes === 1
      ? "1 minute ago"
      : `${differenceInMinutes} minutes ago`;
  } else if (differenceInHours < 24) {
    return differenceInHours === 1
      ? "1 hour ago"
      : `${differenceInHours} hours ago`;
  } else {
    const differenceInDays = Math.floor(differenceInHours / 24);
    return differenceInDays === 1
      ? "1 day ago"
      : `${differenceInDays} days ago`;
  }
};

export default timeAgo;
