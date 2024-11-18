import SearchForm from '../SearchForm/SearchForm';

const TodoList = () => {
  return (
    <div className="container h-screen max-w-5xl flex flex-col m-auto items-end ">
      <div className="flex flex-col w-full items-center justify-center my-10">
        <h3 className="text-4xl font-bold uppercase">Todo list</h3>
        <SearchForm />
      </div>
    </div>
  );
};

export default TodoList;
