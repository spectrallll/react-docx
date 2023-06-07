import { Layout } from "antd";

import styles from "./styles.module.scss"
import { FormDoc } from "@/pages/index/ui/form";
import React from "react";
import { getFieldsFx } from "@/entities/document/model/form";

const { Content } = Layout;

const MainPage = () => {
  getFieldsFx();
  return (
    <Layout>
      <Content className={styles.root}>
        <FormDoc />
      </Content>
    </Layout>

  )
}

export default MainPage;
