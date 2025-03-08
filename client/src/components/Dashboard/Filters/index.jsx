import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import { Trash } from "lucide-react";
import { useFilters } from "@/hooks/useFilters";

const Filters = () => {
  const { filters, setFilter, clearFilters } = useFilters();

  /* const handleSkillChange = (skill) => {
    const updatedSkills = filters?.skills
      ? filters.skills.includes(skill)
        ? filters.skills.filter((s) => s !== skill)
        : [...filters.skills, skill]
      : [skill];
    setFilter({ ...filters, skills: updatedSkills });
  }; */

  const handleStatusChange = (value) => {
    setFilter({ ...filters, status: value });
  };

  const handleDateChange = (date, type) => {
    setFilter({ ...filters, [type]: date });
  };

  /* const handleApplyFilters = () => {}; */

  return (
    <>
      <h2 className="text-xl font-grotesk font-semibold mb-4">Filters</h2>
      <div className="space-y-4">
        <div>
          <Label>Status</Label>
          <RadioGroup value={filters.status} onValueChange={handleStatusChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="open" id="open" />
              <Label htmlFor="open">Open</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="closed" id="closed" />
              <Label htmlFor="closed">Closed</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Posted After</Label>
          <DatePicker
            selected={filters.postedAfter}
            onSelect={(date) => handleDateChange(date, "postedAfter")}
          />
        </div>

        <div>
          <Label>Posted Before</Label>
          <DatePicker
            selected={filters.postedBefore}
            onSelect={(date) => handleDateChange(date, "postedBefore")}
          />
        </div>

        <Button
          variant="outline"
          onClick={() => clearFilters()}
          className="w-full border-red-600 text-red-600 font-bold group flex justify-around items-center rounded-3xl"
        >
          <span>Clear Filters</span>
          <span className="group-hover:animate-bounce">
            <Trash />
          </span>
        </Button>
        {/* <Button onClick={handleApplyFilters} className="w-full rounded-3xl">
          Apply Filters
        </Button> */}
      </div>
    </>
  );
};

export default Filters;
