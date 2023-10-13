import { Form, Modal, Input, Upload, Row, Button, Select } from "antd";
import { useState } from "react";
import ScrapTiktok from "../forms/dashboard/ScrapTiktok";
import TiktokTrending from "./tiktok/TiktokTrending";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import ProjectService from "../../services/project.service";
import { Oval } from "react-loader-spinner";
import Notfound from "../../pages/Notfound";
import logoImage from "../../assets/logo.png";
import LogoText from "../logo/LogoText";
import { InboxOutlined } from "@ant-design/icons";
import api from "../../lib/axios";
import toast from "react-hot-toast";

const { Dragger } = Upload;

const ProjectView = () => {
  // const project = {
  //   uid: "13232-rewrq343-ras3432",
  //   key: "1",
  //   name: "Tiktok Video Downloader",
  //   type: "Tiktok",
  //   status: "Running",
  //   desc: "This is a project to download tiktok videos",
  //   lastUsedAt: "2 days ago",
  //   createdAt: "4 months ago",
  // };
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const [limit, setLimit] = useState(30);
  const handleChangeLimit = (limit) => setLimit(limit);
  const [scrap, setScrap] = useState(false);
  const [doScraping, setDoScraping] = useState(false);
  const handleScraping = () => {
    if (!scrap) setScrap(true);
    setDoScraping(!doScraping);
    handleCloseModal();
  };

  const searchParams = useParams();
  const projectId = searchParams["project_id"];

  const { data, isLoading, isError, error } = useQuery(
    ["project_id", projectId],
    async () => await ProjectService.getProjectById(projectId),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const renderDate = (date) => {
    return (
      new Date(date).toLocaleTimeString() +
      " " +
      new Date(date).toLocaleDateString()
    );
  };

  const [showPostModal, setShowPostModal] = useState(false);
  const handleShowPostModal = () => {
    setShowPostModal(true);
  };
  const handleClosePostModal = () => {
    setShowPostModal(false);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      // return file with data:image/png;base64 stuffs
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSavePost = (values) => {
    return new Promise(async (resolve, reject) => {
      try {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("project_id", projectId);
        formData.append("file", values.file[0].originFileObj);
        formData.append("platforms", values.platforms);
        formData.append("file_format", values.file[0].type.split("/")[1]);
        const res = await api.post("/posts", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        resolve(res.data);
      } catch (error) {
        reject(error.response.data.error);
      }
    });
  };

  const renderMessage = (message) => {
    // error.message might include url if there is url enclose it with anchor tags
    // but it can have brah brah url brah brah just enclose that particular url

    const regex = /(https?:\/\/[^\s]+)/g;
    const urls = message.match(regex);
    if (urls) {
      urls.forEach((url) => {
        message = message.replace(
          url,
          `<a href="${url}" class="text-[blue] hover:text-[blue]" target="_blank">${url}</a>`
        );
      });
    }

    return message;
  };

  return isLoading ? (
    <Oval
      height={80}
      width={80}
      color="#4fa94d"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#4fa94d"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  ) : isError ? (
    <Notfound />
  ) : (
    <div>
      <div className="border p-8 rounded-md ">
        <div className="text-lg border-b pb-4 font-bold text-gray-800">
          General
        </div>
        <div className="grid grid-cols-2 mt-4 gap-8 p-2">
          <div className="flex items-center gap-4">
            <div className="font-bold text-gray-600 w-[7rem] ">
              Name:&nbsp;&nbsp;
            </div>
            <div>{data.project.name}</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="font-bold text-gray-600 w-[7rem] ">
              Type:&nbsp;&nbsp;
            </div>
            <div>{data.project.type}</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="font-bold text-gray-600 w-[7rem] ">
                Status:&nbsp;&nbsp;
              </div>
              <div>{data.project.status}</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="font-bold text-gray-600 w-[7rem] ">
                Description:&nbsp;&nbsp;
              </div>
              <div>{data.project.description}</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="font-bold text-gray-600 w-[7rem] ">
              Created:&nbsp;&nbsp;
            </div>
            <div>{renderDate(data.project.created_at)}</div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={handleShowPostModal}
          className="bg-[green] py-2 px-5 cursor-pointer rounded-md text-white"
        >
          Post
        </button>
        <button
          onClick={handleShowModal}
          className="bg-[#3131ec] block text-white p-2 rounded-md mt-4  ml-auto w-fit"
        >
          Scrap Tiktok
        </button>
      </div>
      <Modal
        open={showModal}
        title="Scrap Tiktok Trending Videos"
        onCancel={handleCloseModal}
        okText="Scrap"
        okButtonProps={{
          className: "bg-[#3131ec] text-white",
        }}
        onOk={handleScraping}
      >
        <ScrapTiktok handleChangeLimit={handleChangeLimit} />
      </Modal>
      <Modal
        open={showPostModal}
        onCancel={() => {
          handleClosePostModal();
        }}
        okButtonProps={{
          className: "hidden",
        }}
        cancelButtonProps={{
          className: "hidden",
        }}
        okText="Post"
      >
        <Form
          layout="vertical"
          onFinish={async (values) => {
            toast.promise(handleSavePost(values), {
              loading: "Posting...",

              error: (errors) => {
                return (
                  <div>
                    {errors.map((error, index) => (
                      <div key={index}>
                        {error.platform && (
                          <div>
                            <span className="text-[#4444d8] font-medium">Platform</span>:{" "}
                            {error.platform}
                          </div>
                        )}
                        <div>
                          <span className="text-[#4444d8] font-medium">Message</span>:{" "}
                          <span
                            dangerouslySetInnerHTML={{
                              __html: renderMessage(error.message),
                            }}
                          ></span>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              },
              success: (data) => {
                handleClosePostModal();
                return "Posted successfully";
              },
            });
          }}
          className="mt-6 mb-10 flex flex-col items-center"
        >
          <img src={logoImage} className="mb-2 w-[4rem]" />
          <LogoText />
          <Form.Item
            label="Post Title"
            name="title"
            rules={[
              {
                required: true,
                min: 3,
              },
            ]}
            className="mb-1 mt-5 w-full"
          >
            <Input placeholder="Post Title..." />
          </Form.Item>
          <Form.Item
            label="Post Description"
            name="description"
            className="mb-5 w-full"
            rules={[
              {
                required: true,
                min: 5,
              },
            ]}
          >
            <Input placeholder="Post Descriptioni..." />
          </Form.Item>

          <Form.Item
            className="mb-4"
            name="file"
            rules={[{ required: true }]}
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) return e;
              return e && e.fileList;
            }}
          >
            <Dragger
              name="file"
              multiple={false}
              maxCount={1}
              beforeUpload={() => false}
              listType="picture-card"
              accept="video/*,image/*"
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from
                uploading company data or other banned files.
              </p>
            </Dragger>
          </Form.Item>
          <Form.Item
            name="platforms"
            className="w-full"
            rules={[{ required: true }]}
          >
            <Select
              mode="multiple"
              allowClear
              className="w-full"
              placeholder="Please select"
              options={[
                {
                  value: "pinterest",
                  label: "Pinterest",
                },
                {
                  value: "instagram",
                  label: "Instagram",
                },
                {
                  value: "facebook",
                  label: "Facebook",
                },
                {
                  value: "twitter",
                  label: "Twitter",
                },
                {
                  value: "linkedin",
                  label: "Linkedin",
                },
                {
                  value: "tiktok",
                  label: "Tiktok",
                },
                {
                  value: "youtube",
                  label: "Youtube",
                },
                {
                  value: "gmb",
                  label: "Google My Business",
                },
                {
                  value: "reddit",
                  label: "Reddit",
                },
                {
                  value: "fbg",
                  label: "Facebook Group",
                },
                {
                  value: "telegram",
                  label: "Telegram",
                },
              ]}
            ></Select>
          </Form.Item>
          <Row justify="end" className="gap-4 w-full">
            <Button>Cancel</Button>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-[#3636f8] hover:bg-[#2828df]"
              >
                Create
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Modal>
      <TiktokTrending
        limit={limit}
        doScraping={doScraping}
        scrap={scrap}
        project={projectId}
      />
    </div>
  );
};

export default ProjectView;
