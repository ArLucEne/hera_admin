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
import { ChartAxisConfig } from '@antv/g2/src';
import request from '../../../../utils/fetchUitl.js';


const { Option } = Select;
const { Group: RadioGroup } = Radio;
const { RangePicker } = DatePicker;

export default class GoodsForm extends Component {
  state = {
    value: {},
  };

  formChange = (value) => {
    console.log('value', value);
  };

  validateAllFormField = () => {
    // this.refs.form.validateAll((errors, values) => {
    //   if (errors) {
    //     return;
    //   }
    //   console.log({ values });
    //   Message.success('提交成功');
    // });
    this.postForm();
  };

  postForm(){
    request({
      url:'/save',
      method: 'POST',
      data: {
        "body":this.state.value
      }
    }).then(function(res){
      Message.success('提交成功');
      console.log(res);
    })
    
  }

  render() {
    return (
      <div>
        <PageHead title="添加商品" />
        <IceContainer style={{ padding: '40px' }}>
          <IceFormBinderWrapper
            value={this.state.value}    //已经绑定数据
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
              <IceFormBinder name="categoryId">
                <Select
                  placeholder="请选择"
                  mode="multiple"
                  style={{ width: '400px' }}
                >
                  <Option value="1">新品</Option>
                  <Option value="2">数码</Option>
                  <Option value="3">智能</Option>
                  <Option value="4">生活</Option>
                </Select>
              </IceFormBinder>
            </div>

            <div style={styles.formItem}>
              <div style={styles.formLabel}>商品卖点：</div>
              <IceFormBinder name="point">
                <Input
                  placeholder="请输入商品卖点"
                  style={{ width: '400px' }}
                />
              </IceFormBinder>
            </div>

            
            <div style={styles.formItem}>
              <div style={styles.formLabel}>商品描述：</div>
              <IceFormBinder name="desc">
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
              <IceFormBinder name="saleNum" required message="必填">
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
            {/* <div style={styles.formItem}>
              <div style={styles.formLabel}>预售时间：</div>
              <IceFormBinder name="reverseTime">
                <RangePicker style={{ width: '400px' }} />
              </IceFormBinder>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>预约条件：</div>
              <IceFormBinder name="payment">
                <RadioGroup
                  dataSource={[
                    {
                      value: '1',
                      label: '需要支付',
                    },
                    {
                      value: '2',
                      label: '无需支付',
                    },
                  ]}
                />
              </IceFormBinder>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>体验展示：</div>
              <IceFormBinder name="show">
                <RadioGroup
                  dataSource={[
                    {
                      value: '1',
                      label: '展示',
                    },
                    {
                      value: '2',
                      label: '不展示',
                    },
                  ]}
                />
              </IceFormBinder>
            </div> */}
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
