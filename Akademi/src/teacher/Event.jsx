import './Event.css';
import React, { useEffect, useState } from 'react';
import { Badge, Calendar, Modal, Form, Input, Button, Select } from 'antd';
import axios from 'axios';

const getListData = (value, events) => {
    return events[value.format('YYYY-MM-DD')] || [];
};

const getMonthData = (value, events) => {
    return events[value.format('YYYY-MM-DD')] || [];

};

const Event = () => {
    const [events, setEvents] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
  
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/notifications');
                const data = response.data;
                const formattedEvents = {};
                data.forEach(event => {
                    const date = event.date;
                    if (!formattedEvents[date]) {
                        formattedEvents[date] = [];
                    }
                    formattedEvents[date].push({
                        type: event.grade,
                        content: event.content,
                    });
                });
    
                setEvents(formattedEvents); 
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, []);     

    const monthCellRender = (value) => {
        const listData = getMonthData(value, events);
        return listData.length ? (
            <ul className="events">
                {listData.map((item, index) => (
                    <li key={index}>
                        <Badge color={getStatusColor(item.type)} text={item.content} />
                    </li>
                ))}
            </ul>
        ) : null;
    };

    const getStatusColor = (grade) => {
        switch (grade) {
            case 'VII A':
                return '#FB7D5B'; 
            case 'VII B':
                return '#FCC43E'; 
            case 'VII C':
                return '#4D44B5';  
            default:
                return '#9E9E9E';  
        }
    };

    const dateCellRender = (value) => {
        const listData = getListData(value, events);
        return listData.length ? (
            <ul className="events">
                {listData.map((item, index) => (
                    <li key={index}>
                        <Badge color={getStatusColor(item.type)} text={item.content} />
                    </li>
                ))}
            </ul>
        ) : null;
    };

    const cellRender = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        if (info.type === 'month') return monthCellRender(current);
        return info.originNode;
    };

    const onSelectDate = (date) => {
        if (date.isSame(selectedDate, 'day')) {
            setSelectedDate(date);
            setIsModalVisible(true);
        } else {
            setSelectedDate(date);
        }
    };

    const handleOk = async (values) => {
        const formattedDate = selectedDate.format('YYYY-MM-DD');
        const user = JSON.parse(localStorage.getItem('user'));

        const event = {
            grade: values.type,
            content: values.content,
            teacherID: user.teacherID, 
            date: formattedDate,
        };

        try {
            const response = await axios.post('http://localhost:8080/notifications', event);
            const timelineContent = `Teacher ${user.teacherID} added an event to grade ${values.type}'s dashboard`;
            
            await axios.post("http://localhost:8080/timeline", {
                content: timelineContent,
                date: new Date().toISOString(),
                teacherID: user.teacherID,
            });
            if (response.status === 200) {
                const newEvents = [...(events[formattedDate] || []), event];
                setEvents({
                    ...events,
                    [formattedDate]: newEvents,
                });
                setIsModalVisible(false);
                setSelectedDate(null);
            }
            navigator()
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedDate(null);
    };

    return (
        <div>
            <Calendar
                cellRender={cellRender}
                onSelect={onSelectDate}
                mode="month"
                className='tc-dash-all'
            />
            <Modal
                title="Add Event"
                open={isModalVisible}
                footer={null}
                onCancel={handleCancel}
            >
                <Form
                    onFinish={handleOk}
                >
                    <Form.Item
                        name="type"
                        label="To Grade"
                        rules={[{ required: true, message: 'Please select grade!' }]}
                    >
                            <Select
                                
                                style={{ width: '100%' }}
                            >
                                {user.grades.map(grade => (
                                <Option key={grade} value={grade}>
                                    {grade}
                                </Option>
                            ))}
                            </Select>
                    </Form.Item>
                    <Form.Item
                        name="content"
                        label="Content"
                        rules={[{ required: true, message: 'Please input content!' }]}
                    >
                        <Input.TextArea placeholder="Event description" />
                    </Form.Item>
                    <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button style={{ backgroundColor: '#303972' }} type="primary" htmlType="submit">
                            Add Event
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Event;