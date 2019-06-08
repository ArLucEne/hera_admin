import React, { Component } from 'react';
import DetailTable from './components/DetailTable';
import TabTable from './components/TabTable';

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="category-page">
        {/* 展示详情信息的表格 */}
        <DetailTable />

        <TabTable />
      </div>
    );
  }
}
