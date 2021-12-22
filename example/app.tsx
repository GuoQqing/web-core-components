/**
 * 组件demo
 */
import React from "react";
import { Form, Card } from "antd";

import ImageUpload from "../components/imageUpload";
import { getValueFromEventImg } from "../components/utils";

function App(props) {
  return (
    <Form>
      {/* ImageUpload 图片上传 */}
      <Card title="ImageUpload 图片上传">
        <Form.Item
          // label="上传"
          name="imgList"
          getValueFromEvent={getValueFromEventImg}
          initialValue={[]}
        >
          <ImageUpload multiple listType="picture-card" />
        </Form.Item>
      </Card>
    </Form>
  );
}

export default App;
