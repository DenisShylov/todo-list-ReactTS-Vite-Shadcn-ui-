import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Check, Pencil, X } from 'lucide-react';
import { Input } from '../ui/input';
import { useState } from 'react';
import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from '@/redux/api/TodoApi';

type TData = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type TableTodoProps = {
  todos: TData[];
};

const TableTodo: React.FC<TableTodoProps> = ({ todos }) => {
  const [edit, setEdit] = useState(false);
  const [deleteTodo] = useDeleteTodoMutation();
  const [newTitle, setNewTitle] = useState('');
  const [updateTodo] = useUpdateTodoMutation();

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewTitle(e.target.value);

  const handleChangeInputTitle = (title: string) => {
    setEdit((prev) => !prev);
    setNewTitle(title);
  };

  const handleEdit = (id: number) => {
    updateTodo({ id, newTitle });
  };

  const handleDelete = (todoId: number) => {
    deleteTodo(todoId);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Todo Title</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map(({ id, title }) => (
          <TableRow key={id}>
            {edit && (
              <TableCell>
                <Input value={newTitle} onChange={handleChangeTitle} />{' '}
                <Check onClick={() => handleEdit(id)} />
                <X onClick={() => handleChangeInputTitle(title)} />
              </TableCell>
            )}
            {!edit && (
              <TableCell>
                <span className="font-medisum">{title}</span>
                <Pencil onClick={() => handleChangeInputTitle(title)} />
                <X onClick={() => handleDelete(id)} />
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableTodo;
