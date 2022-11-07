import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

type MyDate = null | Dayjs
export const usePerferenceStore = defineStore('preference', () => {
  /**
   * Current name of the user.
   */
  const startDate = ref<MyDate>(null)
  /**
 *
* @param sd Input Start Date
*/
  function setStartDateAndEndDate(sd: MyDate) {
    localStorage.setItem('preference:startDate', JSON.stringify(sd))
  }
  /**
 *
 * @returns Dayjs StartDate, empty string stands for no start date
 */
  function getStartDateAndEndDate() {
    const psd = localStorage.getItem('preference:startDate')
    if (psd === null) { return null }
    else {
      startDate.value = JSON.parse(psd)
      return JSON.parse(psd)
    }
  }
  return {
    startDate,
    setStartDateAndEndDate,
    getStartDateAndEndDate,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePerferenceStore, import.meta.hot))
