<template>
  <section class="fill-height">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12">
        <v-carousel
            cycle
            hide-delimiters
            show-arrows="hover"
            height="700"

        >
          <template v-slot:prev="{ props }">
          <v-btn
              variant="outlined"
              color="white"
              icon="arrow_back_ios"
              @click="props.onClick"
          />
        </template>
          <template v-slot:next="{ props }">
            <v-btn
                variant="outlined"
                color="white"
                icon="arrow_forward_ios"
                @click="props.onClick"
            />
          </template>

          <v-carousel-item
              v-for="({zoneName,zoneTime,timeZoneGap,timeZoneUnloading,src},i) in timeZones"
              :key="i"
              :src="src"
              cover
          >
            <v-card
              height="100%"
              variant="outlined"
              class="d-flex flex-column align-center justify-center text-white opacity border-none"

            >
              <div class="text-h3">{{zoneName}}</div>
              <div class="text-h4">Time: {{ zoneTime }}</div>
              <div class="text-h5">Time gap: {{timeZoneGap}}</div>
              <div class="text-h5">Time unloading: {{timeZoneUnloading}}</div>
            </v-card>
          </v-carousel-item>

        </v-carousel>
      </v-col>
    </v-row>
  </section>
  <router-view/>
</template>

<script>
import {DateTime} from 'luxon';
export default {
  name: "Gap&Unloading",
  data: () => ({
    timeZones:[
      {
        zoneName: 'Pacific',
        zoneTime: '',
        timeZoneGap: '',
        timeZoneUnloading: '',
        states: [
          'WA - Washington',
          'OR - Oregon',
          'NV - Nevada',
          'CA - California'
        ],
        src: '/src/images/la.jpg'
      },
      {
        zoneName: 'Mountain',
        zoneTime: '',
        timeZoneGap: '',
        timeZoneUnloading: '',
        states: [
          'MT - Montana',
          'ID - Idaho',
          'WY - Wyoming',
          'UT - Utah',
          'CO - Colorado',
          'AZ - Arizona',
          'NM - New Mexico',
        ],
        src: '/src/images/wayoming.jpg'
      },
      {
        zoneName: 'Central',
        zoneTime: '',
        timeZoneGap: '',
        timeZoneUnloading: '',
        states: [
          'ND - North Dakota',
          'SD - South Dakota',
          'NE - Nebraska',
          'WI - Wisconsin',
          'MN - Minnesota',
          'IA - Iowa',
          'KS - Kansas',
          'MO - Missouri',
          'IL - Illinois',
          'OK - Oklahoma',
          'AR - Arkansas',
          'TN - Tennessee',
          'AL - Alabama',
          'MS - Mississippi',
          'LA - Louisiana',
          'TX - Texas'
        ],
        src: '/src/images/texas.jpg'
      },
      {
        zoneName: 'Eastern',
        zoneTime: '',
        timeZoneGap: '',
        timeZoneUnloading: '',
        states: [
          'MI - Michigan',
          'IN - Indiana',
          'OH - Ohio',
          'PA - Pennsylvania',
          'NY - New York',
          'VT - Vermont',
          'ME - Maine',
          'NH - New Hampshire',
          'MA - Massachusetts',
          'RI - Rhode Island',
          'CT - Connecticut',
          'NJ - New Jersey',
          'DE - Delaware',
          'MD - Maryland',
          'DC - District of Columbia',
          'VA - Virginia',
          'WV - West Virginia',
          'KY - Kentucky',
          'NC - North Carolina',
          'SC - South Carolina',
          'GA - Georgia',
          'FL - Florida'
        ],
        src: '/src/images/new-york.jpg'
      },
    ],
    denver: null,
    losAngeles: null,
    chicago: null,
    detroit: null,

  }),
  mounted() {

    setInterval(() => {
      this.losAngeles = DateTime.local().setZone("America/Los_Angeles")
      this.denver = DateTime.local().setZone("America/Denver")
      this.chicago = DateTime.local().setZone("America/Chicago")
      this.detroit = DateTime.local().setZone("America/Detroit")

      this.timeZones[0].zoneTime = this.losAngeles.toFormat('FF')
      this.timeZones[1].zoneTime = this.denver.toFormat('FF')
      this.timeZones[2].zoneTime = this.chicago.toFormat('FF')
      this.timeZones[3].zoneTime = this.detroit.toFormat('FF')

      this.timeZones[0].timeZoneGap = this.losAngeles.minus({days: 9}).toFormat('FF')
      this.timeZones[1].timeZoneGap = this.denver.minus({days: 9}).toFormat('FF')
      this.timeZones[2].timeZoneGap = this.chicago.minus({days: 9}).toFormat('FF')
      this.timeZones[3].timeZoneGap = this.detroit.minus({days: 9}).toFormat('FF')

      this.timeZones[0].timeZoneUnloading = this.losAngeles.minus({days: 8, hours: 12}).toFormat('FF')
      this.timeZones[1].timeZoneUnloading = this.denver.minus({days: 8, hours: 12}).toFormat('FF')
      this.timeZones[2].timeZoneUnloading = this.chicago.minus({days: 8, hours: 12}).toFormat('FF')
      this.timeZones[3].timeZoneUnloading = this.detroit.minus({days: 8, hours: 12}).toFormat('FF')
    }, 1000)
  },
  methods:{

  }
}
</script>

<style scoped>
.opacity{
  background: rgba(0,0,0,.7);
}
</style>