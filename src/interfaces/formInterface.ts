import { ICommonFields } from './commonFields';

export interface IForm extends ICommonFields {
    userId: number;
    date: Date;
    status: number;
    fullName: string;
    fullTimePosition: string;
    partTimePosition: string;
    isAbroadTrip: boolean;
    purpose: string;
    retentionType: number;
    city: string;
    country: string;
    institution: string;
    startDate: Date;
    endDate: Date;
    route: string;
    transport: string;
    expensesPayment: string;
    tripReason: string;
}
