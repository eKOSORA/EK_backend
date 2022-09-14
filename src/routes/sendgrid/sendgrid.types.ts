export class Mail {
  to: string;
  from?: string;
  subject: string;
  text?: string;
  html?: string;
  date?: string;
  dynamicTemplateData?: object;
}

export class ChangeMarkMailContent {
  student_names: string;
  subject: string;
  marks: number;
  reason?: string;
  educator_email: string;
  action: 'lost' | 'gained';
  date: string;
}

export class ChangeMarkMail extends Mail {
  dynamicTemplateData: ChangeMarkMailContent;
}
