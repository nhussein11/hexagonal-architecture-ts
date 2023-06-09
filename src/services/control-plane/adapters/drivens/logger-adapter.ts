import { ForMonitoringAuthenticationDetails } from "../../ports/drivens/for-monitoring";

export class LoggerControlPlaneAdapter
  implements ForMonitoringAuthenticationDetails
{
  log(event: string, message: string): void {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp} - ${event}]: ${message}`);
  }
}
