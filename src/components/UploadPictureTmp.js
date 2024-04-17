import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const UploadPicture = ({ onPictureSelected }) => {
  // 使用useState来跟踪上传的文件列表和上传状态
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();



  const handleChange = (info) => {
    console.log("handleChange", info);
    // 获取上传的文件对象
    const { file } = info;
    if(file.status !== "removed"){

    // 创建FileReader对象
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // setBase64(reader.result);
      onPictureSelected(reader.result);
      console.log("转换后的图片");
      console.log(reader.result);
    };
  }

    // const isJpgOrPng = info.file.type === 'image/jpeg' || info.file.type === 'image/png';
    // if (isJpgOrPng) {
    //   getBase64(info.file.originFileObj, (url) => {
    //     console.log("base64url", url);

    //     setLoading(false);
    //     setImageUrl(url);
    //   });
    // }
    // const isLt2M = info.file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //   message.error('Image must smaller than 2MB!');
    // }
    // if (info.file.status === 'uploading') {
    //   setLoading(true);
    //   return;
    // }

    // if (info.file.status === 'done') {
    //   // Get this url from response in real world.

    // }
  };

  // 处理上传按钮的点击事件
  const handleUpload = () => {
    // 创建一个FormData对象，用于存储要上传的文件
    const formData = new FormData();
    // 遍历文件列表，将每个文件添加到FormData对象中
    fileList.forEach((file) => {
      formData.append('files[]', file);
    });
    // 设置上传状态为true，显示上传loading状态
    setUploading(true);
    // 使用fetch进行文件上传
    fetch('https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json()) // 解析上传响应
      .then(() => {
        // 上传成功后清空文件列表，并显示成功消息
        setFileList([]);
        message.success('upload successfully.');
      })
      .catch(() => {
        // 如果上传失败，显示错误消息
        message.error('upload failed.');
      })
      .finally(() => {
        // 无论上传成功或失败，都将上传状态设置为false，隐藏loading状态
        setUploading(false);
      });
  };

  // Upload组件的配置属性
  const props = {
    // 文件移除时的回调函数
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    // 上传前的回调函数，返回false表示阻止自动上传
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },

    fileList, // 文件列表
  };

  return (
    <>
      <Upload {...props} onChange={handleChange}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>

      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{
          marginTop: 16,
        }}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
    </>
  );
};

export default UploadPicture;
