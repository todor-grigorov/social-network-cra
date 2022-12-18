import React from 'react';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Widgets from "../components/Widgets";

const Main = () => {
    return (
        <div className="app__body">
            <Sidebar />
            <Feed />
            <Widgets />
        </div>
    )
}

export default Main