import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import PropTypes from "prop-types";
import { useFilters } from "@/hooks/useFilters";
import { cn } from "@/lib/utils";

const DropdownList = ({
  items,
  name,
  _onSelect,
  className,
  icon,
  placeholder,
}) => {
  const { filters, setFilter } = useFilters();
  return (
    <div className="flex">
      <span>{icon}</span>
      <Select
        value={filters[name]} // Use the correct filter name
        onValueChange={(value) => {
          _onSelect(value);
          setFilter({ ...filters, [name]: value }); // Update the filter
        }}
      >
        <SelectTrigger className={cn(className, "w-full capitalize px-0 pl-3")}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="capitalize">
          <SelectGroup>
            <SelectLabel>{name}</SelectLabel>
            {items.map((item, index) => (
              <SelectItem key={index} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

DropdownList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  _onSelect: PropTypes.func.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.element,
};

export default DropdownList;
