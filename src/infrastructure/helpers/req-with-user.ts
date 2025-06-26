export interface ReqWithUser extends Express.Request {
  id: string | number;
  email: string;
}