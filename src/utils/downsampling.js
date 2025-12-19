/**
 * Downsampling Utilities
 * Algorithmes pour réduire le nombre de points de données tout en préservant la forme visuelle
 */

/**
 * Largest Triangle Three Buckets (LTTB)
 * Préserve la forme visuelle des données en sélectionnant les points les plus représentatifs
 */
export function lttb(data, threshold) {
  if (data.length <= threshold) {
    return data
  }

  const bucketSize = (data.length - 2) / (threshold - 2)
  let sampled = [data[0]] // Toujours inclure le premier point
  let a = 0

  for (let i = 0; i < threshold - 2; i++) {
    const rangeStart = Math.floor((i + 0) * bucketSize) + 1
    const rangeEnd = Math.floor((i + 1) * bucketSize) + 1
    const rangeEndNext = Math.floor((i + 2) * bucketSize) + 1

    const avgRangeStart = rangeStart
    const avgRangeEnd = Math.min(rangeEnd, data.length)
    const avgRangeNextEnd = Math.min(rangeEndNext, data.length)

    let avgX = 0
    let avgY = 0
    let avgRangeLength = 0

    for (let j = avgRangeStart; j < avgRangeEnd; j++) {
      avgX += data[j].timestamp ? new Date(data[j].timestamp).getTime() : j
      avgY += data[j].value
      avgRangeLength++
    }

    avgX /= avgRangeLength
    avgY /= avgRangeLength

    let avgRangeNextX = 0
    let avgRangeNextY = 0
    let avgRangeNextLength = 0

    for (let j = avgRangeEnd; j < avgRangeNextEnd; j++) {
      avgRangeNextX += data[j].timestamp ? new Date(data[j].timestamp).getTime() : j
      avgRangeNextY += data[j].value
      avgRangeNextLength++
    }

    avgRangeNextX /= avgRangeNextLength
    avgRangeNextY /= avgRangeNextLength

    let maxArea = -1
    let maxAreaIndex = rangeStart

    for (let j = rangeStart; j < rangeEnd; j++) {
      const pointX = data[j].timestamp ? new Date(data[j].timestamp).getTime() : j
      const pointY = data[j].value

      const area = Math.abs(
        (pointX - avgX) * (avgRangeNextY - avgY) -
        (avgY - pointY) * (avgRangeNextX - avgX)
      )

      if (area > maxArea) {
        maxArea = area
        maxAreaIndex = j
      }
    }

    sampled.push(data[maxAreaIndex])
    a = maxAreaIndex
  }

  sampled.push(data[data.length - 1]) // Toujours inclure le dernier point
  return sampled
}

/**
 * Average Pooling
 * Agrège les données par moyenne sur des intervalles temporels
 */
export function averagePooling(data, intervalMinutes) {
  if (data.length === 0) return []

  const grouped = {}

  data.forEach(point => {
    const date = new Date(point.timestamp)
    const intervalStart = new Date(date)
    intervalStart.setMinutes(Math.floor(date.getMinutes() / intervalMinutes) * intervalMinutes)
    intervalStart.setSeconds(0)
    intervalStart.setMilliseconds(0)

    const key = intervalStart.toISOString()

    if (!grouped[key]) {
      grouped[key] = {
        timestamp: key,
        values: [],
        category: point.category,
        unit: point.unit
      }
    }

    grouped[key].values.push(point.value)
  })

  return Object.values(grouped).map(group => ({
    timestamp: group.timestamp,
    value: group.values.reduce((a, b) => a + b, 0) / group.values.length,
    category: group.category,
    unit: group.unit
  }))
}

/**
 * Downsample data based on granularity and max points
 */
export function downsampleData(data, granularity, maxPoints = 2000) {
  if (data.length <= maxPoints) {
    return data
  }

  // Pour les granularités élevées, utiliser average pooling
  if (granularity === 'month' || granularity === 'day') {
    const intervalMinutes = granularity === 'month' ? 60 * 24 * 30 : 60 * 24
    return averagePooling(data, intervalMinutes)
  }

  // Pour les granularités fines, utiliser LTTB
  return lttb(data, maxPoints)
}
