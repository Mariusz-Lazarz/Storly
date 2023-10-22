import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { DataLayer } from "@piwikpro/react-piwik-pro";
import useAuth from "../../hooks/useAuth";

const useAddToCart = (showAlert) => {
  const dispatch = useDispatch();
  const { auth } = useAuth();

  const handleAddToCart = (item, quantity) => {
    if (auth) {
      dispatch(addToCart({ item, quantity: Number(quantity) }));
      DataLayer.push({
        event: "add_to_cart",
        ecommerce: {
          currency: "USD",
          value: Number(quantity) * item.price,
          items: [
            {
              item_id: String(item.id),
              item_name: item.title,
              price: String(item.price),
              quantity: Number(quantity),
              item_brand: item.brand,
              item_category: item.category,
              item_variant: item.variant,
            },
          ],
        },
      });
    } else {
      showAlert(
        "Authentication error",
        "Kindly sign in to add items to your cart"
      );
    }
  };

  return handleAddToCart;
};

export default useAddToCart;

