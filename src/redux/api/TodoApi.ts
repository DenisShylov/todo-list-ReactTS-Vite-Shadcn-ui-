import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IUpdate {
  url: string;
  method: string;
  body: unknown; // Изменено на unknown для большей гибкости
}

export const todoAPI = createApi({
  reducerPath: 'todoAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://62cd7c47a43bf78008597d77.mockapi.io/api/v1/tasks',
  }),

  tagTypes: ['todo', 'tasks'],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => '',
      providesTags: ['tasks'],
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: '',
        method: 'POST',
        body: todo,
      }),
      invalidatesTags: ['tasks'], // Обновляем кэш задач после добавления
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['tasks'], // Обновляем кэш задач после удаления
    }),
    updateTodo: builder.mutation({
      query: ({ id, newTitle, completed }): IUpdate => ({
        url: `/${id}`,
        method: 'PUT',
        body: {
          id,
          title: newTitle,
          completed: completed !== undefined ? completed : false,
        },
      }),
      invalidatesTags: ['tasks'], // Обновляем кэш задач после обновления
    }),
  }),
});

// Экспортируем хуки для использования в компонентах
export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = todoAPI;
