import React from "react";
import { Form, InputNumber } from "antd";
import logoImage from "../../../assets/logo.png";
import LogoText from "../../logo/LogoText";

const ScrapTiktok = ({ handleChangeLimit }) => {
  return (
    <Form layout="vertical" className="mt-6 mb-10 flex flex-col items-center">
      <img src={logoImage} className="mb-2 w-[4rem]" />
      <LogoText />
      <Form.Item
        label="Limit"
        rules={[
          {
            required: true,
            message: "Please input limit",
          },
          {
            min: 1,
            max: 150,
            message: "Limit must be between 1 and 150",
          },
          {
            type: "number",
            message: "Limit must be a number",
          },
        ]}
        className="mb-1 w-full"
      >
        <InputNumber
          min={0}
          className="w-full"
          defaultValue={60}
          onChange={(value) => {
            handleChangeLimit(value);
          }}
          placeholder="Limit"
        />
      </Form.Item>
    </Form>
  );
};

export default ScrapTiktok;
