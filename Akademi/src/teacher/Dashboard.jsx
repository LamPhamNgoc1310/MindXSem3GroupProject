import './Event.css';
import React, { useState } from 'react';
import { Badge, Calendar } from 'antd';

const getListData = (value, events) => {
    return events[value.format('YYYY-MM-DD')] || [];
};

const getMonthData = (value, events) => {
    return events[value.format('YYYY-MM-DD')] || [];
};

const Dashboard = () => {
    const [events] = useState({
        '2024-10-01': [{ type: 'VII A', content: 'Math Test' }],
        '2024-10-02': [{ type: 'VII B', content: 'Science Project' }],
    });

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

    return (
        <div>
            <Calendar
                cellRender={cellRender}
                mode="month"
                className='tc-dash-all'
            />
        </div>
    );
};

export default Dashboard;
