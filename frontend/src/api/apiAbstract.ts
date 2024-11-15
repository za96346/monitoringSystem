/* eslint-disable prefer-promise-reject-errors */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { type SweetAlertOptions } from 'sweetalert2'

import { MySwal } from '../func/Swal'
import { v4 } from 'uuid'

// type
interface responseParams<T> {
    data: T
    message: string
    success: boolean
}

interface dataRequestParams {
    url: string
    data?: FormData | string | object | (() => any)
    loading?: () => void // 等待開使
    loadingActionName?: string // 載入的 action name
}

interface formRequestParams extends dataRequestParams, SweetAlertOptions {
    checkTitle?: string
    check_type?: 'question' | 'warning' | 'error' | 'success' | 'info'
    checkText?: string
    imgUrl?: string
    method?: 'put' | 'post' | 'delete' | 'get'
}

interface formValueType {
    formName: string
    validCheck: boolean
    InvalidAction?: () => void
}

type axiosRequestConfig = AxiosRequestConfig & { id: string }
type axiosResponse = AxiosResponse<any, any> & { config: { id: string } }

// instance
const instance = axios.create({
    withCredentials: true,
    baseURL: `${window.location.origin}/workApp/`
})

const showErrorDialog = async (error): Promise<void> => {
    const data = error?.response?.data || error?.data
    await MySwal.AlertMessage({
        icon: 'error',
        title: data?.message
    })
}

// 請求前攔截器
instance.interceptors.request.use(
    async (config: axiosRequestConfig) => {
        config.id = v4()
        return config
    },
    async (error) => {
        void showErrorDialog(error)
        return await Promise.reject()
    }
)

// 回傳攔截器
instance.interceptors.response.use(
    (response: axiosResponse): any => {
        return response?.data
    },
    async (error) => {
        void showErrorDialog(error)

        if (error.response.status === 511) {
            window.location.href = '/entry/login'
        }

        return await Promise.reject()
    }
)

/**
 * 當繼承 此類的時候
 * 請給此類 一個 redux store and loadingAction.
 * 如此才會照常 執行
 *
 * @route 路由 {}
 * @type api ctl type {}
 * @checkTitle
 * @loadingAction
 * @store
*/
class apiAbstract {
    // api type
    public type: Record<string, any>

    protected checkTitle = {
        confirmUpdate: '確定修改？',
        confirmAdd: '確定新增？',
        confirmDelete: '確認刪除？'
    }

    // 生成 form
    /**
     * @param formValue = [
     *      {
     *          formName: string, // dont need a hashTag
     *          validCheck: boolean,
     *          InvalidAction: () => {}
     *      }
     * ]
     * @return FormData
    */
    public makeFormData (formValue: formValueType[]): [Record<string, any>, boolean] {
        const formDataObject = {}
        let isValid = true
        formValue.forEach((item) => {
            const form: HTMLFormElement | null = document.querySelector(`#${item?.formName}`)
            if (form) {
                // 如果 需要檢查 以及 檢查沒過
                if (item.validCheck && !form?.checkValidity()) {
                    // 先跑 原生跳出
                    // 如果 發現 找步道 就換 tabs emit
                    form?.reportValidity()

                    if (item?.InvalidAction) item?.InvalidAction()
                    isValid = false
                    throw new Error('表單驗證失敗')
                }
                const a = new FormData(form)
                // eslint-disable-next-line no-restricted-syntax
                for (const pair of a.entries()) {
                    formDataObject[pair[0]] = pair[1]
                }
            }
        })
        return [formDataObject, isValid]
    }

    private loading (loadingActionName: string | undefined, state: boolean): void {
    }

    // 請求 這是有 確認框的
    /**
     * @T 是 回傳類型
     * @description 這個方法會驗證兩次form 表單 因為 check alert window 裡面也有可能放表單
    */
    private async ConfirmRequest <T extends any>(v: formRequestParams): Promise<T> {
        return await MySwal.checkMessage<responseParams<T>>({
            title: v?.checkTitle,
            icon: v?.check_type || 'question',
            text: v?.checkText,
            imageUrl: v?.imgUrl,
            showLoaderOnConfirm: true,
            ...v,
            preConfirm: async () => {
                return await instance?.[v?.method]<T>(
                    v?.url,
                    v?.method === 'delete'
                        ? {
                            data: v?.data
                        }
                        : v?.data
                )
            }
        }).then((response): T => {
            void MySwal.AlertMessage({
                icon: 'success',
                title: response?.value?.message
            })
            return response?.value?.data as unknown as T
        })
    }

    protected async POST<T extends any>(v: formRequestParams): Promise<T> {
        return await this.ConfirmRequest({ ...v, method: 'post' })
    }

    protected async PUT<T extends any>(v: formRequestParams): Promise<T> {
        return await this.ConfirmRequest({ ...v, method: 'put' })
    }

    protected async DELETE<T extends any>(v: formRequestParams): Promise<T> {
        return await this.ConfirmRequest({ ...v, method: 'delete' })
    }

    // 請求 這是沒有確認框的
    /**
     * @T 是 回傳類型
    */
    protected async GET <T extends any>(v: dataRequestParams): Promise<T> {
        return await instance.get<T>(
            v?.url,
            {
                params: v?.data
            }
        ).then((v) => v?.data)
    }
}

export default apiAbstract
