import { Timeline } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const groupTimelineItemsByDate = (items) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).setHours(0, 0, 0, 0);

    const sortedItems = items.sort((a, b) => new Date(b.date) - new Date(a.date));

    const groupedItems = {
        Today: [],
        Yesterday: [],
        Older: []
    };

    sortedItems.forEach(item => {
        const itemDate = new Date(item.date).setHours(0, 0, 0, 0);
        if (itemDate === today) {
            groupedItems.Today.push(item);
        } else if (itemDate === yesterday) {
            groupedItems.Yesterday.push(item);
        } else {
            groupedItems.Older.push(item);
        }
    });

    return groupedItems;
};

const fetchTimelineItems = async () => {
    const response = await axios.get("http://localhost:8080/timeline");
    return response.data; 
};

const formatDate = (dateString) => {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false 
    });

    return `${formattedDate} ${formattedTime}`;
};


const TeacherTimeline = () => {
    const [timelineItems, setTimelineItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchTimelineItems();
            setTimelineItems(data); 
        };
        fetchData();
    }, []);

    const groupedItems = groupTimelineItemsByDate(timelineItems);

    return (
        <div className='tc-bg-timeline'>
            <Timeline>
                {groupedItems.Today.length > 0 && (
                    <>
                        <Timeline.Item className="no-dot">
                            <h3 style={{color:'#303972', fontSize:22, fontWeight:700}}>Today</h3>
                        </Timeline.Item>
                        {groupedItems.Today.map((item, index) => (
                            <Timeline.Item key={index}>
                                <p className='tc-bg-timeline-date'>{formatDate(item.date)}</p>
                                <div style={{color:'#303972', fontWeight: 500, fontSize: 16}}>{item.content}</div>
                            </Timeline.Item>
                        ))}
                    </>
                )}

                {groupedItems.Yesterday.length > 0 && (
                    <>
                        <Timeline.Item className="no-dot">
                            <h3 style={{color:'#303972', fontSize:22, fontWeight:700, marginTop: 50}}>Yesterday</h3>
                        </Timeline.Item>
                        {groupedItems.Yesterday.map((item, index) => (
                            <Timeline.Item key={index}>
                                <p className='tc-bg-timeline-date'>{formatDate(item.date)}</p>
                                <div style={{color:'#303972', fontWeight: 500, fontSize: 16}}>{item.content}</div>
                            </Timeline.Item>
                        ))}
                    </>
                )}

                {groupedItems.Older.length > 0 && (
                    <>
                        <Timeline.Item className="no-dot">
                            <h3 style={{color:'#303972', fontSize:22, fontWeight:700, marginTop: 50}}>Older</h3>
                        </Timeline.Item>
                        {groupedItems.Older.map((item, index) => (
                            <Timeline.Item key={index}>
                                <p className='tc-bg-timeline-date'>{formatDate(item.date)}</p>
                                <div style={{color:'#303972', fontWeight: 500, fontSize: 16}}>{item.content}</div>
                            </Timeline.Item>
                        ))}
                    </>
                )}
            </Timeline>
        </div>
    );
};

export default TeacherTimeline;
