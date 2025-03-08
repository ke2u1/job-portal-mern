import PropTypes from "prop-types";

const Icon = ({ src }) => {
  return (
    <div className="flex justify-center items-center p-12 border border-gray-300 rounded-lg shadow-md">
      <img
        alt="Company Icon"
        src={src}
        className="object-contain h-5 w-5 lg:h-10 lg:w-10"
        style={{ minWidth: "25px", minHeight: "25px" }}
      />
    </div>
  );
};

Icon.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Icon;
