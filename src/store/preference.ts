import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Dayjs } from 'dayjs'

type MyDate = null | Dayjs
export const usePerferenceStore = defineStore('preference', () => {
  /**
   * Current name of the user.
   */
  const startDate = useStorage<MyDate>('perference:startDate', null)
  const endDate = ref<MyDate>(null)

  /**
 *
* @param sd Input Start Date
* @param ed Input End Date(Can be null)
*/
  function setStartDateAndEndDate(sd: MyDate, ed?: MyDate) {
    startDate.value = sd
  }
  return {
    startDate,
    endDate,

    setStartDateAndEndDate,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePerferenceStore, import.meta.hot))
