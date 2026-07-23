export interface Task {
  id?: number | string;
  documentId?: string; // ID padrão do Strapi v4/v5
  text: string;
  done: boolean;
}