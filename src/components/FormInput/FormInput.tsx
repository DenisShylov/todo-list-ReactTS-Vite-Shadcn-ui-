import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAddTodoMutation } from '@/redux/api/TodoApi';
// import { Plus } from 'lucide-react';
import { useState } from 'react';
import { ModeToggle } from '../ui/ThemeProvider/ModeToggle';

type TNewTodo = {
  id: number;
  title: string;
  completed: boolean;
};
export const FormInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [addTodo] = useAddTodoMutation();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (!inputValue) return null;

    const newTodo: TNewTodo = {
      id: Date.now(),
      title: inputValue,
      completed: false,
    };
    addTodo(newTodo);
    setInputValue('');
  };
  return (
    <>
      <div className="flex w-[300px] justify-between max-w-sm items-center space-x-2">
        <Input
          type="text"
          className=" w-1/1 custom-input"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter your task"
        />

        <Button className=" " type="submit" onClick={handleAddTodo}>
          +{/* <Plus size={'50px'} /> */}
        </Button>

        <ModeToggle />
      </div>
    </>
  );
};
