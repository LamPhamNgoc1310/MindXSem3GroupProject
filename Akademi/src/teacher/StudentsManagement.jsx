import { Col, Modal, Row, Input, Button, Select, Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
import './StudentsManagement.css'
import { FaPlus } from 'react-icons/fa'
import { IoSearch } from 'react-icons/io5'
import { Table } from 'antd';
import { TfiEmail } from 'react-icons/tfi'
import { FiPhone } from 'react-icons/fi'
import { Link, useOutletContext } from 'react-router-dom'
import { CiEdit } from 'react-icons/ci'
import { MdDeleteOutline } from 'react-icons/md'
import axios from 'axios'
import { Option } from 'antd/es/mentions'

const StudentsManagement = () => {
    const { setActiveItem } = useOutletContext();
    const [refreshData, setRefreshData] = useState(false);
    const [students, setStudents] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isContactModalVisible, setIsContactModalVisible] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [searchStudentInput, setSearchStudentInput] = useState('');
    const [contact, setContact] = useState([]);
    const [user, setUser] = useState({grades: []});

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get("http://localhost:8080/students");
                setStudents(response.data);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };
        const user = JSON.parse(localStorage.getItem('user'));
        setUser(user);
        fetchStudents();
    }, [refreshData]);

    const filteredStudents = students.filter(student =>
        student.studentName.toLowerCase().includes(searchStudentInput.toLowerCase())
    );

    const columns = [
        {
            title: <span style={{ color: '#303972' }}>Name</span>,
            dataIndex: 'studentName',
            render: (text) => (
                <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', width: 200 }}>
                    <div className='tc-avt-table'></div>
                    <span style={{ marginLeft: 8, color: '#303972', fontSize: '16px', fontWeight: '700' }}>{text}</span>
                </div>)
        },
        {
            title: <span style={{ color: '#303972' }}>ID</span>,
            dataIndex: 'studentID',
            render: (text) => (
                <div style={{ width: 57 }}>
                    <span style={{ color: '#4D44B5', fontSize: '16px', fontWeight: '700' }}>{text}</span>
                </div>
            ),
        },
        {
            title: <span style={{ color: '#303972' }}>Date</span>,
            dataIndex: 'dateOfBirth',
            render: (text) => (
                <div style={{ width: 120 }}>
                    <span style={{ color: '#A098AE', fontSize: '14px' }}>{text}</span>
                </div>
            ),
        },
        {
            title: <span style={{ color: '#303972' }}>Parent Name</span>,
            dataIndex: 'parentName',
            render: (text) => (
                <div style={{ width: 130 }}>
                    <span style={{ color: '#303972', fontSize: '16px' }}>{text}</span>
                </div>
            ),
        },
        {
            title: <span style={{ color: '#303972' }}>City</span>,
            dataIndex: 'city',
            render: (text) => (
                <div style={{ width: 100 }}>
                    <span style={{ color: '#303972', fontSize: '16px' }}>{text}</span>
                </div>
            ),
        },
        {
            title: <span style={{ color: '#303972' }}>Contact</span>,
            dataIndex: 'contact',
            render: (text, record) => (
                <div
                    onClick={() => {
                        setIsContactModalVisible(true);
                        callApiContact(record);
                    }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 15, fontSize: 20, color: '#4D44B5', cursor: 'pointer' }}
                >
                    <div className='tc-sss'><FiPhone /></div>
                    <div className='tc-sss'><TfiEmail /></div>
                </div>
            )
        },
        {
            title: <span style={{ color: '#303972' }}>Grade</span>,
            dataIndex: 'grade',
            render: (text) => {
                if (text === "VII A") {
                    return (
                        <div style={{ width: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', cursor: 'pointer', backgroundColor: '#FB7D5B', padding: '10px 20px', borderRadius: 20 }}>
                            <div>{text}</div>
                        </div>
                    )
                } else if (text === "VII B") {
                    return (
                        <div style={{ width: 72, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', cursor: 'pointer', backgroundColor: '#FCC43E', padding: '10px 20px', borderRadius: 20 }}>
                            <div>{text}</div>
                        </div>)
                } else {
                    return (
                        <div style={{ width: 72, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', cursor: 'pointer', backgroundColor: '#4D44B5', padding: '10px 20px', borderRadius: 20 }}>
                            <div>{text}</div>
                        </div>)
                }
            }
        },
        {
            title: <span style={{ color: '#303972' }}>Action</span>,
            dataIndex: 'action',
            align: 'right',
            render: (_, record) => {
                return (
                    <div style={{ width: 50 }}>
                        <CiEdit style={{ fontSize: 20, cursor: 'pointer', color: '#4D44B5' }} onClick={() => { onEditStudent(record) }} />
                        <MdDeleteOutline onClick={() => {
                            confirmDelete(record)
                        }} style={{ color: 'red', cursor: 'pointer', marginLeft: 10, fontSize: 20 }} />
                    </div>
                )
            }
        },
    ];

    const itemsTab = user.grades.map((grade, index) => ({
        key: (index + 1).toString(),
        label: grade,
        children: (
            <Table
                columns={columns}
                dataSource={filteredStudents.filter(student => student.grade === grade)}
                pagination={{ pageSize: 5 }}
                rowKey="id"
                scroll={{ x: 1070 }}
            />
        ),
    }));


    const onEditStudent = async (record) => {
        setIsEditing(true);
        setEditingStudent({ ...record });
    };

    const callApiContact = async (record) => {
        let data = await axios.get("http://localhost:8080/students");
        const student = data.data.find(student => student.studentID === record.studentID);
        setContact({
            phone: student.phone,
            email: student.email,
            parentPhone: student.parentPhone,
            parentEmail: student.parentEmail
        });
    }

    const confirmDelete = (record) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this student?',
            content: `Student: ${record.studentName} (ID: ${record.studentID})`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => onDelStudent(record),
        });
    };

    const onDelStudent = async (record) => {
        try {
            await axios.delete(`http://localhost:8080/students/delete-student/${record.studentID}`);
            setRefreshData(prev => !prev);
        } catch (error) {
            console.error("Error deleting student:", error);
        }
        const timelineContent = `Teacher TC001 has deleted student ${record.studentID} - ${record.studentName}`;

        await axios.post("http://localhost:8080/timeline", {
            content: timelineContent,
            date: new Date().toISOString(),
            teacherID: "TC001",
        });
    };


    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:8080/students/update-student/${editingStudent.studentID}`, editingStudent);
            setIsEditing(false);
            setRefreshData(prev => !prev);

        } catch (error) {
            console.error("Error updating student:", error);
        }
        const timelineContent = `Teacher TC001 has edited student ${editingStudent.studentID} - ${editingStudent.studentName}`;

        await axios.post("http://localhost:8080/timeline", {
            content: timelineContent,
            date: new Date().toISOString(),
            teacherID: "TC001",
        });
    };

    return (
        <Col className='tc-sm-body'>
            <Row className='tc-flex-layout'>
                <div className='tc-search-layout'>
                    <IoSearch />
                    <Input
                        placeholder='Search here...'
                        value={searchStudentInput}
                        onChange={(e) => setSearchStudentInput(e.target.value)}
                        style={{ width: 350 }}
                        className='tc-met-qua-r'
                    />
                </div>
                <div className='tc-sth-layout'>
                    <div className='tc-add-std'>
                        <Link className='tc-link' to='add' onClick={() => {
                            setActiveItem('Add New Student')
                        }}><FaPlus /><span className='gap-plus'>New Student</span></Link>
                    </div>
                </div>
            </Row>
            <Row style={{ marginTop: 40, backgroundColor: 'white', padding: "10px 20px", borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                <Tabs defaultActiveKey="1" items={itemsTab} />
            </Row>

            <Modal
                title="Edit Student"
                open={isEditing}
                onCancel={() => setIsEditing(false)}
                onOk={handleSave}
                okButtonProps={{ style: { backgroundColor: '#4D44B5' } }}
            >
                <p>Name:</p>
                <Input
                    value={editingStudent?.studentName}
                    onChange={(e) => setEditingStudent({ ...editingStudent, studentName: e.target.value })}
                />
                <p>Date of Birth:</p>
                <Input
                    value={editingStudent?.dateOfBirth}
                    onChange={(e) => setEditingStudent({ ...editingStudent, dateOfBirth: e.target.value })}
                />
                <p>Parent Name:</p>
                <Input
                    value={editingStudent?.parentName}
                    onChange={(e) => setEditingStudent({ ...editingStudent, parentName: e.target.value })}
                />
                <p>City:</p>
                <Input
                    value={editingStudent?.city}
                    onChange={(e) => setEditingStudent({ ...editingStudent, city: e.target.value })}
                />
                <p>Grade:</p>
                <Select
                    value={editingStudent?.grade}
                    style={{ width: '100%'}}
                    onChange={(value) => setEditingStudent({ ...editingStudent, grade: value })}
                >
                    <Option value="VII A">VII A</Option>
                    <Option value="VII B">VII B</Option>
                    <Option value="VII C">VII C</Option>
                </Select>
            </Modal>
            <Modal
                title={<span style={{ color: '#303972', fontSize: 18 }}>Contact Information</span>}
                open={isContactModalVisible}
                onCancel={() => setIsContactModalVisible(false)}
                onOk={() => setIsContactModalVisible(false)}
                okButtonProps={{ style: { backgroundColor: '#303972' } }}
            >
                <p style={{ fontSize: 16 }}><strong style={{ color: '#303972' }}>Phone: </strong> {contact.phone}</p>
                <p style={{ fontSize: 16 }}><strong style={{ color: '#303972' }}>Email: </strong> {contact.email}</p>
                <p style={{ fontSize: 16 }}><strong style={{ color: '#303972' }}>Parent Phone: </strong> {contact.parentPhone}</p>
                <p style={{ fontSize: 16 }}><strong style={{ color: '#303972' }}>Parent Email: </strong> {contact.parentEmail}</p>
            </Modal>

        </Col>
    )
}

export default StudentsManagement;
