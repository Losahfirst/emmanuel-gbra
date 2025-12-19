<template>
  <div class="flag-wrapper" :style="{ width: size + 'px', height: (size * 2/3) + 'px' }">
    <svg 
      v-if="flagSVG" 
      class="country-flag" 
      :viewBox="flagSVG.viewBox"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <rect 
        v-for="(rect, index) in flagSVG.rects" 
        :key="'rect-' + index"
        :x="rect.x"
        :y="rect.y"
        :width="rect.width"
        :height="rect.height"
        :fill="rect.fill"
      />
      <g v-if="flagSVG.star">
        <polygon 
          :points="flagSVG.star.points"
          :fill="flagSVG.star.fill"
          :transform="flagSVG.star.transform"
        />
      </g>
      <g v-if="flagSVG.crescent">
        <!-- Croissant de lune pour la Mauritanie -->
        <circle cx="1.2" cy="1" r="0.5" :fill="flagSVG.crescentColor" />
        <circle cx="1.35" cy="1" r="0.45" :fill="flagSVG.crescentBg" />
      </g>
      <circle 
        v-if="flagSVG.circle"
        :cx="flagSVG.circle.cx"
        :cy="flagSVG.circle.cy"
        :r="flagSVG.circle.r"
        :fill="flagSVG.circle.fill"
      />
      <g v-if="flagSVG.stars">
        <polygon
          v-for="(star, index) in flagSVG.stars"
          :key="'star-' + index"
          :points="star.points"
          :fill="star.fill"
          :transform="`translate(${star.cx},${star.cy})`"
        />
      </g>
    </svg>
    <span v-else class="flag-emoji">{{ country.flag }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  country: {
    type: Object,
    required: true
  },
  size: {
    type: Number,
    default: 32
  }
})

