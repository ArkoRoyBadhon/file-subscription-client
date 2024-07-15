import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const SearchInput = () => {
  return (
    <div className="flex w-full max-w-sm items-center">
      <Input
        type="text"
        placeholder="Search by goods name"
        className="rounded-r-none"
      />
      <Button type="submit" size="icon" className="rounded-l-none">
        <Search />
      </Button>
    </div>
  );
};

export default SearchInput;
