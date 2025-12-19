<template>
  <div class="calendar-page">
    <div class="calendar-header">
      <h1 class="page-title">Calendar</h1>
      <div class="header-actions">
        <button @click="previousMonth" class="nav-btn">
          <ChevronLeft :size="20" />
        </button>
        <h2 class="current-month">{{ currentMonthYear }}</h2>
        <button @click="nextMonth" class="nav-btn">
          <ChevronRight :size="20" />
        </button>
        <button @click="goToToday" class="today-btn">Aujourd'hui</button>
      </div>
    </div>

    <!-- Calendar Grid -->
    <div class="calendar-container">
      <div class="calendar-grid">
        <!-- Day Headers -->
        <div class="day-header" v-for="day in weekDays" :key="day">
          {{ day }}
        </div>

        <!-- Calendar Days -->
        <div
          v-for="(day, index) in calendarDays"
          :key="index"
          class="calendar-day"
          :class="{
            'other-month': !day.isCurrentMonth,
            'today': day.isToday,
            'has-events': day.events && day.events.length > 0
          }"
          @click="selectDay(day)"
        >
          <div class="day-number">{{ day.day }}</div>
          <div v-if="day.events && day.events.length > 0" class="day-events">
            <div
              v-for="(event, eventIndex) in day.events.slice(0, 3)"
              :key="eventIndex"
              class="event-dot"
              :style="{ background: event.color }"
              :title="event.title"
            ></div>
            <span v-if="day.events.length > 3" class="more-events">+{{ day.events.length - 3 }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Events Panel -->
    <div class="events-panel">
      <div class="panel-header">
        <h3 class="panel-title">Événements</h3>
        <button @click="showAddEventModal = true" class="add-event-btn">
          <Plus :size="18" />
          Ajouter
        </button>
      </div>

      <!-- Selected Day Events -->
      <div v-if="selectedDay" class="selected-day-section">
        <h4 class="section-title">{{ formatSelectedDay(selectedDay) }}</h4>
        <div v-if="selectedDay.events && selectedDay.events.length > 0" class="events-list">
          <div
            v-for="(event, index) in selectedDay.events"
            :key="index"
            class="event-item"
            :style="{ borderLeftColor: event.color }"
          >
            <div class="event-time">{{ event.time }}</div>
            <div class="event-content">
              <div class="event-title">{{ event.title }}</div>
              <div class="event-description">{{ event.description }}</div>
            </div>
            <button @click="deleteEvent(selectedDay, index)" class="delete-btn">
              <Trash2 :size="16" />
            </button>
          </div>
        </div>
        <div v-else class="no-events">
          <p>Aucun événement pour ce jour</p>
        </div>
      </div>

      <!-- Upcoming Events -->
      <div class="upcoming-section">
        <h4 class="section-title">Événements à venir</h4>
        <div v-if="upcomingEvents.length > 0" class="events-list">
          <div
            v-for="(event, index) in upcomingEvents"
            :key="index"
            class="event-item"
            :style="{ borderLeftColor: event.color }"
          >
            <div class="event-date">{{ formatEventDate(event.date) }}</div>
            <div class="event-content">
              <div class="event-title">{{ event.title }}</div>
              <div class="event-description">{{ event.description }}</div>
            </div>
          </div>
        </div>
        <div v-else class="no-events">
          <p>Aucun événement à venir</p>
        </div>
      </div>
    </div>

    <!-- Add Event Modal -->
    <div v-if="showAddEventModal" class="modal-overlay" @click="showAddEventModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Ajouter un événement</h3>
          <button @click="showAddEventModal = false" class="close-btn">
            <X :size="20" />
          </button>
        </div>
        <form @submit.prevent="addEvent" class="event-form">
          <div class="form-group">
            <label>Titre</label>
            <input v-model="newEvent.title" type="text" required class="form-input" />
          </div>
          <div class="form-group">
            <label>Date</label>
            <input v-model="newEvent.date" type="date" required class="form-input" />
          </div>
          <div class="form-group">
            <label>Heure</label>
            <input v-model="newEvent.time" type="time" required class="form-input" />
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea v-model="newEvent.description" class="form-textarea" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label>Couleur</label>
            <div class="color-picker">
              <button
                v-for="color in eventColors"
                :key="color"
                type="button"
                class="color-option"
                :class="{ active: newEvent.color === color }"
                :style="{ background: color }"
                @click="newEvent.color = color"
              ></button>
            </div>
          </div>
          <div class="form-actions">
            <button type="button" @click="showAddEventModal = false" class="cancel-btn">Annuler</button>
            <button type="submit" class="submit-btn">Ajouter</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ChevronLeft, ChevronRight, Plus, Trash2, X } from 'lucide-vue-next'

