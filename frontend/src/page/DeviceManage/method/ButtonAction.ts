import ModalEdit from '../component/ModalEdit'
import { modalType } from 'static'

const BtnEvent = ({ type, value, deviceApi, reload }: BtnEventParams<Entity.Device> & { deviceApi: Api.Device }): void => {
    const onClose = (): void => {
        ModalEdit.close({})
        void deviceApi.get({}).then((v) => reload(v))
    }
    if (type === modalType.delete) {
        void deviceApi.delete({ id: value.id })
            .then(onClose)
        return
    }

    ModalEdit.open({
        type,
        device: value,
        onSave: (formValue) => {
            if (type === modalType.edit) {
                void deviceApi.update({
                    ...formValue,
                    id: value.id
                })
                    .then(onClose)
            } else if (type === modalType.add) {
                void deviceApi.add(formValue)
                    .then(onClose)
            }
        }
    })
}
export default BtnEvent
