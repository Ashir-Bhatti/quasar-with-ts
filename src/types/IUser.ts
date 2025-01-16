export default interface User {
  uuid: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  address: string;
  country: string;
  blocked_at: boolean; //todo: send is_blocked from backend
}
