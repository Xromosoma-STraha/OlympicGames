<template>
  <div v-if="pending">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else-if="athletes">
      <ul>
          <li v-for="athlete in athletes" :key="athlete.Фамилия + athlete.Имя">
              {{ athlete.Фамилия }} {{ athlete.Имя }}
              <div v-if="athlete.Год_проведения">
                  Участвовал в {{ athlete.Год_проведения }} году в соревновании {{ athlete.Название_соревнования }} и занял {{ athlete.Место }} место. Результат: {{ athlete.Результат }}
              </div>
              <div v-else>
                  Не участвовал в соревнованиях
              </div>
          </li>
      </ul>
  </div>
      <div v-else>
          Спортсмены не найдены
      </div>
</template>

<script setup lang="ts">
import type { Athlete } from '~/types/athlete';

const route = useRoute();
const athleteName = route.params.name ?? '';

const { data: athletes, pending, error } = await useFetch<Athlete[]>(`/api/athletes/${athleteName}`); // <-- Вот здесь ключевое изменение

</script>