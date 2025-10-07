import { Main } from "@components/Main";
import { LocationTree } from "@components/Main/components/LocationTree";

import { useStyles } from "@hooks/useStyles";

import styles from "./styles.module.scss";
import sharedStyles from "../../assets/styles/shared.module.scss";
import { RightSidebar } from "@components/Main/components/RightSidebar";

export const MainPage = () => {
  const cx = useStyles(styles);
  const cxShared = useStyles(sharedStyles);

  
  return (
    <>
      <section className={cx("section")}>
        <h2 className={cxShared("title")}>Устройства</h2>
        <LocationTree />
      </section>

      <section className={cx("section")}>
        <Main />
      </section>

      <section className={cx("section")}>
        <RightSidebar />
      </section>
    </>
  );
};
