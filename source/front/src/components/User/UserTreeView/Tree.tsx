import { FC, ChangeEvent } from "react";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchIcon from "@mui/icons-material/Search";
import {
  CircularProgress,
  InputBase,
  Divider,
  IconButton,
} from "@mui/material";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";
import { IUser } from "@src/types/IUser";

interface Props {
  users: IUser[];
  handleSelected: (id: string | null) => void;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
}

export const Tree: FC<Props> = ({
  users,
  handleSelected,
  handleSearch,
  isLoading,
}) => {
  const cx = useStyles(styles);

  return (
    <div className={cx("container")}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <div className={cx("search")}>
            <InputBase
              sx={{ ml: 1, flex: 1, fontSize: "14px", pl: "14px" }}
              placeholder="Поиск по номеру"
              onChange={handleSearch}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </div>
          <SimpleTreeView
            onSelectedItemsChange={(_, id) => handleSelected(id)}
            className={cx("tree")}
            slots={{
              endIcon: AccountCircleOutlinedIcon,
            }}
            sx={{
              "& .MuiSvgIcon-root": {
                color: "#266bf1",
              },
            }}
          >
            {users?.length > 0 ? (
              users?.map((user) => (
                <TreeItem
                  key={user.id}
                  itemId={user.id}
                  label={`${user.name} ${user.father} ${user.family}`}
                  className={cx("tree-item")}
                  sx={{
                    "& .MuiTreeItem-content": {
                      alignItems: "flex-start",
                    },
                  }}
                />
              ))
            ) : (
              <p className="notfound">Ничего не найдено</p>
            )}
          </SimpleTreeView>
        </>
      )}
    </div>
  );
};
