import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const ImageUpload = ({
  onUpload,
  onRemove,
  imagePreviewUrls,
  fileInputRef,
}) => {
  return (
    <>
      <input
        type="file"
        onChange={onUpload}
        className="hidden"
        ref={fileInputRef}
        id="fileInput"
        multiple
      />
      <label
        htmlFor="fileInput"
        className="cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 mt-4"
      >
        <FontAwesomeIcon icon={faUpload} className="mr-2" />
        Upload Images
      </label>
      <div className="mt-4">
        {imagePreviewUrls.map((url, index) => (
          <div key={index} className="relative inline-block mr-2">
            <img
              src={url}
              alt={`Preview ${index}`}
              className="w-24 h-24 object-cover border border-gray-300 rounded-md"
            />
            <button
              onClick={() => onRemove(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center"
              style={{ transform: "translate(50%, -50%)" }}
            >
              <span className="text-xs leading-none">&#x2715;</span>
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageUpload;
