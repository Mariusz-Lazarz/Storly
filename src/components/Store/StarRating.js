const StarRating = ({ averageRating }) => {
  const filledStars = Math.floor(averageRating);

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star, index) => (
        <span
          key={index}
          className={`text-2xl ${
            star <= filledStars ? "text-yellow-500" : "text-gray-300"
          }`}
        >
          {star <= filledStars ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
