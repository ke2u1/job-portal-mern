import { Briefcase, CalendarDays, MapPin, Search } from "lucide-react";
import { lazy, memo, Suspense } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loader from "../Loader";
import { Slider } from "@/components/ui/slider";
import { cities } from "@/constants/constants";
import { useFilters } from "@/hooks/useFilters";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const SearchDropdown = lazy(() =>
  import("../../../../components/SearchDropdown")
);

const DropdownList = lazy(() => import("../DropdownList"));

const HeaderFilter = () => {
  const { filters, setFilter } = useFilters();
  const { user } = useAuth();
  const { pathname } = useLocation();

  return (
    pathname.startsWith("/dashboard/jobSeeker") &&
    user?.role !== "recruiter" && (
      <Suspense
        fallback={<Loader className={`transition-all duration-1000`} />}
      >
        <div className="bg-foreground px-4 flex flex-col lg:space-y-0 space-y-4 py-4 lg:min-h-24 lg:grid lg:grid-flow-col w-full lg:items-center">
          <div className="flex flex-row gap-2 lg:px-4 items-center">
            <Search className="text-white h-10 w-11 rounded-full border border-muted/40 p-1.5" />
            <Input
              placeholder="eg. Full-stack Developer"
              className={`w-full text-background bg-transparent placeholder:text-background/50 placeholder:font-semibold placeholder:text-lg h-9 my-0 border border-muted/40 focus-visible:ring-0 rounded-full`}
              onChange={(e) =>
                setFilter({ ...filters, title: e.target.value.trim() })
              }
            />
          </div>
          {/* Cities Filter */}
          <SearchDropdown
            items={cities}
            placeholder={`eg. Ahmedabad`}
            className={`border-r-2 p-0`}
            icon={
              <MapPin className="text-white h-10 w-10 rounded-full border border-muted/40 p-1.5" />
            }
            _onSelect={(city) =>
              setFilter({ ...filters, location: city.toLowerCase() })
            }
          />
          <DropdownList
            items={["full time", "part time", "internship"]}
            placeholder={`eg. Part time`}
            name={`jobType`}
            icon={
              <Briefcase className="text-white bg-black h-10 w-10 rounded-full border border-muted/40 p-1.5" />
            }
            className={`bg-transparent w-fit border-0 lg:px-6 text-background/80 text-lg`}
            _onSelect={(experience) => setFilter({ ...filters, experience })}
          />
          <DropdownList
            name={`frequency`}
            items={["hourly", "monthly", "yearly"]}
            placeholder={`eg. Per Month`}
            icon={
              <CalendarDays className="text-white bg-black h-10 w-10 rounded-full border border-muted/40 p-1.5" />
            }
            className={`bg-transparent lg:px-6 w-fit border-0 text-background/80 text-lg`}
            _onSelect={(frequency) => setFilter({ ...filters, frequency })}
          />
          <div className="w-full hidden xl:block text-white">
            <Label>Salary Range</Label>
            <Slider
              className=""
              min={0}
              max={20000000}
              step={20}
              value={[filters.salaryMin || 0, filters.salaryMax || 1000000]}
              onValueChange={(value) =>
                setFilter({
                  ...filters,
                  salaryMin: value[0],
                  salaryMax: value[1],
                })
              }
            />
            <div className="flex justify-between text-sm mt-1">
              <span>Rs.{filters.salaryMin || 0}</span>
              <span>Rs.{filters.salaryMax || 1000000}</span>
            </div>
          </div>
        </div>
      </Suspense>
    )
  );
};

export default memo(HeaderFilter);
