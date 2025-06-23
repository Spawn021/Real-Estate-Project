import axios from '@/axios'

export const apiGetProperties = (params) =>
  axios({
    url: '/property',
    method: 'get',
    params,
  })
export const apiGetPropertyById = (pid) =>
  axios({
    url: '/property/' + pid,
    method: 'get',
  })
