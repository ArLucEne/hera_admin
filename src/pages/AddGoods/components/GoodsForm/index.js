/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  Input,
  Button,
  Message,
  NumberPicker,
  DatePicker,
  Radio,
  Select,
} from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import PageHead from '../../../../components/PageHead';
import request from '../../../../utils/fetchUitl.js';
import { withRouter } from 'react-router-dom';

const { Option } = Select;
const { Group: RadioGroup } = Radio;
const { RangePicker } = DatePicker;

@withRouter
export default class GoodsForm extends Component {
  state = {
    value: {},
    category: [],
  };

  formChange = (value) => {
    console.log('value', value);
  };

  fetchCategory = () => {
    request('/category/findAll', 'GET').then((res) => {
      const datesource = [];
      if (res.data.length > 0) {
        res.data.map((category) => {
          datesource.push({
            label: category.name,
            value: category.categoryId,
            key: category.categoryId,
          });
        });
        this.setState({
          category: datesource,
        }
        );
      }
    });
  };

  componentDidMount() {
    this.fetchCategory();
  }

  validateAllFormField = () => {
    this.postForm();
  };

  postForm() {
    request('/item/save', 'POST', this.state.value).then((res) => {
      Message.success('提交成功');
      this.props.history.push('/goods');
    });
  }

  render() {
    return (
      <div>
        <PageHead title="添加商品" />
        <IceContainer style={{ padding: '40px' }}>
          <IceFormBinderWrapper
            value={this.state.value} // 已经绑定数据
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formItem}>
              <div style={styles.formLabel}>商品名称：</div>
              <IceFormBinder name="name" required message="商品名称必填">
                <Input
                  placeholder="请输入商品名称"
                  style={{ width: '400px' }}
                />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="name" />
              </div>
            </div>

            <div style={styles.formItem}>
              <div style={styles.formLabel}>商品所属种类：</div>
              <IceFormBinder name="cId">
                <Select
                  placeholder="请选择"
                  mode="single"
                  style={{ width: '400px' }}
                  dataSource={this.state.category}
                />
              </IceFormBinder>
            </div>

            <div style={styles.formItem}>
              <div style={styles.formLabel}>商品卖点：</div>
              <IceFormBinder name="sellPoint">
                <Input
                  placeholder="请输入商品卖点"
                  style={{ width: '400px' }}
                />
              </IceFormBinder>
            </div>


            <div style={styles.formItem}>
              <div style={styles.formLabel}>商品描述：</div>
              <IceFormBinder name="description">
                <Input.TextArea
                  placeholder="请描述商品"
                  style={{ width: '400px' }}
                />
              </IceFormBinder>
            </div>

            <div style={styles.formItem}>
              <div style={styles.formLabel}>库存量：</div>
              <IceFormBinder name="num" required message="库存量必填">
                <NumberPicker />
              </IceFormBinder>
            </div>

            <div style={styles.formItem}>
              <div style={styles.formLabel}>限买数量：</div>
              <IceFormBinder name="limitNum" required message="必填">
                <NumberPicker />
              </IceFormBinder>
            </div>

            <div style={styles.formItem}>
              <div style={styles.formLabel}>商品价格：</div>
              <IceFormBinder name="price" required message="商品价格必填">
                <Input
                  placeholder="请输入商品价格: ￥199.99"
                  style={{ width: '400px' }}
                />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="price" />
              </div>
            </div>
            <Button type="primary" onClick={this.validateAllFormField}>
              提 交
            </Button>
          </IceFormBinderWrapper>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  formItem: {
    marginBottom: '30px',
    display: 'flex',
    alignItems: 'center',
  },
  formLabel: {
    fontWeight: '450',
    width: '80px',
  },
  formError: {
    marginTop: '10px',
  },
  button: {
    marginLeft: '100px',
  },
};
