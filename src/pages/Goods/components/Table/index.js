import React, { Component } from 'react';
import { Table, Pagination, Button, Dialog, Message } from '@alifd/next';
import IceContainer from '@icedesign/container';
import Filter from '../Filter';
import request from '../../../../utils/fetchUitl';


// MOCK 数据，实际业务按需进行替换


export default class GoodsTable extends Component {
  state = {
    current: 1,
    size: 10,
    isLoading: false,
    data: [],
  };

  getData = () => {
    request({
      url: '/getAll',
      method: 'GET',
      params: {
        pageNum: this.state.current,
        pageSize: this.state.size,
      },
    }).then((res) => {
      Message.success('提交成功');
      console.log('------>', res);
      this.setState({
        data: res,
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

  handleDelete = () => {
    Dialog.confirm({
      title: '提示',
      content: '确认删除吗',
      onOk: () => {
        this.fetchData(10);
      },
    });
  };

  handleDetail = () => {
    Dialog.confirm({
      title: '提示',
      content: '暂不支持查看详情',
    });
  };

  renderOper = () => {
    return (
      <div>
        <Button
          type="primary"
          style={{ marginRight: '5px' }}
          onClick={this.handleDetail}
        >
          详情
        </Button>
        <Button type="normal" warning onClick={this.handleDelete}>
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
            <Table.Column title="商品分类" dataIndex="cate" />
            <Table.Column title="商品标签" dataIndex="tag" />
            <Table.Column title="在售门店" dataIndex="store" />
            <Table.Column title="总销量" dataIndex="sales" />
            <Table.Column title="商品服务" dataIndex="service" />
            <Table.Column
              title="操作"
              width={200}
              dataIndex="oper"
              cell={this.renderOper}
            />
          </Table>
          <Pagination
            style={styles.pagination}
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
