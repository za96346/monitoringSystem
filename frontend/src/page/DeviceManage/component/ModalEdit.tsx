import { Form, Input, InputNumber } from "antd";
import { Modal } from "share/Modal/Index";
import modal from 'share/Modal/types'

interface modalInfo {
    onSave: (v: ApiParams.Device["update" | "add"]) => void
    device?: Entity.Device
}

interface props {
    modalInfo: modal.modalInfoProps<modalInfo>
}

const ModalEdit = ({ modalInfo }: props) => {
    const [form] = Form.useForm()
    return (
        <>
            <Form
                name="validateOnly"
                autoComplete="off"
                className='row'
                form={form}
                onFinish={() => {
                    const fields = form.getFieldsValue()
                    modalInfo.onSave({ ...fields, id: modalInfo?.device?.id })
                }}
            >
                <Form.Item
                    name="deviceName"
                    label="裝置名稱"
                    className='col-md-6'
                    initialValue={modalInfo?.device?.deviceName || ''}
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="sort"
                    label="排序"
                    className='col-md-6'
                    initialValue={modalInfo?.device?.sort || 0}
                    rules={[{ required: true }]}
                >
                    <InputNumber />
                </Form.Item>

                <Modal.Footer>
                    {
                        () => (
                            <>
                                <button
                                    onClick={() => { modalInfo?.onClose() }}
                                    className="btn btn-secondary"
                                >
                                    關閉
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    儲存
                                </button>
                            </>
                        )
                    }
                </Modal.Footer>
            </Form>
        </>
    )
}

export default Modal<modalInfo, any>({
    children: ModalEdit,
    title: (v) => "編輯",
    width: (isLess) => isLess('md') ? '100vw' : '500px'
})
