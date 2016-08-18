/**
 * Created by yuxuan on 7/8/16.
 */

import React from 'react'
import {Button,Form,Input} from 'antd'
// import './login.css'
const FormItem = Form.Item
const ButtonGroup = Button.Group
import boardImage from '../../images/board.jpg'
import styles from './login.less'

export default React.createClass({
    render() {
        let formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        let backStyle = {
            backgroundImage: 'url('+boardImage+')',
            backgroundSize: '100% 100%'
        };
        return (
            <div className={styles.board}>
                <h1>Log in</h1>
                <Form horizontal>
                    <FormItem
                        {...formItemLayout}
                        label="用户名" prefixCls="login-label ant-form"
                    >
                        <Input size="small" type="text" placeholder="用户名" />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="密码" prefixCls="login-label ant-form"
                    >
                        <Input size="small" type="password" placeholder="密码" />
                    </FormItem>
                    <FormItem wrapperCol={{ span: 16, offset: 8 }} style={{ marginTop: 24 }}>
                        <ButtonGroup>
                            <Button type="primary" htmlType="submit">登录</Button>
                            <Button type="ghost">注册</Button>
                        </ButtonGroup>
                    </FormItem>
                </Form>
            </div>
        );
    }
})
