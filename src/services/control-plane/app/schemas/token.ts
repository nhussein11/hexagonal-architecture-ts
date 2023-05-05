export interface BaseToken {
  payload: Payload;
  secretKey: string;
}

export interface Token extends BaseToken {
  period: string;
}

export interface Payload {
  id: string;
  name: string;
  email: string;
}
