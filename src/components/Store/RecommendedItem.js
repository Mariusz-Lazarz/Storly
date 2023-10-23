import { Link } from "react-router-dom";

const RecommendedItem = ({ item }) => {
  return (
    <div className="flex flex-col justify-center items-center w-1/3 cursor-pointer">
      <Link to={`/product/${item.id}`}>
        <div className="h-36 w-36 mx-auto">
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
      <span className="text-orange-600">${item.price}</span>
    </div>
  );
};

export default RecommendedItem;
