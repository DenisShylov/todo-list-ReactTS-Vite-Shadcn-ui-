import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '../ui/button';
import { BadgeX, FilePenLine } from 'lucide-react';
import { useGetTodosQuery, useUpdateTodoMutation } from '@/redux/api/TodoApi';
import { Checkbox } from '../ui/checkbox';
import { useDebounce } from 'use-debounce';
// import Modal from '../Modal/Modal';
import { TData, TTableProps, TTodos } from '@/types';

const TableElements = ({ inputValue, handleInputChange }: TTableProps) => {
  const { data } = useGetTodosQuery('');
  //     const [updateTodo] = useUpdateTodoMutation();
  // const [searchValue, setSearchValue] = useState<string>('');

  const [searchVal] = useDebounce(searchValue, 300);
  // const [checkedItems, setCheckedItems] =  useState<{
  //   [key: string]: boolean;
  // }>({});
  const [searchState, setSearchState] = useState<TTodos[]>([
    { id: '', completed: false, title: '' },
  ]);
  //   const [openModal, setOpenModal] = useState<boolean>(false);
  //   const [todoId, setTodoId] =  useState<string>('1');

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

  //  const handleEdit = (id: string) => {
  //    setOpenModal(true);
  //    setTodoId(id);
  //    const todo = data.find(
  //      (todo: { title: string; completed: boolean; id: string }) => todo.id === id
  //    );
  //    if (todo) {
  //      setInputValue(todo.title);
  //    }
  //  };

  //  const handleUpdate = async (check: boolean, id: string) => {
  //    setCheckedItems((prev) => ({
  //      ...prev,
  //      [id]: check,
  //    }));

  //    try {
  //      await updateTodo({ id, completed: check }).unwrap();
  //    } catch (error) {
  //      console.error('Failed to update todo:', error);
  //    }
  //  };

  //  const handleSaveChange = () => {
  //    updateTodo({
  //      id: todoId,
  //      newTitle: inputValue,
  //      completed: checkedItems[todoId] || false,
  //    });
  //    setOpenModal(false);
  //  };
  return (
    <>
      <Table className=" max-w-xl my-10 mx-auto ">
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
      {/* <Modal reason='change_title' inputValue={inputValue} openModal={openModal} handleInputChange={handleInputChange} setOpenModal={setOpenModal} handleSaveChange={handleSaveChange}/> */}
    </>
  );
};

export default TableElements;
