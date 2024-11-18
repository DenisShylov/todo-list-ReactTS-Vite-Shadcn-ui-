import { BadgeX, ChevronDown, FilePenLine, Plus, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from './ui/separator';
import { Checkbox } from './ui/checkbox';
import { useGetTodosQuery, useUpdateTodoMutation } from '@/redux/api/TodoApi';
import { useDebounce } from 'use-debounce';
import { LoadingSpinner } from './ui/Spinner';
import { Checked, DropdownSelectedEnum, TData, TTodos } from '@/types';

const Test = () => {
  const { data, isLoading } = useGetTodosQuery('');
  const [todoId, setTodoId] = React.useState<string>('1');
  const [inputValue, setInputValue] = React.useState<string>('');
  const [updateTodo] = useUpdateTodoMutation();
  const [checkedItems, setCheckedItems] = React.useState<{
    [key: string]: boolean;
  }>({});
  //  DROPDOWN
  const [selectedAllCheckbox, setSelectedAllCheckbox] = useState<Checked>(true);
  const [selectedCompleteCheckbox, setSelectedCompleteCheckbox] =
    useState<Checked>(false);
  const [selectedIncompleteCheckbox, setSelectedIncompleteCheckbox] =
    useState<Checked>(false);
  const [status, setStatus] = useState<string>('All Todos');

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
  // END DROPDOWN
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const [searchVal] = useDebounce(searchValue, 300);
  const [searchState, setSearchState] = useState<TTodos[]>([
    { id: '', completed: false, title: '' },
  ]);

  const rowsToDisplay = searchState.length > 0 ? searchState : data;

  useEffect(() => {
    if (data && searchVal.trim()) {
      const filtered = data.filter((todo: TTodos) =>
        todo.title.includes(searchVal)
      );
      setSearchState(filtered);
    } else {
      setSearchState(data || []);
    }
  }, [data, searchVal]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  const handleEdit = (id: string) => {
    setOpenModal(true);
    setTodoId(id);
    const todo = data.find(
      (todo: { title: string; completed: boolean; id: string }) =>
        todo.id === id
    );
    if (todo) {
      setInputValue(todo.title);
    }
  };

  const handleUpdate = async (check: boolean, id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: check,
    }));

    try {
      await updateTodo({ id, completed: check }).unwrap();
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const handleSaveChange = () => {
    updateTodo({
      id: todoId,
      newTitle: inputValue,
      completed: checkedItems[todoId] || false,
    });
    setOpenModal(false);
  };

  return (
    <div className="container h-screen max-w-5xl flex flex-col m-auto items-end px-10 ">
      <div className="flex flex-col w-full items-center justify-center my-10">
        <h3 className="text-4xl font-bold uppercase">Todo list</h3>
        <div className="relative flex my-10 w-full  ">
          <Input
            className="  w-4/5  pl-10 mr-5 text-violet-primary placeholder:text-violet-primary placeholder:italic border-violet-secondary focus-visible:ring-violet-primary"
            type="text"
            value={searchValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchValue(e.target.value)
            }
            placeholder="Search note ..."
          />
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
            <Search className="text-violet-secondary" />
          </div>
          {/* DROPDOWN */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className=" min-w-[185px] w-1/5">
              <Button className="flex w-3/3  " variant="default">
                <span className="w-2/3 ">{status}</span>

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
                All Todos
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
        </div>
      </div>
      {/* Table */}
      <Table className=" max-w-xl my-10 mx-auto ">
        <div className="">{isLoading && <LoadingSpinner size={60} />}</div>
        <TableHeader className=" ">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[100px]">Completed</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Edit</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            rowsToDisplay.map(({ id, title, completed }: TData) => (
              <TableRow key={id} className={completed ? 'bg-slate-200' : ''}>
                <TableCell>
                  <Checkbox
                    id={id}
                    checked={
                      checkedItems[id] !== undefined
                        ? checkedItems[id]
                        : completed
                    }
                    onCheckedChange={(check: boolean) =>
                      handleUpdate(check, id)
                    }
                  />
                </TableCell>
                <TableCell
                  className={`${completed ? 'line-through ' : ''} text-lg`}
                >
                  {title}
                </TableCell>
                <TableCell>
                  <Button
                    className="w-8 h-8 rounded-full bg-green-400 hover:bg-green-600"
                    onClick={() => handleEdit(id)}
                  >
                    <FilePenLine className=" action-icons " />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button className="w-8 h-8 rounded-full  bg-red-300 hover:bg-red-500">
                    <BadgeX className="action-icons" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">
              {data ? `${data.length} todos` : '0 todos'}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {/* ADD TODO BTN */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogTrigger asChild className="w-full text-end my-5">
          <Button
            variant={'default'}
            className="rounded-full h-[50px] w-[50px] p-0"
            onClick={() => handleEdit(todoId)}
          >
            <Plus className="add-btn" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Todo title</DialogTitle>
          </DialogHeader>
          <div>
            <label htmlFor="change-title">Todo title</label>
            <Input
              id="change-title"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
          <DialogFooter className="md:justify-center">
            <Button className="w-1/2" onClick={handleSaveChange}>
              Save change
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Test;
