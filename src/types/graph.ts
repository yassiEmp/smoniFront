export interface MonthData {
  month_number: number;
  month: string;
  cash: number;
}
       
export interface GraphApiResponse {
  success: boolean;
  data: MonthData[];
}
