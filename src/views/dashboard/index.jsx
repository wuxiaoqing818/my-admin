import React, { useState } from "react";
import { Row, Col } from "antd";
import "./index.less";
import TransactionTable from "./components/TransactionTable";
import BoxCard from "./components/BoxCard";


const Dashboard = () => {



  return (
    <div className="app-container">
      <Row gutter={8}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={12}
          xl={12}
          style={{ paddingRight: "8px", marginBottom: "30px" }}
        >
          <TransactionTable />
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={12}
          xl={12}
          style={{ marginBottom: "30px" }}
        >
          <BoxCard />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
