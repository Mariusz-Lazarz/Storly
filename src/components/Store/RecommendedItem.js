import { Link } from "react-router-dom";

const RecommendedItem = ({ item }) => {
  return (
    <div className="flex flex-col justify-center items-center w-1/3 cursor-pointer transform transition-transform duration-500 hover:scale-105">
      <Link to={`/product/${item.id}`}>
        <div className="h-32 w-32 mx-auto">
          <img
            src={item.imageLinks[0]}
            alt={item.title}
            className="object-fit w-full h-full"
            loading="lazy"
          />
        </div>
      </Link>
      <h3 className="font-semibold truncate w-full max-w-[95%] text-center">
        {item.title}
      </h3>
      <div className="flex justify-center gap-2">
        <span
          className={`text-orange-600 ${
            Number(item.discount) > 0 ? "line-through" : ""
          }`}
        >
          ${item.price}
        </span>
        {Number(item.discount) > 0 && (
          <span className="text-red-500">${item.discount}</span>
        )}
      </div>
    </div>
  );
};

export default RecommendedItem;
