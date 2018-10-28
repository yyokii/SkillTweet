<script>
import { Radar } from 'vue-chartjs'
export default {
  name: 'RadarChart',
  extends: Radar,
  props: ['data', 'option'],
  mounted: function () {
    this.renderChart(this.data, this.option)
  },
  watch: {
    data: function () {
      this.renderChart(this.data, this.option)
    }
  }
}
</script>