const currentDate = ref(new Date())
const selectedDay = ref(null)
const showAddEventModal = ref(false)
const events = ref([])

const newEvent = ref({
  title: '',
  date: '',
  time: '',
  description: '',
  color: '#3B82F6'
})

const eventColors = ['#3B82F6', '#F97316', '#22C55E', '#FACC15', '#8B5CF6', '#EC4899']

const weekDays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
const monthNames = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
]

const currentMonthYear = computed(() => {
  return `${monthNames[currentDate.value.getMonth()]} ${currentDate.value.getFullYear()}`
})

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()
  
  const days = []
  
  // Days from previous month
  const prevMonth = new Date(year, month - 1, 0)
  const daysInPrevMonth = prevMonth.getDate()
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    days.push({
      day: daysInPrevMonth - i,
      date: new Date(year, month - 1, daysInPrevMonth - i),
      isCurrentMonth: false,
      isToday: false,
      events: []
    })
  }
  
  // Current month days
  const today = new Date()
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
    const dateStr = formatDate(date)
    days.push({
      day,
      date,
      isCurrentMonth: true,
      isToday: date.toDateString() === today.toDateString(),
      events: events.value.filter(e => e.date === dateStr)
    })
  }
  
  // Days from next month
  const remainingDays = 42 - days.length
  for (let day = 1; day <= remainingDays; day++) {
    days.push({
      day,
      date: new Date(year, month + 1, day),
      isCurrentMonth: false,
      isToday: false,
      events: []
    })
  }
  
  return days
})

const upcomingEvents = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  return events.value
    .filter(event => {
      const eventDate = new Date(event.date)
      eventDate.setHours(0, 0, 0, 0)
      return eventDate >= today
    })
    .sort((a, b) => {
      const dateA = new Date(a.date + 'T' + a.time)
      const dateB = new Date(b.date + 'T' + b.time)
      return dateA - dateB
    })
    .slice(0, 5)
})

function formatDate(date) {
  return date.toISOString().split('T')[0]
}

function formatSelectedDay(day) {
  if (!day) return ''
  const date = day.date
  return `${day.day} ${monthNames[date.getMonth()]} ${date.getFullYear()}`
}

function formatEventDate(dateStr) {
  const date = new Date(dateStr)
  return `${date.getDate()} ${monthNames[date.getMonth()]}`
}

