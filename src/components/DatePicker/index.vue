<script lang="ts" setup>
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import isLeapYear from 'dayjs/plugin/isLeapYear'
import customParseFormat from 'dayjs/plugin/customParseFormat'

// emits
const emit = defineEmits(['change'])
dayjs.extend(duration)
dayjs.extend(isLeapYear)
dayjs.extend(customParseFormat)
dayjs.extend(duration)
// stores and utils
const { t } = useI18n()
const pref = usePerferenceStore()
// data field init
const now: Dayjs = dayjs()
const selectedYear = ref<number>(now.year())
const selectedMonth = ref<number>(now.month() + 1)
const selectedDay = ref<number>(1)
const yearArr = ref<number[]>([now.year(), now.subtract(1, 'year').year()])
const months = ref<Dayjs[]>([])
const monthArr = ref<number[]>([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
])
const dayArr = ref<number[]>([])
// generate days by month
const generateDayNumber = () => {
  let end = 0
  const bigMonth = [1, 3, 5, 7, 8, 10]
  // reset
  dayArr.value = []
  selectedDay.value = 1
  // determine day array
  if (selectedMonth.value === 2) {
    console.warn('dayjs(`${selectedYear.', dayjs(`${selectedYear.value.toString()}-01-01`, 'YYYY-MM-DD'))
    const targetYear: Dayjs = dayjs(`${selectedYear.value.toString()}-01-01`, 'YYYY-MM-DD')
    end = targetYear.isLeapYear() ? 29 : 28
  }
  else if (bigMonth.includes(selectedMonth.value)) { end = 31 }
  else { end = 30 }
  for (let i = 1; i <= end; i++)
    dayArr.value.push(i)
}
generateDayNumber() // generate once in init stage
// generating days triggering source
const onChangeMonthOrYear = () => {
  generateDayNumber()
}
const days = ref<Dayjs[]>([])
for (let i = 0; i < 12; i++)
  months.value.push(dayjs().subtract(i, 'M'))

for (let i = 0; i < 30; i++)
  days.value.push(dayjs().subtract(i, 'd'))

// confirm
const hasStartDate: boolean = pref.getStartDateAndEndDate() !== null
const hasSet = ref<boolean>(hasStartDate)
const confirmSelect = () => {
  const start: Dayjs = dayjs(`${selectedYear.value.toString()}-${selectedMonth.value.toString()}-${(selectedDay.value + 1).toString()}`, 'YYYY-M-D')
  pref.setStartDateAndEndDate(start)
  hasSet.value = true
  emit('change')
}
</script>

<template>
  <div class="date-picker">
    <div v-if="hasSet === false">
      <label class="mr-20px">{{ `${t('home.datepicker_label')}:` }}</label>
      <select v-model="selectedYear" name="Years" class="w-100px" @change="onChangeMonthOrYear">
        <option disabled>
          {{ t('home.dp_default_option.year') }}
        </option>
        <option v-for="(year, index) in yearArr" :key="index" :value="year">
          {{ year }}
        </option>
      </select>
      <select v-model="selectedMonth" name="Months" class="w-100px" @change="onChangeMonthOrYear">
        <option disabled>
          {{ t('home.dp_default_option.month') }}
        </option>
        <option v-for="(month, index) in monthArr" :key="index" :value="month">
          {{ month }}
        </option>
      </select>
      <select v-model="selectedDay" name="Days" class="w-100px">
        <option disabled>
          {{ t('home.dp_default_option.day') }}
        </option>
        <option v-for="(day, index) in dayArr" :key="index" :value="day">
          {{ day }}
        </option>
      </select>
      <button class="border-1 rounded" @click="confirmSelect">
        Confirm
      </button>
    </div>
    <div v-else>
      {{ t('home.has_set') }} <button class="border-1 rounded" @click="hasSet = false">
        {{ t('home.reset') }}
      </button>
    </div>
  </div>
</template>

