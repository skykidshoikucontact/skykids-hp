export interface NewsItem {
  id: string;
  date: string;
  title: string;
  body: string;
}

export interface StaffMember {
  id: string;
  name: string;
  years: number;
  message: string;
  photo: string;
}

export interface AvailabilityClass {
  name: string;
  status: string;
}

export interface Settings {
  pricing: {
    enrollmentFee: string;
    insuranceFee: string;
    monthlyFee: string;
    singleParentFee: string;
    mealFee: string;
    extendedCare: string;
    longVacationFee: string;
  };
  availability: {
    asOfDate: string;
    classes: AvailabilityClass[];
  };
}

export interface Document {
  id: string;
  category: string;
  name: string;
  description: string;
  url: string;
  order: number;
}
