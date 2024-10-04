import React, { useState } from 'react';
import './AddNewStudent.css';
import { Radio, Modal, Form, Input, Button, Select } from 'antd';
import { FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';

const AddNewStudent = () => {
    const [form] = Form.useForm();
    const [valueRadio, setValueRadio] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const onChangeRadio = (e) => {
        setValueRadio(e.target.value);
    };

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
            const user = JSON.parse(localStorage.getItem('user'));
            let formData = new FormData();
            formData.append('avatar', selectedImage);
            const { studentName, email, password, ...updateValues } = values;            
            await axios.post("http://localhost:8080/students/register", {
                studentName,
                email,
                password,
            });

            await axios.put("http://localhost:8080/students/update-student", { ...updateValues, email });

            await axios.put('http://localhost:8080/students/update-student-avatar?email=' + values.email, formData);
            let data = await axios.get("http://localhost:8080/students");
            const student = data.data.find(student => student.email === values.email);
            const timelineContent = `Teacher ${user.teacherID} has added new student ${student.studentID} - ${values.studentName}`;

            await axios.post("http://localhost:8080/marks", { studentID: student.studentID });

            await axios.post("http://localhost:8080/timeline", {
                content: timelineContent,
                date: new Date().toISOString(),
                teacherID: user.teacherID,
            });

            setOpenModal(true);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleOk = () => {
        form.resetFields();
        setSelectedImage(null);
        setValueRadio(1);
        setOpenModal(false);
        setImagePreview(null);
    };

    const handleCancel = () => {
        form.resetFields();
        setSelectedImage(null);
        setImagePreview(null);
        setValueRadio(1);
    };

    return (
        <>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                className="tc-add-std-detail"
                initialValues={{
                    payment: valueRadio,
                }}
            >
                <div className="tc-add-std-head">
                    <p>Student Details</p>
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
                                name="studentName"
                                label={<p style={{ color: '#303972', fontSize: 18 }}>Student Name</p>}
                                rules={[{ required: true, message: 'Please input student name!' }]}
                            >
                                <Input placeholder="Samantha William" />
                            </Form.Item>
                        </td>
                        <td style={{ width: 400 }}>
                            <Form.Item
                                name="grade"
                                label={<p style={{ color: '#303972', fontSize: 18 }}>Grade</p>}
                                rules={[{ required: true, message: 'Please input grade!' }]}
                            >
                                <Select placeholder="Select grade" style={{ marginTop: 10 }}>
                                    <Option value="VII A">VII A</Option>
                                    <Option value="VII B">VII B</Option>
                                    <Option value="VII C">VII C</Option>
                                </Select>
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
                                name="city"
                                label={<p style={{ color: '#303972', fontSize: 18 }}>Place of Birth</p>}
                                rules={[{ required: true, message: 'Please input birth place!' }]}
                            >
                                <Input placeholder="Place of Birth" />
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
                                <Input placeholder="william@gmail.com" />
                            </Form.Item>
                        </td>
                        <td>
                            <Form.Item
                                name="password"
                                label={<p style={{ color: '#303972', fontSize: 18 }}>Password</p>}
                                rules={[{ required: true, message: 'Please input student password!' }]}
                            >
                                <Input placeholder="*****" />
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
                                name="phone"
                                label={<p style={{ color: '#303972', fontSize: 18 }}>Student Phone</p>}
                                rules={[{ required: true, message: 'Please input student phone number!' }]}
                            >
                                <Input placeholder="+1234567890" />
                            </Form.Item>
                        </td>
                    </tr>
                </table>

                <div className="tc-add-std-head">
                    <p>Parent Details</p>
                </div>
                <table className="tc-table-input">
                    <tr>
                        <td style={{ width: 400, paddingRight: 40 }}>
                            <Form.Item
                                name="parentName"
                                label={<p style={{ color: '#303972', fontSize: 18 }}>Parent Name</p>}
                                rules={[{ required: true, message: 'Please input parent name!' }]}
                            >
                                <Input placeholder="Lili William" />
                            </Form.Item>
                        </td>
                        <td style={{ width: 400 }}>
                            <Form.Item
                                name="parentPhone"
                                label={<p style={{ color: '#303972', fontSize: 18 }}>Parent Phone</p>}
                                rules={[{ required: true, message: 'Please input parent phone!' }]}
                            >
                                <Input placeholder="+1234567890" />
                            </Form.Item>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ paddingRight: 40 }}>
                            <Form.Item
                                name="parentEmail"
                                label={<p style={{ color: '#303972', fontSize: 18 }}>Parent Email</p>}
                                rules={[{ required: true, message: 'Please input parent email!' }]}
                            >
                                <Input placeholder="william@gmail.com" />
                            </Form.Item>
                        </td>
                        <td className="tc-payment">
                            <Form.Item
                                name="payment"
                                label={<p style={{ color: '#303972', fontSize: 18 }}>Payment</p>}
                                rules={[{ required: true, message: 'Please select payment method!' }]}
                            >
                                <Radio.Group onChange={onChangeRadio} value={valueRadio}>
                                    <Radio value={1}>Cash</Radio>
                                    <Radio value={2}>Debit</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </td>
                    </tr>
                </table>
                <div className='tc-2-btn'>
                    <Button type="default" onClick={handleCancel} className="tc-table-cc">
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit" className="tc-table-sm">
                        Submit
                    </Button>
                </div>
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
        </>
    );
};

export default AddNewStudent;
