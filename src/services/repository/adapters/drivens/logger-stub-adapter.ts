import { ForMonitoring } from "../../ports/drivens/for-monitoring";

export class LoggerStubAdapter implements ForMonitoring {
  log(event: string, message: string): void {
    console.log(event, message);
  }
}