function previousMonth() {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

function nextMonth() {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

function goToToday() {
  currentDate.value = new Date()
  const today = calendarDays.value.find(d => d.isToday)
  if (today) {
    selectedDay.value = today
  }
}

function selectDay(day) {
  selectedDay.value = day
}

function addEvent() {
  const event = {
    ...newEvent.value,
    id: Date.now()
  }
  
  events.value.push(event)
  
  // Reset form
  newEvent.value = {
    title: '',
    date: '',
    time: '',
    description: '',
    color: '#3B82F6'
  }
  
  showAddEventModal.value = false
  
  // Save to localStorage
  saveEvents()
}

function deleteEvent(day, index) {
  const event = day.events[index]
  const eventIndex = events.value.findIndex(e => e.id === event.id)
  if (eventIndex > -1) {
    events.value.splice(eventIndex, 1)
    saveEvents()
  }
}

function saveEvents() {
  localStorage.setItem('kanari-calendar-events', JSON.stringify(events.value))
}

function loadEvents() {
  const saved = localStorage.getItem('kanari-calendar-events')
  if (saved) {
    events.value = JSON.parse(saved)
  } else {
    // Add some sample events
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    events.value = [
      {
        id: 1,
        title: 'Maintenance préventive',
        date: formatDate(today),
        time: '10:00',
        description: 'Maintenance des équipements hydrauliques',
        color: '#3B82F6'
      },
      {
        id: 2,
        title: 'Rapport mensuel',
        date: formatDate(tomorrow),
        time: '14:00',
        description: 'Présentation du rapport mensuel de production',
        color: '#F97316'
      }
    ]
    saveEvents()
  }
}

onMounted(() => {
  loadEvents()
  const today = calendarDays.value.find(d => d.isToday)
  if (today) {
    selectedDay.value = today
  }
})
</script>

<style scoped>
.calendar-page {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem;
  background: #FAFAFA;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1A1A1A;
  margin: 0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-btn {
  width: 40px;
  height: 40px;
  border-radius: 0.5rem;
  border: 1px solid #E5E7EB;
  background: #FFFFFF;
  color: #1A1A1A;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.nav-btn:hover {
  background: #F3F4F6;
  border-color: #3B82F6;
}

.current-month {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0;
  min-width: 200px;
  text-align: center;
}

.today-btn {
  padding: 0.5rem 1rem;
  background: #3B82F6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.today-btn:hover {
  background: #2563EB;
}

.calendar-container {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
}

.day-header {
  padding: 0.75rem;
  text-align: center;
  font-weight: 600;
  color: #6B7280;
  font-size: 0.875rem;
}

.calendar-day {
  aspect-ratio: 1;
  padding: 0.5rem;
  border: 1px solid #F3F4F6;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  min-height: 80px;
}

.calendar-day:hover {
  background: #F9FAFB;
  border-color: #3B82F6;
}

.calendar-day.other-month {
  opacity: 0.3;
}

.calendar-day.today {
  background: #EFF6FF;
  border-color: #3B82F6;
  border-width: 2px;
}

.calendar-day.has-events {
  border-color: #3B82F6;
}

.day-number {
  font-weight: 600;
  color: #1A1A1A;
  margin-bottom: 0.25rem;
}

.day-events {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-top: auto;
}

.event-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.more-events {
  font-size: 0.75rem;
  color: #6B7280;
  margin-left: auto;
}

.events-panel {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.panel-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0;
}

.add-event-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #3B82F6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-event-btn:hover {
  background: #2563EB;
}

.selected-day-section,
.upcoming-section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1A1A1A;
  margin-bottom: 1rem;
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.event-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #F9FAFB;
  border-left: 4px solid;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.event-item:hover {
  background: #F3F4F6;
}

.event-time,
.event-date {
  font-size: 0.875rem;
  font-weight: 600;
  color: #6B7280;
  min-width: 60px;
}

.event-content {
  flex: 1;
}

.event-title {
  font-weight: 600;
  color: #1A1A1A;
  margin-bottom: 0.25rem;
}

.event-description {
  font-size: 0.875rem;
  color: #6B7280;
}

.delete-btn {
  background: none;
  border: none;
  color: #EF4444;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
}

.delete-btn:hover {
  background: #FEE2E2;
}

.no-events {
  padding: 2rem;
  text-align: center;
  color: #6B7280;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-content {
  background: #FFFFFF;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.modal-header h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: #6B7280;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #F3F4F6;
}

.event-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1A1A1A;
}

.form-input,
.form-textarea {
  padding: 0.75rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  color: #1A1A1A;
  transition: all 0.2s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.color-picker {
  display: flex;
  gap: 0.5rem;
}

.color-option {
  width: 40px;
  height: 40px;
  border-radius: 0.5rem;
  border: 3px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.color-option.active {
  border-color: #1A1A1A;
  transform: scale(1.1);
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.cancel-btn,
.submit-btn {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cancel-btn {
  background: #F3F4F6;
  color: #1A1A1A;
}

.cancel-btn:hover {
  background: #E5E7EB;
}

.submit-btn {
  background: #3B82F6;
  color: white;
}

.submit-btn:hover {
  background: #2563EB;
}

@media (max-width: 768px) {
  .calendar-grid {
    gap: 0.25rem;
  }
  
  .calendar-day {
    min-height: 60px;
    padding: 0.25rem;
  }
}
</style>
