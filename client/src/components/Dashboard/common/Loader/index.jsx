import PropTypes from "prop-types";
import styles from "./loader.module.css";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Loader({
  color = "#ffffff",
  size = 80,
  className,
  style,
}) {
  const circles = [...Array(4)].map((_, index) => {
    return (
      <div
        key={index}
        style={{
          borderColor: `${color} transparent transparent transparent`,
          width: size * 0.8,
          height: size * 0.8,
          margin: size * 0.1,
          borderWidth: size * 0.1,
        }}
      ></div>
    );
  });

  return (
    <div
      className={classNames(styles["lds-ring"], className)}
      style={{ width: size, height: size, ...style }}
    >
      {circles}
    </div>
  );
}

Loader.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
};
