import { UserTree, SelectedUser } from "@components/User";
import { useStyles } from "@hooks/useStyles";
import sharedStyles from "../../assets/styles/shared.module.scss";

export const UsersPage = () => {
  const cxShared = useStyles(sharedStyles);
  //const [open, openModal, closeModal] = useModal();
  return (
    <>
      <section className={cxShared("section-left")}>
        <h2 className={cxShared("title")}>Пользователи</h2>
        <UserTree />
      </section>

      <section className={cxShared("section-right")}>
        <h2 className={cxShared("title")}>Подробная информация</h2>
        <SelectedUser />
      </section>
    </>
  );
};
