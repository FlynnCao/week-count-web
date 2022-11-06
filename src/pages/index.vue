<script setup lang="ts">
// import Daysjs
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
type MyDate = null | Dayjs
dayjs.extend(relativeTime)

// stores and utils
const { t } = useI18n()
const pref = usePerferenceStore()
const onlyDate = ref<MyDate>(pref.startDate)

// Definition
const weekCount = ref<number>(0)
const weekText = computed<string>(() => {
  return t('home.current_hint', { week: weekCount.value })
})

// functions and watchers
function displayDateDifference() {
  const diff = dayjs().diff(onlyDate.value, 'day')
  // const startTime = moment('17/10/2022', 'DD/MM/YYYY')
  if (diff >= 7)
    weekCount.value = Math.floor(diff / 7) + 1
  else
    weekCount.value = 1
}
displayDateDifference()
pref.$subscribe((mutations, state) => {
  onlyDate.value = state.startDate
  displayDateDifference()
})
</script>

<template>
  <div>
    <DatePicker />
    <p class="font-bold uppercase" style="font-size:5vw;">
      {{ weekText }}
    </p>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
