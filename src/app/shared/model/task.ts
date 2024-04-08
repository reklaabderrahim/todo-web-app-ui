import {Category} from "./category";

export interface Task {
  id: number;
  name: string;
  description: string;
  deadline: string;
  category: Category;
}

function dateToLocalDateTime(): string {
  const dateString = "12/12/2020";
  const parts = dateString.split('/'); // Split the string into parts
  return new Date(`${parts[2]}-${parts[1]}-${parts[0]}T00:00:00`).toISOString();
}
