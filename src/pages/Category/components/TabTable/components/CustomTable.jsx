import React, { Component } from 'react';
import { Table, Pagination, Button, Dialog, Message } from '@alifd/next';
import IceContainer from '@icedesign/container';

import request from '../../../../../utils/fetchUitl';


export default class CustomTable extends Component {
  state = {
    current: 1,
    total:0,
    size: 10,
    isLoading: false,
    data: [],
  };

  getData = () => {
    request('/category/findAll', 'GET',).then((res) => {
      Message.success('提交成功');
      console.log('------>', res);
      this.setState({
        data: res.data,
      });
    });
  };


  componentDidMount() {
    this.fetchData();
  }


  fetchData = () => {
    this.setState(
      {
        isLoading: true,
      },
    );
    this.getData();
    this.setState({
      isLoading: false,
    });
  };

  handlePaginationChange = (current) => {
    let temp = current+1;
    this.setState(
      {
        current:temp,
      },
      () => {
        this.fetchData();
      }
    );
  };

  handleFilterChange = () => {
    this.fetchData(5);
  };

  deleteData = (itemCatId) => {
    request('/item/deleteById', 'GET', { itemCatId }).then((res) => {
      console.log(res);
    });
  }


  handleDelete = (index) => {
    Dialog.confirm({
      title: '提示',
      content: '确认删除吗',
      onOk: () => {
        const itemCatId = this.state.data[index].itemCatId;
        // console.log(index, this.state.data.indexOf(index));
        this.deleteData(itemCatId);
        this.setState({
          data: this.state.data.filter((_, i) => i !== index),
        });
      },
    });
  };

  handleDetail = (index) => {
    Dialog.confirm({
      title: '提示',
      content: '暂不支持查看详情',
    });
  };
  // value不能删
  renderOper = (value, index) => {
    return (
      <div>
        <Button
          type="primary"
          style={{ marginRight: '5px' }}
          onClick={this.handleDetail.bind(this, index)}
        >
          详情
        </Button>
        <Button type="normal" warning onClick={this.handleDelete.bind(this, index)}>
          删除
        </Button>
      </div>
    );
  };

  render() {
    const { isLoading, data, current ,total} = this.state;

    return (
      <div style={styles.container}>
        {/* <IceContainer>
          <Filter onChange={this.handleFilterChange} />
        </IceContainer> */}
        <IceContainer>
          <Table loading={isLoading} dataSource={data} hasBorder={false}>
            <Table.Column title="商品种类ID" dataIndex="itemCatId" />
            <Table.Column title="商品种类名称" dataIndex="name" />
            <Table.Column title="商品种类标签" dataIndex="remark" />

            <Table.Column title="创建时间" dataIndex="createDate" />
            <Table.Column
              title="操作"
              width={200}
              dataIndex="oper"
              cell={this.renderOper}
            />
          </Table>
          {/* <Pagination
            style={styles.pagination}
            type="simple"
            total={total}
            current={current}
            pageSize = {5}
            onChange={this.handlePaginationChange}
          /> */}
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
};
