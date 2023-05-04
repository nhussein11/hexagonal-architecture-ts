import { ForMonitoringRepositoryDetails } from "../../ports/drivens/for-monitoring";

export class LoggerStubAdapter implements ForMonitoringRepositoryDetails {
  log(event: string, message: string): void {
    let timestamp = new Date().toISOString();
    let log = `[${timestamp}] - [${event}] : ${message}`;
    console.log(log);
  }
}
