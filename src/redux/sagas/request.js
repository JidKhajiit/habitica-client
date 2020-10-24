// @ts-check
import axios from 'axios'

const DEFAULT_ERROR_MESSAGE = 'Failed to request data from the server. Please try again later.'
class ConttollerError extends Error {
  constructor(status, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params)
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ConttollerError)
    }
    this.status = status
  }
}
const apiTemplate = {
  axiosApi: null,
  baseURL: null,
  getTokenSilently: null,
  logout: null,
  /**
   * @returns {Promise}
   */
  init: async function () {
    if (!this.axiosApi) {
      this.axiosApi = axios.create({
        baseURL: `${this.baseURL}`,
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        }
      })
    }
    // Always update the token and get the last one
    const accessToken = await this.getTokenSilently()
    this.axiosApi.defaults.headers.Authorization = `Bearer ${accessToken}`
  },
  /**
   *
   * @param {String} url
   * @example
   * // returns a Caregiver Object
   * await api.get('/caregivers/${id}')
   * @example
   * // returns an array with 2 Caregivers Object
   * await api.get('/caregivers', { limit: 2 })
   * @returns {Promise}
   */
  get: async function (url, params) {
    let response
    try {
      await this.init()
      response = await this.axiosApi.get(url, { params })
      return response.data
    } catch (err) {
      if (!err.response) {
        console.error(`Error retrieving data for id ${url} from ${this.axiosApi.defaults.baseURL}: ${err.message}`)
      } else {
        console.error(`Error code = ${err.response.status} retrieving data for id ${url} from ${this.axiosApi.defaults.baseURL}`)
      }
      await this.handlingError(err)
      throw this.createError(err)
    }
  },
  /**
   * @param {String} url
   * @param {Object} body
   * @example
   * // overwrites an object with ${id}
   * await api.put('caregivers/${id}', {_id: 'asdkh23iu423h598453yt', name: 'Bob', email: 'bob@gmail.com'})
   * @returns {Promise}
   */
  put: async function (url, body) {
    let response
    try {
      await this.init()
      response = await this.axiosApi.put(url, body)
      return response.data
    } catch (err) {
      if (!err.response) console.error(`Error putting data: ${body} for ${this.axiosApi.defaults.baseURL}: ${err.message}`)
      else console.error(`Error (code = ${err.response.status}) putting data: ${body} for ${this.axiosApi.defaults.baseURL}`)
      await this.handlingError(err)
      throw this.createError(err)
    }
  },
  /**
   * @param {String} url
   * @param {Object} body
   * @example
   * // updates 'name' and 'email for the object with ${id}'
   * await api.patch('caregivers/${id}', {name: 'Bob', email: 'bob@gmail.com'})
   * @returns {Promise}
   */
  patch: async function (url, body) {
    let response
    try {
      await this.init()
      response = await this.axiosApi.patch(url, body)
      return response.data
    } catch (err) {
      if (!err.response) console.error(`Error patching data: ${body} for ${this.axiosApi.defaults.baseURL}: ${err.message}`)
      else console.error(`Error (code = ${err.response.status}) patching data: ${body} for ${this.axiosApi.defaults.baseURL}`)
      await this.handlingError(err)
      throw this.createError(err)
    }
  },
  /**
   *
   * @param {string} url
   * @param {Object} body
   * // adding new data
   * await api.post('caregivers', {name: 'Bob', email: 'bob@gmail.com'})
   * @returns {Promise}
   */
  post: async function (url, body) {
    let responce
    try {
      await this.init()
      responce = await this.axiosApi.post(url, body)
      return responce.data
    } catch (err) {
      if (!err.response) {
        console.error(`Error patching data: ${body} for ${this.axiosApi.defaults.baseURL}: ${err.message}`)
      } else {
        console.error(`Error (code = ${err.response.status}) patching data: ${body} for ${this.axiosApi.defaults.baseURL}`)
      }
      await this.handlingError(err)
      throw this.createError(err)
    }
  },
  handlingError: async (error) => {
    if (error.responce) {
      if (error.responce.status === 401) this.logout()
    }
  },
  createError: (error, message = DEFAULT_ERROR_MESSAGE) => {
    if (error.response) {
      return new ConttollerError(error.response.status, message)
    }
    return new ConttollerError(500, message)
  }
}
export function createApi(baseURL, getTokenSilently, logout) {
  return { ...apiTemplate, baseURL, getTokenSilently, logout }
}