import { useEffect } from "react";
import { DataLayer } from "@piwikpro/react-piwik-pro";

const useProductDetailView = (item) => {
  useEffect(() => {
    if (item) {
      DataLayer.push({
        event: "product_detail_view",
        ecommerce: {
          items: [
            {
              item_id: String(item.id),
              item_name: item.title,
              price: String(item.price),
              quantity: 1,
              item_brand: item.brand,
              item_category: item.category,
              item_variant: item.variant,
            },
          ],
        },
      });
    }
  }, [item]);
};

export default useProductDetailView;
