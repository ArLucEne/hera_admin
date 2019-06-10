import React, { Component } from 'react';
import { Table, Pagination, Button, Dialog, Message } from '@alifd/next';
import IceContainer from '@icedesign/container';
import Filter from '../Filter';
import request from '../../../../utils/fetchUitl';
import ItemDetail from '../Detial';

// MOCK 数据，实际业务按需进行替换


export default class GoodsTable extends Component {
  state = {
    current: 1,
    size: 10,
    isLoading: false,
    data: [],
  };

  getData = () => {
    request('/item/getAll', 'GET', {
      pageNum: this.state.current,
      pageSize: this.state.size,
    }).then((res) => {
      Message.success('提交成功');
      console.log('------>', res);
      this.setState({
        data: res.data.list,
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
    this.setState(
      {
        current,
      },
      () => {
        this.fetchData();
      }
    );
  };

  handleFilterChange = () => {
    this.fetchData(5);
  };

  deleteData = (itemId) => {
    request('/item/deleteById', 'GET', { itemId }).then((res) => {
      console.log(res);
    });
  }


  handleDelete = (index) => {
    Dialog.confirm({
      title: '提示',
      content: '确认删除吗',
      onOk: () => {
        const itemId = this.state.data[index].itemId;
        // console.log(index, this.state.data.indexOf(index));
        this.deleteData(itemId);
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
    const { isLoading, data, current } = this.state;

    return (
      <div style={styles.container}>
        <IceContainer>
          <Filter onChange={this.handleFilterChange} />
        </IceContainer>
        <IceContainer>
          <Table loading={isLoading} dataSource={data} hasBorder={false}>
            <Table.Column title="商品名称" dataIndex="name" />
            <Table.Column title="商品分类" dataIndex="categoryId" />
            <Table.Column title="商品标签" dataIndex="point" />
            <Table.Column title="商品库存" dataIndex="num" />
            <Table.Column title="商品价格" dataIndex="price" />
            <Table.Column title="商品状态" dataIndex="status" />
            <Table.Column
              title="操作"
              width={200}
              dataIndex="oper"
              cell={this.renderOper}
            />
          </Table>
          <Pagination
            style={styles.pagination}
            type="simple"
            current={current}
            onChange={this.handlePaginationChange}
          />
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
