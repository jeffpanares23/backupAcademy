import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Input, notification } from 'antd';
import { Button, TableContainer, Table, TableBody, TableRow, TableCell, Box, Skeleton } from '@mui/material';
import {
  AiOutlineUser,
  AiOutlineQq,
  AiOutlineDeploymentUnit,
  AiOutlineGoogle,
  AiOutlineSafety,
} from 'react-icons/ai';
import Iconify from '../../components/iconify';
import useUserData from '../../_mock/UserData';

const AddUser = ({ rows, setRows }) => {
  const { name, email } = useUserData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    fullname: '',
    codename: '',
    teamname: '',
    interest: '',
    emailaddress: '',
    password: '',
    status: '',
    role: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // const submitNewUser = () => {
  //   axios
  //     .post('http://localhost:8000/insert', userData)
  //     .then((response) => {
  //       console.log(response);
  //       const newUser = { id: response.data.insertId, ...userData };
  //       setRows([...rows, newUser]);
  //       setIsModalOpen(false);

  //       notification.success({
  //         message: 'User Added',
  //         description: 'The user has been successfully added.',
  //       });
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const updateUser = () => {
    axios
      .post('http://localhost:8000/insert', userData)
      .then((response) => {
        console.log(response);
        const newUser = { id: response.data.insertId, ...userData };
        setRows([...rows, newUser]);
        setIsModalOpen(false);

        notification.success({
          message: 'User Added',
          description: 'The user has been successfully added.',
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const inputFields = [
    { label: 'Full name', prefix: <AiOutlineUser />, key: 'fullname' },
    { label: 'Code name', prefix: <AiOutlineQq />, key: 'codename' },
    { label: 'Team', prefix: <AiOutlineDeploymentUnit />, key: 'teamname' },
    { label: 'Email', prefix: <AiOutlineGoogle />, key: 'emailaddress' },
  ];

  const renderInputs = inputFields.map((input) => (
    <div key={input.key}>
      <Input
        size="large"
        placeholder={input.label}
        prefix={input.prefix}
        onChange={(event) =>
          setUserData((prevData) => ({ ...prevData, [input.key]: event.target.value }))
        }
        value={userData[input.key]}
      />
      <br /><br />
    </div>
  ));

  return (
    <div>
      <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={showModal}>
        Update Profile
      </Button>

      <Modal title="Create User" open={isModalOpen} onOk={updateUser} onCancel={handleCancel}>
        {renderInputs}

        <Input.Password
          prefix={<AiOutlineSafety />}
          placeholder="Input password"
          visibilityToggle={{
            visible: passwordVisible,
            onVisibleChange: setPasswordVisible,
          }}
          onChange={(event) =>
            setUserData((prevData) => ({ ...prevData, password: event.target.value }))
          }
        />
        <br /><br />
      </Modal>
    </div>
  );
};

export const LoaderTable = () => (
  <TableContainer>
    <Table>
      <TableBody>
        {[1, 2, 3, 4, 5].map((rowIndex) => (
          <TableRow key={rowIndex}>
            {[1, 2, 3, 4, 5].map((colIndex) => (
              <TableCell key={colIndex}>
                <Box style={{ marginBottom: '3px', padding: '20px' }}>
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    width="100%"
                    height={15}
                    sx={{
                      backgroundColor: ['#A9A9A9', '#F5F5F5'],
                      borderRadius: '30px',
                    }}
                  />
                </Box>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default AddUser;
