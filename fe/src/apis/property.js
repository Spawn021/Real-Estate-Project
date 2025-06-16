import axios from '@/axios'

export const apiGetProperties = (params) =>
  axios({
    url: '/property',
    method: 'get',
    params,
  })
