const SaleIcon = ({ itemDiscount }) => {
  return (
    <>
      {itemDiscount > 0 && (
        <div className="absolute h-8 w-8 top-0 -right-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6188/6188700.png"
            alt="sale"
            className="object-fit w-full h-full"
            loading="lazy"
          />
        </div>
      )}
    </>
  );
};

export default SaleIcon;
