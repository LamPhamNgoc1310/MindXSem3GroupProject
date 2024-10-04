import { Button, Form, Input, Modal } from 'antd'
import axios from 'axios';
import React, { useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UserTeacher = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [imagePreview, setImagePreview] = useState(user.avatar);
    const [selectedImage, setSelectedImage] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [form] = Form.useForm();
    const nav = useNavigate();
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file))
        }
    };

    const handleFileSelectClick = () => {
        document.getElementById('file-input').click();
    };

    const handleSubmit = async (values) => {
        try {
            if (selectedImage) {
                let formData = new FormData();
                formData.append('avatar', selectedImage);
                await axios.put('http://localhost:8080/teachers/up-avatar?email=' + values.email, formData);
            }

            const { studentName, email, password, ...updateValues } = values;

            await axios.put("http://localhost:8080/teachers/update-teacher", { ...updateValues, email });

            const updatedUser = {
                ...JSON.parse(localStorage.getItem('user')),
                ...values,
                avatar: selectedImage ? imagePreview : user.avatar
            };
            localStorage.setItem('user', JSON.stringify(updatedUser));

            setOpenModal(true);
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
        }
    };

    const handleOk = () => {
        form.resetFields();
        setSelectedImage(null);
        setImagePreview(user.avatar);
        setOpenModal(false);
        nav('/u/userTeacher')
    };


    return (
        <div>
            <Form
                onFinish={handleSubmit}
                form={form}
                layout="vertical"
                className="tc-add-std-detail"
                initialValues={{
                    teacherName: user.teacherName,
                    email: user.email,
                    address: user.address,
                    phone: user.phone,
                    dateOfBirth: user.dateOfBirth,
                    teacherID: user.teacherID,
                    grade: user.grades.join(", "),
                    phoneNumber: user.phoneNumber,
                    subject: user.subject
                }}
            >
                <div className="tc-add-std-head">
                    <p>Teacher Details</p>
                </div>
                <table className="tc-table-input">
                    <tr>
                        <td rowSpan={2} style={{ verticalAlign: 'top', width: 180, paddingRight: 40 }}>
                            <p>Photo</p>
                            <div className="tc-add-photo" onClick={handleFileSelectClick}>
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Selected" style={{ width: '100%', height: '100%' }} />
                                ) : (
                                    <p>Drag and drop or click here to select file</p>
                                )}
                            </div>
                            <input
                                type="file"
                                style={{ display: 'none' }}
                                id="file-input"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </td>
                        <td style={{ width: 450, paddingRight: 40 }}>
                            <Form.Item
                                name="teacherName"
                                label={<p style={{ color: '#303972', fontSize: 18 }}>Name</p>}
                                rules={[{ required: true, message: 'Please input teacher name!' }]}
                            >
                                <Input placeholder="Samantha William" />
                            </Form.Item>
                        </td>
                        <td style={{ width: 400 }}>
                            <Form.Item
                                name="teacherID"
                                label={<p style={{ color: '#303972', fontSize: 18 }}>Teacher ID</p>}
                                rules={[{ required: true, message: 'Please input grade!' }]}
                            >
                                <Input disabled />
                            </Form.Item>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ width: 400, paddingRight: 40 }}>
                            <Form.Item
                                name="dateOfBirth"
                                label={<p style={{ color: '#303972', fontSize: 18 }}>Date of Birth</p>}
                                rules={[{ required: true, message: 'Please input birth date!' }]}
                            >
                                <Input placeholder="Date of Birth" />
                            </Form.Item>
                        </td>
                        <td>
                            <Form.Item
                                name="grade"
                                label={<p style={{ color: '#303972', fontSize: 18 }}>Grade</p>}
                                rules={[{ required: true, message: 'Please input birth place!' }]}
                            >
                                <Input disabled />
                            </Form.Item>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td style={{ width: 400, paddingRight: 40 }}>
                            <Form.Item
                                name="email"
                                label={<p style={{ color: '#303972', fontSize: 18 }}>Email</p>}
                                rules={[{ required: true, message: 'Please input email!' }]}
                            >
                                <Input disabled />
                            </Form.Item>
                        </td>
                        <td>
                            <Form.Item
                                name="subject"
                                label={<p style={{ color: '#303972', fontSize: 18 }}>Subject</p>}
                                rules={[{ required: true, message: 'Please input subject!' }]}
                            >
                                <Input disabled/>
                            </Form.Item>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td style={{ paddingRight: 40 }}>
                            <Form.Item
                                name="address"
                                label={<p style={{ color: '#303972', fontSize: 18 }}>Address</p>}
                                rules={[{ required: true, message: 'Please input address!' }]}
                            >
                                <Input.TextArea placeholder="Enter your address here" />
                            </Form.Item>
                        </td>
                        <td>
                            <Form.Item
                                name="phoneNumber"
                                label={<p style={{ color: '#303972', fontSize: 18 }}>Phone Number</p>}
                                rules={[{ required: true, message: 'Please input teacher phone number!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td>
                            <div style={{ display: 'flex', justifyContent: 'end' }}>
                                <Button type="primary" htmlType="submit" className="tc-table-sm">
                                    Save
                                </Button>
                            </div>
                        </td>
                    </tr>
                </table>
            </Form>
            <Modal
                title={<span style={{ color: '#3d32b8' }}>Form Submitted</span>}
                open={openModal}
                onOk={handleOk}
                okButtonProps={{ style: { backgroundColor: '#4D44B5' } }}
                okText="OK"
                cancelButtonProps={{ style: { color: '#4D44B5' } }}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4D44B5', fontSize: 28, marginBottom: 20 }}><FaCheckCircle /></div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4D44B5', fontSize: 18 }}><p>You have successfully submitted the form.</p></div>
            </Modal>
        </div>
    )
}

export default UserTeacher
