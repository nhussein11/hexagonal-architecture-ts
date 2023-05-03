import { ForMonitoring } from "../../ports/drivens/for-monitoring";

export class LoggerStubAdapter implements ForMonitoring {
  log(event: string, message: string): void {
    let timestamp = new Date().toISOString();
    let log = `[${timestamp}] - [${event}] : ${message}`;
    console.log(log);
  }
}
