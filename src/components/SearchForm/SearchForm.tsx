import { ChangeEvent, useState } from 'react';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import DropdownFilters from '../DropdownFilters/DropdownFilters';

const SearchForm = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  return (
    <div className="relative flex my-10 w-full  ">
      <Input
        className="max-w-[820px] pl-10 mr-5 text-violet-primary placeholder:text-violet-primary placeholder:italic border-violet-secondary focus-visible:ring-violet-primary"
        type="text"
        value={searchValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchValue(e.target.value)
        }
        placeholder="Search note ..."
      />
      <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
        <Search className="text-violet-secondary" />
      </div>
      <DropdownFilters />
    </div>
  );
};

export default SearchForm;
