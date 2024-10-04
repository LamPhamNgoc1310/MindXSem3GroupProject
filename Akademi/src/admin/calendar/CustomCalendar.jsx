import "@ant-design/cssinjs"
import "./CustomCalendar.css";
import React, { useState } from "react";
import { Badge, Calendar, Modal, Form, Input, Button } from "antd";

const getListData = (value, events) => {
  return events[value.format("YYYY-MM-DD")] || [];
};

const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const CustomCalendar = () => {
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value) => {
    const listData = getListData(value, events);
    return listData.length ? (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    ) : null;
  };

  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  const onSelectDate = (date) => {
    setSelectedDate(date);
    setIsModalVisible(true);
  };

  const handleOk = (values) => {
    const formattedDate = selectedDate.format("YYYY-MM-DD");
    const newEvents = [...(events[formattedDate] || []), values];
    setEvents({
      ...events,
      [formattedDate]: newEvents,
    });
    setIsModalVisible(false);
    setSelectedDate(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedDate(null);
  };

  return (
    <div className="calendar">
      <Calendar
        cellRender={(current, info) => {
          if (info.type === "date") return dateCellRender(current);
          if (info.type === "month") return monthCellRender(current);
          return info.originNode;
        }}
        onSelect={onSelectDate}
        className="tc-dash-all"
      />
      <Modal
        title="Add Event"
        open={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <Form onFinish={handleOk}>
          <Form.Item
            name="type"
            label="Event Type"
            rules={[{ required: true, message: "Please select event type!" }]}
          >
            <Input placeholder="e.g., success, warning, error" />
          </Form.Item>
          <Form.Item
            name="content"
            label="Event Content"
            rules={[{ required: true, message: "Please input event content!" }]}
          >
            <Input.TextArea placeholder="Event description" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Event
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CustomCalendar;
