import React, { Component } from 'react';
import { Table, Pagination, Button, Dialog } from '@alifd/next';
import IceContainer from '@icedesign/container';
import FilterTag from '../FilterTag';
import FilterForm from '../FilterForm';
import request from '../../../../utils/fetchUitl';
// Random Numbers
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// MOCK 数据，实际业务按需进行替换


export default class GoodsTable extends Component {
  state = {
    current: 1,
    total:0,
    size: 10,
    isLoading: false,
    data: [],
  };

  getData = () => {
    request('/order/findAll', 'GET').then((res) => {
      let orderlist = res.data;
    orderlist.map(order=>{
      let itemOrder = order.itemOrderList;
      let items = "";
      itemOrder.map(item_order =>{
          items= items+"_"+item_order.itemName;
      });
      order.buyerMessage = items;
    });
      this.setState({
        data: orderlist,
        total: res.data,
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


  deleteData = (orderId) => {
    request('/order/deleteById', 'GET', { orderId }).then((res) => {
      console.log(res);
    });
  }


  handleDelete = (index) => {
    Dialog.confirm({
      title: '提示',
      content: '确认删除吗',
      onOk: () => {
        const itemId = this.state.data[index].orderId;
        // console.log(index, this.state.data.indexOf(index));
        this.deleteData(itemId);
        this.setState({
          data: this.state.data.filter((_, i) => i !== index),
        });
      },
    });
  };

  handleDetail = () => {
    Dialog.confirm({
      title: '提示',
      content: '暂不支持查看详情',
    });
  };

  renderOper = (value,index) => {
    return (
      <div>
        {/* <Button
          type="primary"
          style={{ marginRight: '5px' }}
          onClick={this.handleDetail}
        >
          详情
        </Button> */}
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
        {/* <IceContainer>
          <FilterTag onChange={this.handleFilterChange} />
          <FilterForm onChange={this.handleFilterChange} />
        </IceContainer> */}
        <IceContainer>
          <Table loading={isLoading} dataSource={data} hasBorder={false}>
            <Table.Column title="订单编号" dataIndex="orderId" />
            <Table.Column title="订单商品" dataIndex="buyerMessage" />
            <Table.Column title="买家ID" dataIndex="buyerId" />
            <Table.Column title="订单金额(元)" dataIndex="payment" />
            <Table.Column title="邮费金额(元)" dataIndex="postFee" />
            <Table.Column title="下单时间" dataIndex="createTime" />
            <Table.Column title="订单状态" dataIndex="status" />
            <Table.Column
              title="操作"
              width={200}
              dataIndex="oper"
              cell={this.renderOper}
            />
          </Table>
          {/* <Pagination
            style={styles.pagination}
            current={current}
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
