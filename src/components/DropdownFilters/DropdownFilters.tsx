import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { ChevronDown } from 'lucide-react';
// Locale
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Checked, DropdownSelectedEnum } from '@/types';

const DropdownFilters = () => {
  const [selectedAllCheckbox, setSelectedAllCheckbox] = useState<Checked>(true);
  const [selectedCompleteCheckbox, setSelectedCompleteCheckbox] =
    useState<Checked>(false);
  const [selectedIncompleteCheckbox, setSelectedIncompleteCheckbox] =
    useState<Checked>(false);
  const [status, setStatus] = useState<string>(DropdownSelectedEnum.ALL);

  const handleSelectedDropdown = (option: DropdownSelectedEnum) => {
    if (option === status) return;
    setStatus(option);
    setSelectedCompleteCheckbox(false);
    setSelectedAllCheckbox(false);
    setSelectedIncompleteCheckbox(false);

    switch (option) {
      case DropdownSelectedEnum.COMPLETE:
        setSelectedCompleteCheckbox(true);
        break;
      case DropdownSelectedEnum.ALL: {
        setSelectedAllCheckbox(true);
        break;
      }
      case DropdownSelectedEnum.INCOMPLETE: {
        setSelectedIncompleteCheckbox(true);
        break;
      }
      default:
        setSelectedAllCheckbox(true);
        break;
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="min-w-[185px]">
          <Button className="flex justify-between  " variant="default">
            <span className="flex-1">{status}</span>

            <Separator className="ml-10 " orientation="vertical" />
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-auto">
          <DropdownMenuCheckboxItem
            checked={selectedAllCheckbox}
            onCheckedChange={() =>
              handleSelectedDropdown(DropdownSelectedEnum.ALL)
            }
          >
            All
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={selectedCompleteCheckbox}
            onCheckedChange={() =>
              handleSelectedDropdown(DropdownSelectedEnum.COMPLETE)
            }
          >
            Complete
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={selectedIncompleteCheckbox}
            onCheckedChange={() =>
              handleSelectedDropdown(DropdownSelectedEnum.INCOMPLETE)
            }
          >
            Incomplete
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default DropdownFilters;
