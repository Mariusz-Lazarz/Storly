import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const ImageUpload = ({ onUpload, onRemove, imagePreviewUrl, fileInputRef }) => {
  return (
    <>
      <input
        type="file"
        onChange={onUpload}
        className="hidden"
        ref={fileInputRef}
        id="fileInput"
      />
      <label
        htmlFor="fileInput"
        className="cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 mt-4"
      >
        <FontAwesomeIcon icon={faUpload} className="mr-2" />
        Upload Image
      </label>
      <div className="relative mt-4 mx-auto inline-block">
        <img
          src={imagePreviewUrl}
          alt="Selected Preview"
          className={`${
            imagePreviewUrl ? "" : "hidden"
          } w-24 h-24 object-cover border border-gray-300 rounded-md`}
        />
        {imagePreviewUrl && (
          <button
            onClick={onRemove}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center"
            style={{ transform: "translate(50%, -50%)" }}
          >
            <span className="text-xs leading-none">&#x2715;</span>
          </button>
        )}
      </div>
    </>
  );
};

export default ImageUpload;
