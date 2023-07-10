import axios from 'axios'

export class LifeMonitor {
  public static async check() {
    try {
      const response = await axios.get(process.env.LIFE_STATUS_URL)

      console.log(response.data.message)
    } catch (err) {
      console.log('Dead')
    }
  }
}
