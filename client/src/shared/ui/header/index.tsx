import { ReactNode } from "react";
import { Layout, Row } from "antd";

import styles from "./styles.module.scss";
import classNames from "classnames";

const { Header: AHeader } = Layout;


interface HeaderProps {
  className?: string;
  left?: ReactNode;
  center?: ReactNode;
  children?: ReactNode;
  right?: ReactNode;
}

export const Header = (props: HeaderProps) => {
  const { left, right, center, children, className } = props;
  return <AHeader className={classNames(styles.header, className)}>
    <Row justify={"space-between"}>
      <div className={styles.left}>
        {left}
      </div>
      <div className={styles.center}>
        {center || children}
      </div>
      <div className={styles.right}>
        {right}
      </div>
    </Row>
  </AHeader>
}