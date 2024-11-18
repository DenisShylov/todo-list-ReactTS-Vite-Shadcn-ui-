import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';
import { ChangeEvent, MouseEvent } from 'react';

export type InputEvent = ChangeEvent<HTMLInputElement>;

export type ButtonEvent = MouseEvent<HTMLButtonElement>;

export type Checked = DropdownMenuCheckboxItemProps['checked'];

export const enum DropdownSelectedEnum {
  ALL = 'All Todos',
  COMPLETE = 'Complete',
  INCOMPLETE = 'Incomplete',
}

export type TData = {
  id: string;
  title: string;
  completed?: boolean;
};

export type TTodos = {
  id: string;
  title: string;
  completed: boolean;
};

export type TTableProps = {
  searchValue: string;
  setSearchValue: (e: ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
