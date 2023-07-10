import schedule from 'node-schedule'
import { LifeMonitor } from '../Infra/services/LifeMonitor.service'

export function RegisterJobs() {
  schedule.scheduleJob(process.env.LIFE_CHECK_INTERVAL, LifeMonitor.check)
}
