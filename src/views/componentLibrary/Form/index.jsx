
import React, { useState, useEffect } from 'react'
import { Form, Icon, Input, Button, message, Spin, Card, Select, Result, Empty } from "antd";
import './style.less'
const { Option } = Select;




const FormComponent = (props) => {
    const { form } = props;
    const { getFieldDecorator } = form;
    const [loading, setLoading] = useState(false);
    const [lowResult, setLowResult] = useState('');   //返回的low
    const [highResult, setHighResult] = useState('');  //返回的high
    const [stateResult, setStateResult] = useState('');   //返回的类型
    const [probeResult, setProbeResult] = useState('');  //返回的语句
    const [saveResult, setSaveResult] = useState('');  //返回的语句



    const formItemLayout =

    {
        labelCol: { span: 2 },
        wrapperCol: { span: 14 },
    }

    //开始请求
    const getHttpResult = ({ urlValue, typeProbeValue, ipValue, portValue, lowValue, highValue }) => {
        setLoading(true)
        setLowResult('')
        setHighResult('')
        setStateResult('')
        setProbeResult('')
        setSaveResult('')

        let timestamp = Date.parse(new Date()) / 1000;
        let nickname = ''

        let data = {
            stime: String(timestamp),
            surl: urlValue,
            type_probe: typeProbeValue,
            addr: ipValue,
            port: portValue,
            low: lowValue,
            high: highValue,
            nickname: nickname

        }

        setTimeout(() => {
            setLoading(false)
            setStateResult('')
            setLowResult('')
            setHighResult('')
            setProbeResult('')
        }, 3000);


    }

    const handleConfirmHighValue = (rule, value, callback) => {

        let lowValue = props.form.getFieldValue('lowValue');

        const pattern = /^([1-9]\d*|[0]{1,1})$/
        if (!pattern.test(value)) {
            return callback(new Error('只能输入大于等于0的整数'));
        } else {
            if (Number(value) > Number(lowValue)) {
                callback()
            } else {
                callback(new Error('上线时长必须要大于下线时长'))

            }
        }
    }


    const handleConfirmLowValue = (rule, value, callback) => {

        let highValue = props.form.getFieldValue('highValue');

        const pattern = /^([1-9]\d*|[0]{1,1})$/
        if (!pattern.test(value)) {
            return callback(new Error('只能输入大于等于0的整数'));
        } else {
            if (Number(value) < Number(highValue)) {
                callback()
            } else {
                callback(new Error('下线时长必须要小于上线时长'))

            }
        }
    }



    const handleSubmit = (event) => {


        // 阻止事件的默认行为
        event.preventDefault();

        // 对所有表单字段进行检验
        form.validateFields((err, values) => {
            // 检验成功
            if (!err) {
                // console.log(values)
                getHttpResult(values)

            } else {
                console.log("检验失败!");
            }
        });
    };

    return (
        <div className="http-timeout-probe">
            <Form onSubmit={handleSubmit} className="form-content" layout={'horizontal'}>
                <div className="title">
                    <h2>表单组件</h2>
                </div>
                <Spin spinning={loading} tip="请求中...">
                    <Form.Item label="网址" {...formItemLayout}>
                        {getFieldDecorator("urlValue", {
                            rules: [
                                {
                                    required: true,
                                    whitespace: true,
                                    message: "请输入url",
                                },
                                {
                                    pattern: /^(?:(http|https|ftp):\/\/)?((?:[\w-]+\.)+[a-z0-9]+)((?:\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/i,
                                    message: '请输入正确规范的地址',
                                },
                            ],
                            initialValue: "", // 初始值
                        })(
                            <Input
                                placeholder="url地址"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="类型" {...formItemLayout}>
                        {getFieldDecorator("typeProbeValue", {
                            rules: [
                                {
                                    required: true,
                                    whitespace: true,
                                    message: "请选择类型",
                                },
                            ],
                            initialValue: "类型1", // 初始值
                        })(
                            <Select
                                placeholder="请选择类型"
                                showSearch
                                showArrow
                                allowClear
                            >
                                <Option value="类型1">类型1</Option>
                                <Option value="类型2">类型2</Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="ip" {...formItemLayout}>
                        {getFieldDecorator("ipValue", {
                            rules: [
                                {
                                    required: true,
                                    whitespace: true,
                                    message: "请输入ip",
                                },
                                {
                                    pattern: /^(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
                                    message: '请输入正确规范的ip',
                                },
                            ],
                            initialValue: "", // 初始值
                        })(
                            <Input
                                placeholder="ip"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="端口" {...formItemLayout}>
                        {getFieldDecorator("portValue", {
                            rules: [
                                {
                                    required: true,
                                    whitespace: true,
                                    message: "请输入端口号",
                                },
                                {
                                    pattern: /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
                                    message: '请输入正确规范的端口号',
                                },
                            ],
                            initialValue: "", // 初始值
                        })(
                            <Input
                                placeholder="端口号"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="下线时长" {...formItemLayout}>
                        {getFieldDecorator("lowValue", {
                            rules: [
                                {
                                    required: true,
                                    whitespace: true,
                                    message: "大于等于0的整数",
                                },
                                {
                                    validator: (rule, value, callback) => handleConfirmLowValue(rule, value, callback)
                                },
                            ],
                            initialValue: "", // 初始值
                            validateTrigger: 'onBlur'
                        })(
                            <Input
                                placeholder="下线时长"

                            />
                        )}
                    </Form.Item>
                    <Form.Item label="上线时长" {...formItemLayout}>
                        {getFieldDecorator("highValue", {
                            rules: [
                                {
                                    required: true,
                                    whitespace: true,
                                    message: "大于等于0的整数"
                                },
                                {
                                    validator: (rule, value, callback) => handleConfirmHighValue(rule, value, callback)
                                },
                            ],
                            initialValue: "", // 初始值
                            validateTrigger: 'onBlur'
                        })(
                            <Input
                                placeholder="请输入上线时长"

                            />
                        )}
                    </Form.Item>
                    <Form.Item label="请求" {...formItemLayout}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="probe-form-button"
                        >
                            开始请求
                        </Button>
                    </Form.Item>
                </Spin>
            </Form>
            <div className="probe-result">
                <div className='title'>
                    <h2>结果</h2>
                </div>
                {
                    !stateResult &&
                    <Empty description={
                        <span style={{ fontSize: '20px', color: '#ccc' }}>暂无</span>
                    } style={{ height: '240px' }} />
                }
                {
                    stateResult == 'fail' &&
                    <Result
                        status="warning"
                        title={
                            <div
                                style={{ display: 'inline-block' }}>
                                <span>{probeResult}</span>
                                <span style={{ color: ' rgb(24, 144, 255)', marginLeft: '60px', fontSize: '16px' }}>({saveResult})</span>
                            </div>
                        }

                    />

                }
                {
                    stateResult == 'success' &&
                    <Result
                        icon={<Icon type="smile" theme="twoTone" />}
                        title={
                            <div style={{ display: 'inline-block' }}>
                                <span style={{ color: '#000' }}>范围：</span>
                                <span>{lowResult}~{highResult}</span>
                                <span style={{ color: ' rgb(24, 144, 255)', marginLeft: '60px', fontSize: '16px' }}>({saveResult})</span>

                            </div>
                        }

                    />

                }


            </div>
        </div>
    )
}


export default Form.create()(FormComponent);
