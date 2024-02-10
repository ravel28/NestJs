export class SoeSingleDto {
  body: PersonalSoeDto;
  header: HeaderSoeDto;
  message: string;
  time: Date;
}

export class PersonalSoeDto {
  personalNumber: string;
  personalName: string;
  personalTitle: string;
  personalEmail: string;
  personalUnit: string;
  personalImage: string;
  personalGroup: string;
  personalSubGroup: string;
  personalJob: string;
  personalSuperior: null | string;
  isGmfEmployee: boolean;
}

export class HeaderSoeDto {
  PersonalNumber: string;
  status: string;
}
