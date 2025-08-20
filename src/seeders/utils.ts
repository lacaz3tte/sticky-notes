import { faker } from '@faker-js/faker';

// Константы для повторного использования
export const NOTE_TEXTS = [
  'Важная встреча в понедельник',
  'Купить продукты на неделю',
  'Изучить новый фреймворк',
  'Позвонить клиенту',
  'Написать отчет по проекту',
  'Запланировать отпуск',
  'Обновить резюме',
  'Починить кран на кухне',
  'Записаться к врачу',
  'Прочитать новую книгу',
  'Сходить в спортзал',
  'Оплатить счета',
  'Запланировать встречу с командой',
  'Изучить английский язык',
  'Сделать бэкап данных'
];

export const NOTE_COLORS = [
  '#ffff88', '#ffdd88', '#ffbb88', '#88ff88', '#88ddff',
  '#8888ff', '#dd88ff', '#ff88dd', '#ff8888', '#88ffcc',
  '#ffcc88', '#ccff88', '#88ccff', '#ff88ff', '#cc88ff'
];

export const TAG_COLORS = [
  '#ff4444', '#ffbb33', '#00C851', '#33b5e5', '#2bbbad',
  '#4285F4', '#aa66cc', '#ff6b6b', '#4ecdc4', '#45b7d1',
  '#f9ca24', '#f0932b', '#eb4d4b', '#6ab04c', '#c7ecee'
];

export const TAG_NAMES = [
  'Важное', 'Срочное', 'Идеи', 'Задачи', 'Заметки',
  'Проект', 'Личное', 'Работа', 'Дом', 'Покупки',
  'Здоровье', 'Финансы', 'Обучение', 'Путешествия', 'Разное',
  'Высокий приоритет', 'Средний приоритет', 'Низкий приоритет'
];

export function getRandomNoteText() {
  return faker.helpers.arrayElement(NOTE_TEXTS);
}

export function getRandomNoteColor() {
  return faker.helpers.arrayElement(NOTE_COLORS);
}

export function getRandomTagName() {
  return faker.helpers.arrayElement(TAG_NAMES);
}

export function getRandomTagColor() {
  return faker.helpers.arrayElement(TAG_COLORS);
}