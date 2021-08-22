export interface User {
    _id: string;
    username: string;
    email: string;
    phone: {
        callingCode: string,
        number: string
    },
    phoneNumber? : string;
    skills: string[],
    skillsets?: string;
    hobby: string;
    createdAt: string;
    updatedAt: string;
  }