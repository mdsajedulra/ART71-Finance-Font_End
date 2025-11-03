export type TLoginResponse = {
  success: boolean;
  message: string;
  statusCode: number;


  data: {
    email: string;
    token: string;
    verifiedUser: {
      name: string;
      email: string;
      role: string;
    };
  };
};
