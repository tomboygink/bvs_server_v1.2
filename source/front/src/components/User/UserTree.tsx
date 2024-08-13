import { useState, useEffect, ChangeEvent } from "react";
import { Tree } from "@components/User/UserTreeView";
import { useGetAllUsersQuery } from "@src/redux/services/userApi";
import { useAppDispatch } from "@hooks/redux";
import { setSelectedUser } from "@src/redux/reducers/UserSlice";
import { IUser } from "@src/types/IUser";

export const UserTree = () => {
  const { data: users, isLoading } = useGetAllUsersQuery({});
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentUsers, setCurrentUsers] = useState(users?.data);

  const handleSelectUser = (id: string | null) => {
    const selectedUser = users?.data.find((user: IUser) => user.id === id);
    dispatch(setSelectedUser(selectedUser));
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  //Список пользователей при первом рендере
  useEffect(() => {
    if (users?.data) setCurrentUsers(users?.data);
  }, [users]);

  //Отфильтрованный список пользователей
  useEffect(() => {
    if (searchValue) {
      const filteredUsers = users?.data?.filter((user: IUser) =>
        user.family.toLowerCase().includes(searchValue.toLowerCase())
      );
      setCurrentUsers(filteredUsers);
    } else setCurrentUsers(users?.data);
  }, [searchValue]);

  return (
    <Tree
      users={currentUsers}
      handleSelected={handleSelectUser}
      handleSearch={handleSearch}
      isLoading={isLoading}
    />
  );
};
