import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { Table, Modal } from "antd";
import { IconButton, TextField } from "@mui/material";
import NewProjectForm from "../forms/dashboard/NewProjectForm";
import { MdDelete, MdEdit } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";
import { PiWarningFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import ProjectService from "../../services/project.service";
import toast from "react-hot-toast";

const ProjectsOverview = () => {
  const navigate = useNavigate();

  const renderDate = (date) => {
    let time = new Date(date).toLocaleTimeString();
    let newDate = new Date(date).toLocaleDateString();
    return newDate + " " + time;
  };

  const columns = [
    {
      title: "No.",
      key: "no",
      width: "4rem",
      render: (_, record, index) => index + 1,

      onCell: (record) => {
        return {
          onClick: () => {
            navigate(`/dashboard/projects/${record.uid}`);
          },
        };
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <div className="font-medium">{text}</div>,
      onCell: (record) => {
        return {
          onClick: () => {
            navigate(`/dashboard/projects/${record.uid}`);
          },
        };
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      onCell: (record) => {
        return {
          onClick: () => {
            navigate(`/dashboard/projects/${record.uid}`);
          },
        };
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "desc",
      onCell: (record) => {
        return {
          onClick: () => {
            navigate(`/dashboard/projects/${record.uid}`);
          },
        };
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <div className="flex items-center gap-1">
          {status.toLowerCase() === "running" ? (
            <BsCheckCircleFill className="text-green-500" />
          ) : status.toLowerCase() === "creating" ? (
            "processing"
          ) : (
            <PiWarningFill className="text-rose-500" />
          )}
          <span>{status}</span>
        </div>
      ),
      onCell: (record) => {
        return {
          onClick: () => {
            navigate(`/dashboard/projects/${record.uid}`);
          },
        };
      },
    },
    // {
    //   title: "Last Used At",
    //   dataIndex: "lastUsedAt",
    //   key: "lastUsedAt",
    //   onCell: (record) => {
    //     return {
    //       onClick: () => {
    //         navigate(`/dashboard/projects/${record.uid}`);
    //       },
    //     };
    //   },
    // },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "createdAt",
      render: (date) => renderDate(date),
      onCell: (record) => {
        return {
          onClick: () => {
            navigate(`/dashboard/projects/${record.uid}`);
          },
        };
      },
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <IconButton className="bg-[#3434f8] p-2 text-white">
            <MdEdit size={15} className="cursor-pointer" />
          </IconButton>
          <IconButton className="bg-[#ff5858] p-2 text-white">
            <MdDelete size={15} className="cursor-pointer" />
          </IconButton>
        </div>
      ),
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const limit = 10;
  const [page, setPage] = useState(1);
  const [created, setCreated] = useState(false);
  const { data, isLoading, isError, error } = useQuery(
    ["projects", page, created],
    async () => await ProjectService.getProjects(page, limit),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (isError) {
      toast.error("Error getting your projects");
    }
  }, [isError]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="text-xl text-gray-900 font-medium">Overview</div>
        <button
          onClick={showModal}
          className="flex items-center gap-1 text-white px-3 py-2 rounded-md shadow"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgb(111, 137, 251) 0%, rgb(92, 110, 245) 29%, rgb(81, 81, 236) 100%)",
          }}
        >
          <IoAdd />
          <span>New</span>
        </button>
      </div>
      <Modal
        title="Create new Project"
        open={isModalOpen}
        okButtonProps={{ className: "hidden" }}
        cancelButtonProps={{ className: "hidden" }}
        onCancel={handleCancel}
      >
        <NewProjectForm
          onCreated={() => setCreated(!created)}
          handleCancel={handleCancel}
          handleOk={handleOk}
        />
      </Modal>
      <Table
        className="mt-10"
        dataSource={data?.projects ?? []}
        loading={isLoading}
        columns={columns}
        onRow={() => {
          return {
            className: "cursor-pointer",
          };
        }}
        pagination={{
          total: data?.total,
          pageSize: data?.limit ?? limit,
          onChange: (page) => {
            setPage(page);
          },
        }}
        scroll={{
          x: "max-content",
          y: 500,
        }}
      />
    </div>
  );
};

export default ProjectsOverview;
