<script setup lang="ts">
import moment from 'moment'
const startTime = moment('17/10/2022', 'DD/MM/YYYY')
// const endTime = moment()
const days = ref<number>(Number(startTime.toNow(true).slice(0, -4)))
const weekCount = ref<number | string>(0)
if (days.value >= 7)
  weekCount.value = Math.floor(days.value / 7) + 1
else
  weekCount.value = 1

const { t } = useI18n()
const weekText = computed(() => {
  return t('home.current_hint', { week: weekCount.value })
})
</script>

<template>
  <div>
    <p class="font-bold uppercase" style="font-size:5vw;">
      {{ weekText }}
    </p>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