const flagSVG = computed(() => {
  if (!props.country || !props.country.flagColors) return null

  const colors = props.country.flagColors
  const colorKeys = Object.keys(colors)
  
  // Côte d'Ivoire - tricolore vertical
  if (props.country.code === 'CI') {
    return {
      viewBox: '0 0 3 2',
      rects: [
        { x: 0, y: 0, width: 1, height: 2, fill: colors.orange },
        { x: 1, y: 0, width: 1, height: 2, fill: colors.white },
        { x: 2, y: 0, width: 1, height: 2, fill: colors.green }
      ]
    }
  }
  
  // Sénégal - tricolore vertical avec étoile verte
  if (props.country.code === 'SN') {
    // Calculer les points de l'étoile à 5 branches au centre de la bande jaune
    const starCenterX = 1.5
    const starCenterY = 1
    const starRadius = 0.3
    const starPoints = []
    for (let i = 0; i < 10; i++) {
      const angle = (i * Math.PI) / 5 - Math.PI / 2
      const r = i % 2 === 0 ? starRadius : starRadius * 0.4
      const x = starCenterX + r * Math.cos(angle)
      const y = starCenterY + r * Math.sin(angle)
      starPoints.push(`${x},${y}`)
    }
    
    return {
      viewBox: '0 0 3 2',
      rects: [
        { x: 0, y: 0, width: 1, height: 2, fill: colors.green },
        { x: 1, y: 0, width: 1, height: 2, fill: colors.yellow },
        { x: 2, y: 0, width: 1, height: 2, fill: colors.red }
      ],
      star: {
        points: starPoints.join(' '),
        fill: colors.green,
        transform: ''
      }
    }
  }
  
  // Ghana - tricolore horizontal avec étoile noire
  if (props.country.code === 'GH') {
    const starCenterX = 1.5
    const starCenterY = 1
    const starRadius = 0.25
    const starPoints = []
    for (let i = 0; i < 10; i++) {
      const angle = (i * Math.PI) / 5 - Math.PI / 2
      const r = i % 2 === 0 ? starRadius : starRadius * 0.4
      const x = starCenterX + r * Math.cos(angle)
      const y = starCenterY + r * Math.sin(angle)
      starPoints.push(`${x},${y}`)
    }
    
    return {
      viewBox: '0 0 3 2',
      rects: [
        { x: 0, y: 0, width: 3, height: 0.67, fill: colors.red },
        { x: 0, y: 0.67, width: 3, height: 0.67, fill: colors.yellow },
        { x: 0, y: 1.33, width: 3, height: 0.67, fill: colors.green }
      ],
      star: {
        points: starPoints.join(' '),
        fill: colors.black,
        transform: ''
      }
    }
  }
  
  // Nigeria - bicolore vertical
  if (props.country.code === 'NG') {
    return {
      viewBox: '0 0 3 2',
      rects: [
        { x: 0, y: 0, width: 1, height: 2, fill: colors.green },
        { x: 1, y: 0, width: 1, height: 2, fill: colors.white },
        { x: 2, y: 0, width: 1, height: 2, fill: colors.green }
      ]
    }
  }
  
  // Mali - tricolore vertical
  if (props.country.code === 'ML') {
    return {
      viewBox: '0 0 3 2',
      rects: [
        { x: 0, y: 0, width: 1, height: 2, fill: colors.green },
        { x: 1, y: 0, width: 1, height: 2, fill: colors.yellow },
        { x: 2, y: 0, width: 1, height: 2, fill: colors.red }
      ]
    }
  }
  
  // Burkina Faso - bicolore horizontal (rouge/vert) avec étoile jaune au centre
  if (props.country.code === 'BF') {
    const starCenterX = 1.5
    const starCenterY = 1
    const starRadius = 0.3
    const starPoints = []
    for (let i = 0; i < 10; i++) {
      const angle = (i * Math.PI) / 5 - Math.PI / 2
      const r = i % 2 === 0 ? starRadius : starRadius * 0.4
      const x = starCenterX + r * Math.cos(angle)
      const y = starCenterY + r * Math.sin(angle)
      starPoints.push(`${x},${y}`)
    }
    
    return {
      viewBox: '0 0 3 2',
      rects: [
        { x: 0, y: 0, width: 3, height: 1, fill: colors.red },
        { x: 0, y: 1, width: 3, height: 1, fill: colors.green }
      ],
      star: {
        points: starPoints.join(' '),
        fill: colors.yellow,
        transform: ''
      }
    }
  }
  
  // Niger - tricolore horizontal avec disque orange au centre
  if (props.country.code === 'NE') {
    return {
      viewBox: '0 0 3 2',
      rects: [
        { x: 0, y: 0, width: 3, height: 0.67, fill: colors.orange },
        { x: 0, y: 0.67, width: 3, height: 0.67, fill: colors.white },
        { x: 0, y: 1.33, width: 3, height: 0.67, fill: colors.green }
      ],
      circle: {
        cx: 1.5,
        cy: 1,
        r: 0.25,
        fill: colors.orange
      }
    }
  }
  
  // Togo - 5 bandes horizontales avec étoile blanche dans canton rouge
  if (props.country.code === 'TG') {
    const starCenterX = 0.5
    const starCenterY = 0.5
    const starRadius = 0.2
    const starPoints = []
    for (let i = 0; i < 10; i++) {
      const angle = (i * Math.PI) / 5 - Math.PI / 2
      const r = i % 2 === 0 ? starRadius : starRadius * 0.4
      const x = starCenterX + r * Math.cos(angle)
      const y = starCenterY + r * Math.sin(angle)
      starPoints.push(`${x},${y}`)
    }
    
    return {
      viewBox: '0 0 3 2',
      rects: [
        { x: 0, y: 0, width: 3, height: 0.4, fill: colors.green },
        { x: 0, y: 0.4, width: 3, height: 0.4, fill: colors.yellow },
        { x: 0, y: 0.8, width: 3, height: 0.4, fill: colors.red },
        { x: 0, y: 1.2, width: 3, height: 0.4, fill: colors.yellow },
        { x: 0, y: 1.6, width: 3, height: 0.4, fill: colors.green },
        { x: 0, y: 0, width: 1, height: 1, fill: colors.red }
      ],
      star: {
        points: starPoints.join(' '),
        fill: colors.white,
        transform: ''
      }
    }
  }
  
  // Bénin - bande verticale verte à gauche, deux bandes horizontales (jaune/rouge) à droite
  if (props.country.code === 'BJ') {
    return {
      viewBox: '0 0 3 2',
      rects: [
        { x: 0, y: 0, width: 1, height: 2, fill: colors.green },
        { x: 1, y: 0, width: 2, height: 1, fill: colors.yellow },
        { x: 1, y: 1, width: 2, height: 1, fill: colors.red }
      ]
    }
  }
  
  // Guinée - tricolore vertical
  if (props.country.code === 'GN') {
    return {
      viewBox: '0 0 3 2',
      rects: [
        { x: 0, y: 0, width: 1, height: 2, fill: colors.red },
        { x: 1, y: 0, width: 1, height: 2, fill: colors.yellow },
        { x: 2, y: 0, width: 1, height: 2, fill: colors.green }
      ]
    }
  }
  
  // Liberia - 11 bandes horizontales avec étoile blanche dans canton bleu
  if (props.country.code === 'LR') {
    const stripeHeight = 2 / 11
    const rects = []
    for (let i = 0; i < 11; i++) {
      const color = i % 2 === 0 ? colors.red : colors.white
      rects.push({ x: 0, y: i * stripeHeight, width: 3, height: stripeHeight, fill: color })
    }
    
    // Canton bleu avec étoile
    const starCenterX = 0.75
    const starCenterY = 0.5
    const starRadius = 0.2
    const starPoints = []
    for (let i = 0; i < 10; i++) {
      const angle = (i * Math.PI) / 5 - Math.PI / 2
      const r = i % 2 === 0 ? starRadius : starRadius * 0.4
      const x = starCenterX + r * Math.cos(angle)
      const y = starCenterY + r * Math.sin(angle)
      starPoints.push(`${x},${y}`)
    }
    
    return {
      viewBox: '0 0 3 2',
      rects: [
        ...rects,
        { x: 0, y: 0, width: 1.5, height: 1, fill: colors.blue }
      ],
      star: {
        points: starPoints.join(' '),
        fill: colors.white,
        transform: ''
      }
    }
  }
  
  // Sierra Leone - tricolore horizontal
  if (props.country.code === 'SL') {
    return {
      viewBox: '0 0 3 2',
      rects: [
        { x: 0, y: 0, width: 3, height: 0.67, fill: colors.green },
        { x: 0, y: 0.67, width: 3, height: 0.67, fill: colors.white },
        { x: 0, y: 1.33, width: 3, height: 0.67, fill: colors.blue }
      ]
    }
  }
  
  // Gambie - tricolore horizontal (rouge, blanc, bleu) avec bande bleue fine
  if (props.country.code === 'GM') {
    return {
      viewBox: '0 0 3 2',
      rects: [
        { x: 0, y: 0, width: 3, height: 0.67, fill: colors.red },
        { x: 0, y: 0.67, width: 3, height: 0.15, fill: colors.blue },
        { x: 0, y: 0.82, width: 3, height: 0.36, fill: colors.white },
        { x: 0, y: 1.18, width: 3, height: 0.15, fill: colors.blue },
        { x: 0, y: 1.33, width: 3, height: 0.67, fill: colors.green }
      ]
    }
  }
  
  // Mauritanie - fond vert avec croissant et étoile jaunes
  if (props.country.code === 'MR') {
    const starCenterX = 2.2
    const starCenterY = 1
    const starRadius = 0.15
    const starPoints = []
    for (let i = 0; i < 10; i++) {
      const angle = (i * Math.PI) / 5 - Math.PI / 2
      const r = i % 2 === 0 ? starRadius : starRadius * 0.4
      const x = starCenterX + r * Math.cos(angle)
      const y = starCenterY + r * Math.sin(angle)
      starPoints.push(`${x},${y}`)
    }
    
    return {
      viewBox: '0 0 3 2',
      rects: [
        { x: 0, y: 0, width: 3, height: 2, fill: colors.green }
      ],
      star: {
        points: starPoints.join(' '),
        fill: colors.yellow,
        transform: ''
      },
      crescent: true,
      crescentColor: colors.yellow,
      crescentBg: colors.green
    }
  }
  
  // Guinée-Bissau - complexe, on utilise l'emoji
  if (props.country.code === 'GW') {
    return {
      viewBox: '0 0 3 2',
      rects: [
        { x: 0, y: 0, width: 3, height: 0.67, fill: colors.red },
        { x: 0, y: 0.67, width: 3, height: 0.67, fill: colors.yellow },
        { x: 0, y: 1.33, width: 3, height: 0.67, fill: colors.green }
      ]
    }
  }
  
  // Cap-Vert - fond bleu avec bandes horizontales et cercle de 10 étoiles
  if (props.country.code === 'CV') {
    // Calculer les positions des 10 étoiles en cercle
    const starsCenterX = 1.5
    const starsCenterY = 1.5 // Centre de la bande rouge
    const starsRadius = 0.35 // Rayon du cercle des étoiles
    const starRadius = 0.06 // Rayon de chaque étoile
    const stars = []
    
    // Générer les points d'une étoile à 5 branches
    function generateStarPoints() {
      const points = []
      for (let i = 0; i < 10; i++) {
        const angle = (i * Math.PI) / 5 - Math.PI / 2
        const r = i % 2 === 0 ? starRadius : starRadius * 0.4
        const x = r * Math.cos(angle)
        const y = r * Math.sin(angle)
        points.push(`${x},${y}`)
      }
      return points.join(' ')
    }
    
    const starPoints = generateStarPoints()
    
    for (let i = 0; i < 10; i++) {
      const angle = (i * 2 * Math.PI) / 10 - Math.PI / 2
      const cx = starsCenterX + starsRadius * Math.cos(angle)
      const cy = starsCenterY + starsRadius * Math.sin(angle)
      stars.push({ 
        cx, 
        cy, 
        points: starPoints, 
        fill: colors.yellow || '#FCD116' 
      })
    }
    
    return {
      viewBox: '0 0 3 2',
      rects: [
        { x: 0, y: 0, width: 3, height: 2, fill: colors.blue },
        { x: 0, y: 1.1, width: 3, height: 0.2, fill: colors.white },
        { x: 0, y: 1.3, width: 3, height: 0.4, fill: colors.red },
        { x: 0, y: 1.7, width: 3, height: 0.2, fill: colors.white }
      ],
      stars: stars
    }
  }
  
  return null
})
</script>

<style scoped>
.flag-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.country-flag {
  width: 100%;
  height: 100%;
  border-radius: 0.25rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border: 1px solid #E5E7EB;
}

.flag-emoji {
  font-size: 1.5em;
  line-height: 1;
}
</style>
