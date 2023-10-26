const SaleIcon = ({ itemDiscount }) => {
  return (
    <>
      {itemDiscount > 0 && (
        <div className="absolute h-12 w-12 top-0 right-4">
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
