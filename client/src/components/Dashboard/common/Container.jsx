import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

const Container = ({ children, className }) => {
  return (
    <div
      className={cn(
        `scroll-smooth transition-all duration-300 ease-in-out bg-muted border border-l-8 border-black my-4 rounded-3xl scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent scrollbar-thumb-rounded-full`,
        className
      )}
    >
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
export default Container;
